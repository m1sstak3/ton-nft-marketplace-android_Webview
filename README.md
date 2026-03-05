<div align="center">
  <h1>💎 GetGems – NFT Marketplace Landing Page</h1>
  <p><b>Премиальный Web3-лендинг, спроектированный для идеальной интеграции и 60 FPS в Android WebView.</b></p>

  <div>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor" />
  </div>
</div>

---

## 💻 Демонстрация интерфейса

<div align="center">
  <b>🖥 Десктопная версия</b><br><br>
  <img src="https://github.com/user-attachments/assets/d9a01c9c-5fa6-4356-8d63-8b475b66b89a" width="800" />
</div>

<br>

<table align="center">
  <tr>
    <td align="center">
      <b>📲 Планшет (Tablet)</b><br>
      <img src="https://github.com/user-attachments/assets/2659bd84-42e8-41c7-aa76-e10a4a724684" width="350" />
    </td>
    <td align="center">
      <b>📱 Смартфон (Mobile)</b><br>
      <img src="https://github.com/user-attachments/assets/d7107a7b-3708-4c3e-ad82-f56f5faf4ae0" width="350" />
    </td>
  </tr>
</table>

<br>

<div align="center">
  <h3>✨ GSAP Анимации скролла (Видео)</h3>
  <video src="https://github.com/user-attachments/assets/2df72ab8-a1a3-4fe1-bdb4-0435db2b897b" width="600" autoplay loop muted playsinline style="border-radius: 20px;"></video>
</div>

---

## 🚀 Концепция и ключевые особенности

Этот проект — не просто веб-сайт, а **performance-first цифровой опыт**, где передовые анимации GSAP сочетаются с нативной мобильной оптимизацией.

* ⚡ **Производительные анимации:** Сложные сценарии появления элементов и скролл-эффекты на базе **GSAP 3**.
* 📱 **Оптимизация под WebView (60 FPS):** Стратегическое использование аппаратно-ускоренных CSS-свойств (`transform` и `opacity`) для идеально плавной работы на Android-устройствах.
* 🎯 **Микроинтеракции:** Магнитные UI-элементы, интерактивные 3D-наклоны и нормализация touch-событий через плагин GSAP `Observer`.
* 🔠 **Кастомный SplitText:** Легковесный движок сегментации текста без лишних зависимостей, созданный для мгновенной отрисовки (LCP).
* 🔮 **Glassmorphism UI:** Стильная темная дизайн-система с эффектом матового стекла и неоновыми акцентами в эстетике «Dark Web3».

---

## 🏗 Архитектура и под капотом (WebView-First)

Разработка велась с упором на максимальную производительность в мобильных веб-контейнерах:

1. **GPU-композитинг:** Агрессивное использование `will-change` для переноса тяжелого рендеринга на аппаратный уровень.
2. **Нормализация событий:** Решена проблема нестабильного поведения тапов в WebView через единую абстракцию pointer-to-touch.
3. **Минимизация Reflow:** Полный отказ от анимации свойств, влияющих на геометрию страницы (top/left/margin), во избежание фризов интерфейса.
4. **Адаптивная логика:** Использование `gsap.matchMedia()` для бесшовного переключения между брейкпоинтами и физикой устройств (мышь vs тачскрин).

---

## 📦 Локальная установка и запуск

### 1. Подготовка
Склонируйте репозиторий и установите зависимости:
```bash
git clone https://github.com/m1sstak3/ton-nft-marketplace.git
cd ton-nft-marketplace
npm install
```

### 2. Режим разработки
Запуск локального сервера (`Browser-Sync`) с Hot Reload:
```bash
npm start
```

### 3. Сборка для Android (Capacitor)
```bash
# Сборка веб-проекта и синхронизация с Capacitor
npm run build
npm run sync

# Открытие проекта в Android Studio
npm run android
```

---

<div align="center">
  <p>Проект распространяется под лицензией <a href="LICENSE">MIT</a>. Подробная спецификация доступна в папке <a href="docs/">docs/</a>.</p>
  <b>Developed with ❤️ by <a href="https://github.com/m1sstak3">Antigravity Studio (m1sstak3)</a> | 2026</b><br>
  <i>Built with passion for the TON ecosystem and high-performance Web XR.</i>
</div>
