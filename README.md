# 💎 GetGems | Premium NFT Marketplace Landing Page

![Banner](assets/images/hero.png)

> **High-performance, visually stunning Web3 landing page architected for perfect Android WebView encapsulation.** 

This project demonstrates a fusion of cutting-edge GSAP animations and native-like mobile optimization. It isn't just a website; it's a **performance-first digital experience** designed to replicate the fluidity of high-end native Android applications.

---

## 🚀 Vision & Key Features

- **Performance-Driven Animations:** Orchestrated entry sequences and scroll-triggered reveals using **GSAP 3**.
- **Android WebView Optimization:** Strategic use of GPU-accelerated properties (`transform` and `opacity`) to maintain a consistent **60 FPS** on mobile devices.
- **Micro-Interactions:** Magnetic UI elements, interactive 3D tilts, and touch-normalized events using the GSAP `Observer` plugin.
- **Zero-Dependency SplitText:** A custom, lightweight character-segmentation engine designed for immediate Largest Contentful Paint (LCP).
- **Glassmorphism UI:** A sleek, dark-themed design system featuring blurred overlays and vibrant neon accents tailored for a "Dark Web3" aesthetic.

---

## 🛠 Technology Stack

- **Foundational Layer:** Semantic HTML5, Vanilla CSS3 (Custom Variables), ES6+ JavaScript.
- **Animation Orchestration:** [GSAP 3](https://gsap.com/) (GreenSock Animation Platform).
- **Core Plugins:** `ScrollTrigger`, `Observer` (for cross-platform touch normalization).
- **Mobile Bridge:** [Capacitor 6+](https://capacitorjs.com/) for native Android/iOS packaging.
- **Workflow Tools:** `Browser-Sync` for real-time development, `shx` for cross-platform file management.

---

## 🏗 Architectural Philosophy

The development followed a "WebView-First" approach:
1. **GPU Compositing:** Aggressive use of `will-change` to offload rendering to the hardware layer.
2. **Event Normalization:** Solved the common WebView touch-handling inconsistency by implementing a unified pointer-to-touch abstraction.
3. **Minimize Reflow:** Zero animations on layout-impacting properties (top/left/margin) to prevent UI stuttering during complex transitions.
4. **Adaptive Logic:** Implemented `gsap.matchMedia()` to handle breakpoints and user physics (touch vs mouse) seamlessly.

---

## 📦 Local Installation & Setup

1. **Clone & Enter:**
   ```bash
   git clone https://github.com/m1sstak3/ton-nft-marketplace.git
   cd ton-nft-marketplace
   ```

2. **Install Dev Dependencies:**
   ```bash
   npm install
   ```

3. **Development Mode:**
   ```bash
   npm start
   ```

4. **Build & Prepare for Android:**
   ```bash
   # Build the web project and sync with Capacitor
   npm run build
   npm run sync
   
   # Open in Android Studio
   npm run android
   ```

---

## 📜 Metadata & Documentation

Detailed technical specifications and development workflows can be found in the [docs/](docs/) directory.

- **Developer:** [Antigravity Studio](https://github.com/m1sstak3)
- **License:** [MIT](LICENSE)
- **Year:** 2026

---

*Built with passion for the TON ecosystem and high-performance Web XR.*

