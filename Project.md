# [Tech Spec] Web3 Landing Page -> Android WebView (GSAP-Heavy)

## 1. Обзор проекта и Архитектура
Необходимо разработать high-conversion лендинг для NFT-маркетплейса (Telegram-бот). Визуальный стиль: Dark Web3, Glassmorphism, неоновые акценты. 

**Критическое архитектурное требование:** Проект разрабатывается как веб-сайт, но целевая платформа — **инкапсуляция в Android WebView** в виде мобильного приложения. Это означает, что производительность, плавность анимаций (60 FPS) и обработка touch-событий должны быть на уровне нативного Android-приложения.

## 2. Технический стек и Лицензирование
* **Основа:** HTML5, CSS3 (Vanilla, CSS Variables), JavaScript (ES6+). Отказ от тяжелых фреймворков (React/Vue) для минимизации времени парсинга скриптов в WebView.
* [cite_start]**Анимационное ядро:** GSAP (GreenSock Animation Platform) v3.14+[cite: 4, 26]. 
* [cite_start]**Доступность плагинов:** Вся экосистема GSAP, включая ранее платные премиум-плагины (SplitText, MorphSVG и др.), теперь полностью бесплатна даже для коммерческого использования[cite: 47, 48]. Лицензия Club GreenSock больше не требуется.

## 3. Специфика разработки под Android WebView
Для обеспечения нативного пользовательского опыта на Android необходимо строго соблюдать следующие правила:

1. **Нормализация событий (Observer Plugin):** В WebView часто возникают конфликты между нативным скроллом и веб-скроллом. [cite_start]Использовать плагин `Observer` для плавной нормализации определения событий касания (touch/swipe) на разных устройствах[cite: 41].
2. **Аппаратное ускорение (GPU Acceleration):** Анимировать **исключительно** свойства `transform` (translate, scale, rotate) и `opacity`. Категорически запрещено анимировать `top`, `left`, `margin`, `width`, `height`, так как это вызывает перерасчет макета (Reflow) и лаги в WebView.
3. **Оптимизация композитинга:** Использовать CSS-свойство `will-change: transform, opacity;` для всех элементов, управляемых через ScrollTrigger, чтобы заранее перенести их на отдельный слой GPU.
4. **Проблема Viewport:** Использовать единицы `dvh` (Dynamic Viewport Height) или написать JS-пересчет `window.innerHeight` в CSS-переменную `--vh`, чтобы избежать скачков интерфейса при скрытии системных панелей навигации Android.
5. **Отключение выделения:** Добавить `user-select: none;` и `-webkit-tap-highlight-color: transparent;` для предотвращения системных подсветок при тапах на карточки и кнопки.

## 4. Спецификация GSAP Анимаций

### Фаза 1: Preloader (Имитация синхронизации)
* **Сценарий:** Приложение должно занять пользователя на несколько секунд короткой анимацией (прогресс-бар или сканирование), пока в фоне собираются данные пользователя и инициализируется Web3-среда.
* **Реализация:** Мастер-таймлайн (`gsap.timeline()`). После завершения загрузки прелоадер уезжает вверх (`yPercent: -100`, `ease: "expo.inOut"`), плавно открывая Hero-экран.

### Фаза 2: Hero-экран (Entrance)
* **Сценарий:** Вау-эффект при открытии приложения.
* **Реализация:** Использовать плагин `SplitText` для главного заголовка. Анимация появления слов по очереди (stagger), `y: 40`, `opacity: 0`, с пружинистым замедлением (`power4.out`).

### Фаза 3: Скролл и Контент (ScrollTrigger)
* **Сценарий:** Блоки "Проблема/Решение" и "Шаги алгоритма" появляются только по мере прокрутки. [cite_start]ScrollTrigger — это стандарт для анимаций, управляемых скроллом[cite: 49].
* **Реализация:** * Карточки появляются с эффектом `fade-up` (`y: 50`, `stagger: 0.15`).
  * Для фоновых Glassmorphism-сфер включить легкий параллакс с привязкой к скроллу (`scrub: 1`).

### Фаза 4: Микро-интеракции
* Постоянная pulse-анимация (`yoyo: true`, `repeat: -1`) для главной CTA-кнопки.
* Легкое увеличение масштаба карточек (`scale: 1.02`) при `touchstart`/`mouseenter`.

## 5. Архитектурный паттерн (Код-сниппет для команды)
Для управления отзывчивостью анимаций в WebView обязательно использовать `gsap.matchMedia()`. [cite_start]Это сделает создание адаптивных анимаций простым и надежным[cite: 35].

```javascript
// Регистрация плагинов
gsap.registerPlugin(ScrollTrigger, SplitText, Observer);

// Инициализация matchMedia для разделения логики Desktop / Mobile (WebView)
let mm = gsap.matchMedia();

mm.add({
  // Условия
  isDesktop: "(min-width: 769px)",
  isMobile: "(max-width: 768px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  let { isDesktop, isMobile, reduceMotion } = context.conditions;

  // 1. Анимация Hero с использованием SplitText (Бесплатно)
  const heroTitle = new SplitText(".hero-title", { type: "words,chars" });
  
  gsap.from(heroTitle.chars, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.02,
    ease: "power3.out",
    delay: 0.5 // Ждем окончания прелоадера
  });

  // 2. Логика ScrollTrigger 
  if (!reduceMotion) {
    gsap.from(".step-card", {
      scrollTrigger: {
        trigger: ".steps",
        start: isMobile ? "top 85%" : "top 75%", // В WebView триггерим раньше
      },
      y: isMobile ? 30 : 50, // Меньше амплитуда для WebView
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.2)"
    });
  }

  return () => {
    // Cleanup: автоматически срабатывает при смене breakpoints
    heroTitle.revert();
  };
});

// 3. Observer для плавных touch-свайпов (WebView оптимизация)
Observer.create({
  target: window,
  type: "touch,pointer",
  onUp: () => { /* Кастомная логика свайпа вверх */ },
  onDown: () => { /* Кастомная логика свайпа вниз */ },
  tolerance: 10,
  preventDefault: true 
});