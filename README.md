# 🚀 3D Interactive Web Portfolio

Modern portfolio web application with immersive 3D scenes, smooth animations, and responsive design. Built with React, TypeScript, and Three.js.

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.153-000000?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)

## 📖 Overview

A cutting-edge web portfolio that combines modern web development with 3D graphics to create an immersive user experience. The application features five interactive sections with scroll-based navigation, animated 3D objects, and responsive design for all device types.

**Key Differentiators:**

- **3D Interactive Experience**: Real-time 3D scenes with cursor-tracking avatar and interactive objects
- **Smart Navigation System**: Section-by-section scroll control with direct navigation via navbar/menu
- **Performance Optimized**: 60fps animations with intelligent rendering and lazy-loading
- **Fully Responsive**: Adaptive layouts and 3D scene configurations for all screen sizes

## ✨ Features

### 🎯 Navigation & User Experience

- **Multi-level Navigation System**:
  - Scroll-based section switching (one section at a time)
  - Navbar with direct section links
  - Hamburger menu with slide animation
  - Side panel with social links
- **Smooth Animations**:
  - Framer Motion & Framer Motion 3D transitions
  - Custom scroll animations with easing
  - 3D object position changes on menu open
- **Loading Screen**: Minimum display time with progress tracking

### 📱 Five Interactive Sections

#### 1. **Home Section**

- Glitch-style text effect with name and title
- 3D animated avatar with:
  - Cursor tracking (head follows mouse movement)
  - Bouncing animation on click
  - Position change on menu open

#### 2. **About Me Section**

- Detailed personal information
- 3D room interior with avatar
- Cursor-following head animation
- Room position change on menu interaction

#### 3. **Skills Section**

- Technology showcase with descriptions
- 3D rotating prisms containing tech stack icons:
  - TypeScript, React, Angular, NestJS, RxJS, Git, MySQL, API, Pytest
  - Drag-to-rotate interaction
  - Animated repositioning on menu open

#### 4. **Projects Section**

- Project cards with two types:
  - GitHub-only projects
  - Projects with live demo links
- Card features:
  - Optimized thumbnail images for fast loading
  - Title, short description, tech stack hashtags
  - GitHub and/or live demo buttons
- **Project Modal**:
  - Full description
  - Image carousel with navigation (dots + arrows)
  - Click-to-fullscreen image viewer
- **Full-Screen Image Slider**:
  - Carousel-based navigation
  - Arrow and dot controls
  - Full viewport coverage

#### 5. **Contact Section**

- Reusable contact component (renders as section or modal)
- Contact information (email, phone, social links)
- Working contact form with Web3Forms API integration
- 3D Earth model with drag-to-rotate interaction
- Earth position animation on menu open

### 🎨 UI Components

- **Navbar**: Persistent navigation bar with section links, CV button, Connect button, and hamburger menu
- **Menu**: Slide-in drawer with navigation and CV link
- **Side Panel**: Fixed social links (LinkedIn, GitHub)
- **CV Modal**: In-browser PDF viewer
- **Popup Notifications**: Success/error messages for form submissions
- **Responsive Modals**: Connect form, project details, image viewer

## 🛠 Tech Stack

### Core Technologies

| Technology            | Version | Purpose                         |
| --------------------- | ------- | ------------------------------- |
| **React**             | 18.2.0  | UI framework                    |
| **TypeScript**        | 4.9.5   | Type safety                     |
| **Three.js**          | 0.153.0 | 3D rendering engine             |
| **React Three Fiber** | 8.18.0  | React renderer for Three.js     |
| **React Three Drei**  | 9.74.16 | Three.js helpers & abstractions |

### Animations & Interactions

- **Framer Motion** (10.12.16) - UI animations
- **Framer Motion 3D** (10.12.16) - 3D scene animations
- **React Slick** (0.30.2) - Carousel/slider functionality

### Styling & UI

- **SCSS/Sass** (1.63.4) - Modular CSS with variables/mixins
- **clsx** (2.1.1) - Conditional className management

### Additional Libraries

- **React Router DOM** (6.26.1) - Client-side routing
- **Leva** (0.9.35) - Development GUI controls for 3D scenes
- **Web3Forms API** - Contact form backend

### Build Tools

