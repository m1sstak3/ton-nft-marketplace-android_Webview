// GSAP Configuration for Android WebView
gsap.config({ force3D: true });
gsap.ticker.fps(60);

// Safe Area and Status Bar configuration for mobile Capacitor environment
const initStatusBar = async () => {
    if (window.Capacitor && window.Capacitor.isPluginAvailable('StatusBar')) {
        const { StatusBar } = window.Capacitor.Plugins;
        try {
            await StatusBar.setStyle({ style: 'DARK' });
            await StatusBar.setBackgroundColor({ color: '#080808' });
        } catch (e) {
            console.warn("StatusBar plugin error:", e);
        }
    }
};
initStatusBar();

// Animation Timing Constants
const ANIM_CONFIG = {
    TICKER_DURATION: 45,
    HERO_STAGGER: 0.02,
    HERO_DURATION: 1.2,
    PRELOADER_DURATION: 2.5,
    TRANSITION_EASE: "expo.inOut"
};

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, Observer);

// 1. Fallback SplitText-like functionality
const manualSplit = (element, type = "chars") => {
    const el = document.querySelector(element);
    if (!el) return null;
    const text = el.innerText;
    el.innerHTML = "";
    const words = text.split(" ");

    words.forEach(word => {
        const wordWrap = document.createElement("span");
        wordWrap.className = "split-word";
        wordWrap.style.display = "inline-block";
        wordWrap.style.whiteSpace = "nowrap";

        if (type === "chars") {
            const chars = word.split("");
            chars.forEach(char => {
                const charWrap = document.createElement("span");
                charWrap.className = "split-char";
                charWrap.innerText = char;
                charWrap.style.display = "inline-block";
                wordWrap.appendChild(charWrap);
            });
        } else {
            wordWrap.innerText = word;
        }

        el.appendChild(wordWrap);
        el.appendChild(document.createTextNode(" "));
    });

    return type === "chars" ? el.querySelectorAll(".split-char") : el.querySelectorAll(".split-word");
};

// Global MatchMedia
let mm = gsap.matchMedia();

// 1. Preloader Timeline
const initPreloader = () => {
    const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = 'auto';
            initHeroAnimations();
            initLiveTicker();
        }
    });

    gsap.set("#preloader", { display: "flex" });
    document.body.style.overflow = 'hidden';

    tl.to(".loader-progress-bar", {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut"
    });

    tl.to(".loader-text, .loader-scanner, .loader-progress-container, .loader-status", {
        opacity: 0,
        y: -10,
        stagger: 0.1,
        duration: 0.5
    });

    tl.to("#preloader", {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut"
    }, "-=0.2");

    tl.from(".main-header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=0.8");
};

// 2. Live Ticker Animation
const initLiveTicker = () => {
    const ticker = document.querySelector(".live-ticker");
    if (!ticker) return;

    // Create seamless infinite scroll by cloning content
    const items = ticker.innerHTML;
    ticker.innerHTML += items + items;

    gsap.to(ticker, {
        xPercent: -50,
        duration: ANIM_CONFIG.TICKER_DURATION,
        ease: "none",
        repeat: -1
    });
};

// 3. Hero Entrance Sequence
const initHeroAnimations = () => {
    const heroTl = gsap.timeline();

    // Use lightweight text splitter for optimized loading
    const targetChars = manualSplit(".hero-title", "chars");

    if (targetChars) {
        heroTl.from(targetChars, {
            opacity: 0,
            y: 80,
            rotateX: -90,
            stagger: ANIM_CONFIG.HERO_STAGGER,
            duration: ANIM_CONFIG.HERO_DURATION,
            ease: "expo.out"
        });
    }

    heroTl.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");

    heroTl.from(".hero-actions .btn", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.6");

    heroTl.from(".banner-visual", {
        opacity: 0,
        x: 100,
        rotate: 5,
        duration: 1.5,
        ease: "expo.out"
    }, "-=1.2");

    // Float animation
    gsap.to(".hero-float-img", {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
};

// 4. Magnetic Effect
const initMagneticButtons = () => {
    const magnetics = document.querySelectorAll('.magnetic');

    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
};

// 5. Card Hover & Visuals
const initInteractions = () => {
    // Parallax background on mouse move
    window.addEventListener('mousemove', (e) => {
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(".bg-spheres", {
            x: xPercent * 30,
            y: yPercent * 30,
            duration: 1,
            ease: "power2.out"
        });
    });

    // 3D Tilt for cards (collections & auctions)
    document.querySelectorAll('.collection-row, .auction-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;

            gsap.to(card, {
                rotateY: dx / 25,
                rotateX: -dy / 15,
                backgroundColor: "rgba(255,255,255,0.08)",
                duration: 0.5
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                backgroundColor: "rgba(255,255,255,0.03)",
                duration: 0.5
            });
        });
    });

    // Reveal animations for scroll
    ScrollTrigger.batch(".collection-row", {
        onEnter: batch => gsap.from(batch, {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
        }),
        start: "top 95%"
    });

    gsap.from(".m-stat", {
        scrollTrigger: {
            trigger: ".market-stats-row",
            start: "top 90%"
        },
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".glass-cta", {
        scrollTrigger: {
            trigger: ".view-all-container",
            start: "top 95%"
        },
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "back.out(2)"
    });

    // CTA Glow pulse
    gsap.to(".cta-glow", {
        opacity: 0.6,
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Featured cards entrance
    gsap.from(".featured-card", {
        scrollTrigger: {
            trigger: ".featured-grid",
            start: "top 85%"
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out"
    });

    // Sticker banner parallax
    gsap.from(".stickers-img", {
        scrollTrigger: {
            trigger: "#sticker-promo",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        },
        y: 50,
        rotate: -5
    });
};

// 6. Observer Touch Normalization
const initObserver = () => {
    Observer.create({
        target: window,
        type: "touch,pointer",
        tolerance: 10,
        preventDefault: false
    });
};

// Start application
window.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initMagneticButtons();
    initInteractions();
    initObserver();
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