- **Create React App** (5.0.1) - Build configuration
- **source-map-explorer** - Bundle size analysis

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d-components/          # Three.js 3D objects
│   │   ├── Avatar.tsx          # Animated 3D avatar with cursor tracking
│   │   ├── Room.tsx            # 3D room interior
│   │   ├── Prisms.tsx          # Rotating tech stack prisms
│   │   └── EarthModel.tsx      # Interactive Earth globe
│   │
│   ├── components/             # UI components
│   │   ├── navbar/             # Navigation bar
│   │   ├── menu/               # Hamburger menu
│   │   ├── side-panel/         # Social links sidebar
│   │   ├── loading/            # Loading screen
│   │   ├── popup/              # Notification popups
│   │   ├── cv/                 # PDF CV viewer
│   │   ├── connect/            # Contact form modal
│   │   └── img-full-screen-slider/  # Fullscreen image carousel
│   │
│   ├── sections/               # Page sections
│   │   ├── home-section/       # Landing section
│   │   ├── about-section/      # About me
│   │   ├── skills-section/     # Skills showcase
│   │   ├── projects-section/   # Project portfolio
│   │   │   └── parts/          # Project cards, modals, tabs
│   │   └── contact-section/    # Contact form
│   │
│   ├── reusable-parts/         # Shared components
│   │   ├── buttons/            # Button components
│   │   ├── content-blocks-section/  # Content layout
│   │   └── section-wrapper/    # Section container
│   │
│   ├── Scene.tsx               # Main 3D scene orchestrator
│   ├── ScrollManager.tsx       # Scroll behavior controller
│   └── Interface.tsx           # HTML overlay sections
│
├── hooks/
│   ├── use-camera-animation.ts        # Camera movement logic
│   ├── use-send-email.ts              # Form submission
│   └── use-scene-layout/              # Responsive 3D layout
│       ├── use-scene-layout.ts        # Layout calculation hook
│       └── use-scene-layout.config.ts # Breakpoint configurations
│
├── contexts/
│   ├── section-context.tsx            # Current section state
│   └── ui-context.tsx                 # Screen width & UI state
│
├── constants/
│   ├── config.tsx                     # Animation configs
│   ├── constants.ts                   # Breakpoints & defaults
│   ├── projects-data.ts               # Project information
│   ├── skills-data.ts                 # Skills information
│   └── personal-info.ts               # Contact details
│
├── utils/
│   ├── animate-scroll.ts              # Custom scroll animation
│   └── dom-utils.ts                   # DOM manipulation helpers
│
├── types/
│   ├── 3d-types.ts                    # Three.js type definitions
│   ├── projects.ts                    # Project data types
│   └── use-scene-layout.types.ts      # Layout configuration types
│
├── styles/
│   ├── _tokens.scss                   # Design tokens
│   └── _mixins.scss                   # SCSS mixins
│
└── App.tsx                             # Main application component
```

## 🎯 Key Technical Highlights

### 1. **Advanced Scroll Management**

The `ScrollManager` component implements sophisticated scroll behavior:

```typescript
// Section-by-section scroll control
- Prevents multi-section scrolling (one section at a time)
- Wheel/touchpad event handling with cooldown
- Touch/swipe gesture support for mobile
- Direct navigation from navbar/menu
- Smooth animated transitions
```

**Implementation Details:**

- Uses `@react-three/drei` ScrollControls
- Custom scroll animation with easing functions
- Cooldown mechanism to prevent scroll spam
- Touch event detection with minimum swipe distance
- Viewport height-based section calculation

### 2. **Responsive 3D Scene System**

The `use-scene-layout` hook manages dynamic 3D object positioning:

```typescript
// Adaptive 3D layouts based on:
- Screen width (10+ breakpoints)
- Current section (0-4)
- Menu state (open/closed)
- Device type (desktop/tablet/mobile)
```

**Features:**

- Variant-based configuration system (`home` vs `other` sections)
- Responsive rules with min/max width conditions
- Position, scale, and rotation adjustments
- Smooth transitions via Framer Motion 3D
- Performance-optimized calculations

### 3. **Cursor-Tracking Avatar**

Advanced 3D avatar with realistic head movement:

```typescript
// Avatar features:
- Spine bone rotation to follow cursor
- Clamped rotation values for natural movement
- Responsive target positions per breakpoint
- FBX animation loading (Falling, Hello)
- Click-to-bounce interaction
```

**Technical Implementation:**

- Uses Three.js `lookAt()` with spine bone reference
- `useFrame` hook for real-time tracking
- Animation state management with `useAnimations`
- Cursor state management (hover effects)
- Section-specific behavior

### 4. **Camera Animation System**

The `use-camera-animation` hook creates cinematic camera movements:

```typescript
// Camera features:
- Horizontal pan on menu open (-3 units)
- Smooth motion via Framer Motion controls
- Frame-by-frame position updates
- Threshold-based updates (0.001) for performance
```

### 5. **Performance Optimizations**

- **Lazy Loading**:
  - `React.lazy()` for modals (CV, Popup, Connect, ImageSlider)
  - Code splitting reduces initial bundle size
- **Conditional Rendering**:
  - 3D objects only visible in relevant sections
  - `frustumCulled` optimization for off-screen objects
- **Adjustable DPR (Device Pixel Ratio)**:
  ```tsx
  <Canvas dpr={[0.7, 1.5]} />
  // Min: 0.7 for low-end devices
  // Max: 1.5 for high-DPI screens
  ```
- **Loading Screen Strategy**:
  - Minimum display time (3.5s) for UX consistency
  - Progress tracking with `useProgress` hook
  - Smooth transition after asset loading

- **Image Optimization**:
  - Thumbnail images for project cards
  - Full-size images only in modals
  - WebP format where supported

### 6. **Contact Form Integration**

Functional contact form with Web3Forms API:

```typescript
// Features:
- Form validation
- Async submission with loading states
- Success/error popup notifications
- Form reset after submission
- Reusable across section and modal contexts
```

### 7. **Animation Configuration**

Centralized Framer Motion config for consistent animations:

```typescript
{
  type: "spring",
  mass: 10,
  stiffness: 500,
  damping: 50,
  restDelta: 0.0001
}
```

### 8. **3D Models & Assets**

- **Avatar**: GLB model with FBX animations
- **Room**: Custom 3D room interior
- **Prisms**: Geometric shapes with tech icons
- **Earth**: Globe model with rotation capabilities
- **Environment**: Ambient lighting setup

### 9. **Context Architecture**

- **SectionContext**: Global section state (0-4)
- **UIContext**: Screen width tracking for responsive logic

## 🎨 Styling Architecture

### SCSS Structure

- **Modular Components**: Each component has its own SCSS file
- **Design Tokens**: Centralized `_tokens.scss` for colors, spacing, fonts
- **Mixins**: Reusable `_mixins.scss` for common patterns
- **BEM-like Methodology**: Block-Element naming convention

Example:

```scss
.home-section {
  &--loaded { ... }
  &--visible { ... }
}
```

## 📸 Screenshots

### Desktop Experience

1. **Home Section** - Animated avatar with glitch text effect
2. **Home Section (Menu Open)** - 3D avatar repositioning animation
3. **CV Modal** - In-browser PDF viewer
4. **Connect Modal** - Contact form with social links
5. **About Me Section** - Avatar in 3D room environment
6. **About Me (Menu Open)** - Room and avatar position changes
7. **Skills Section** - Interactive 3D prisms with tech icons
8. **Skills (Menu Open)** - Prisms rearrangement animation
9. **Projects Section** - Project cards with thumbnails and hashtags
10. **Project Modal** - Detailed view with image carousel
11. **Full-Screen Image Viewer** - Carousel with navigation controls
12. **Contact Section** - Form with interactive 3D Earth
13. **Contact (Menu Open)** - Earth repositioning animation

### Mobile Experience

_Responsive design adapts to all device sizes with optimized layouts and touch interactions._

> **Note**: Screenshots will be added to this section.

## 🎯 Performance Metrics

- **First Contentful Paint**: Optimized with code splitting
- **Time to Interactive**: Lazy loading reduces initial JS
- **Frame Rate**: Consistent 60fps on modern hardware
- **Bundle Size**: Analyzed with `source-map-explorer`

## 📄 License

© 2024-2026 Alex Anackis. All Rights Reserved.

This project is a personal portfolio created to showcase professional skills. The code is proprietary and not licensed for reuse, modification, or distribution without explicit permission.

## 📬 Contact

**Alex Anackis**

- 🌐 Portfolio: [alexanackis.com](https://www.alexanackis.com/)
- 💼 LinkedIn: [linkedin.com/in/alex-anackis](https://linkedin.com/in/alex-anackis)
- 🐙 GitHub: [@anackis](https://github.com/anackis)

---

**Built with ❤️ using React, TypeScript, and Three.js**
