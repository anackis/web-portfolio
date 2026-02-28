import {
  artGalleryThumb,
  clipitThumb,
  foodAppThumb,
  webShopThumb,
  bankThumb,
  marvelThumb,
  runsmartThumb,
  webPortfolioThumb,
  oldportfolioThumb,
  heroesThumb,
  foodThumb,
  adminPanelThumb,
  blogThumb,
  productlistThumb,
  artGalleryImages,
  clipitImages,
  foodAppImages,
  webShopImages,
  bankImages,
  marvelImages,
  runsmartImages,
  webPortfolioImages,
  oldPortfolioImages,
  heroesImages,
  foodImages,
  adminPanelImages,
  blogImages,
  productListImages,
  pineappleThumb,
  pineappleImages,
  templateThumb,
  templateImages,
} from "./project-img"
import { ProjectData } from "types/projects"

export const projects1: ProjectData[] = [
  {
    title: "Web 3D Portfolio",
    thumbnail: webPortfolioThumb,
    imgs: webPortfolioImages,
    linkGitHub: "https://github.com/anackis/Portfolio_V3",
    description:
      "Web 3D portfolio featuring interactive Three.js scenes with scroll-based animations and responsive design.",
    description_detailed:
      "A cutting-edge portfolio web application that combines React, TypeScript, and Three.js to create an immersive 3D experience. Built with React Three Fiber and Framer Motion 3D, the app features five interactive sections (Home, About, Skills, Projects, Contact) with smooth scroll-based transitions and adaptive 3D scene layouts. The 3D environment includes an animated avatar, room interior, rotating Earth model, and floating technology icons rendered from GLB models. Implements custom camera animations that respond to user interactions, intelligent scroll manager with touch/swipe support for mobile devices, and responsive breakpoints for optimal viewing across all screen sizes. Features lazy-loaded modals for CV display, project details with full-screen image galleries, and a fully functional contact form integrated with Web3Forms API. The architecture leverages Context API for global state management, custom React hooks for complex animations and scene layouts, and SCSS modular styling. Performance-optimized with conditional rendering, adjustable DPR (device pixel ratio), and minimum loading time management to ensure smooth 60fps experience.",
    hashtags: ["#React", "#Three.js", "#TypeScript"],
  },
  {
    title: "React Frontend Template",
    thumbnail: templateThumb,
    imgs: templateImages,
    link: "https://keeper-9ac3e.web.app/",
    linkGitHub: "https://github.com/anackis/frontend-template-public",
    description:
      "React template with advanced theming ,MUI material, draggable dashboard, backend logic and user management system.",
    description_detailed:
      "React frontend template engineered to accelerate web application development. Built with React 18, TypeScript 5.8, Vite 7, and Material-UI 7, it provides a complete foundation covering authentication, data persistence, UI customization, and internationalization. Firebase integration covers the full backend stack: email/password authentication via Cloud Functions with display name validation, Firestore for public and private user profile storage, Firebase Storage for avatar uploads, and callable serverless functions for secure data mutations. The advanced theming system supports dynamic light/dark mode switching and real-time primary color customization — including a custom color picker with eyedropper support — with preferences persisted to localStorage for guests and Firestore for authenticated users. The interactive dashboard is powered by React Grid Layout featuring drag-and-drop repositioning, resizable widgets across 5 responsive breakpoints (lg/md/sm/xs/xxs), collision prevention, and layout persistence via localStorage with debounced writes. Multi-language support (English and Latvian) is implemented via i18next with smart persistence: language preference is saved to Firestore for logged-in users and localStorage for guests. Account management includes a tabbed settings page (Profile, Security, Account Actions), avatar upload with browser-side image compression and react-easy-crop cropping dialog, and public/private info editing with reauthentication guards. The global dialog system uses Context API with a promise-based API to drive Confirm, Error, Status, and Login modals from anywhere in the app. Navigation consists of a top navbar, collapsible left sidebar with grouped navigation items, and a right customizer sidebar. All forms use React Hook Form with Zod schema validation. Architecture leverages four Context providers (User, Dialog, UI, Style) for global state, custom hooks encapsulating Firebase logic, SCSS modular styling, and route-based code splitting with lazy loading for optimal bundle size.",
    hashtags: ["#React", "#TypeScript", "#MUI"],
  },
  {
    title: "Art Gallery",
    thumbnail: artGalleryThumb,
    imgs: artGalleryImages,
    link: "http://test6.alexanackis.com/",
    linkGitHub: "https://github.com/anackis/art-gallery",
    description:
      "React-based art gallery application showcasing random paintings from the Metropolitan Museum.",
    description_detailed:
      "An interactive art gallery web application built with React and TypeScript that integrates the Metropolitan Museum of Art Collection API. The app features random artwork discovery, displaying paintings with comprehensive metadata (artist, date, culture, medium), full-screen image viewer, and responsive design with slider functionality on mobile devices. Implements custom React hooks for data fetching, client-side caching for performance optimization, and uses React Router for smooth page transitions. The architecture follows modern React patterns with TypeScript type safety and SCSS modular styling.",
    hashtags: ["#React", "#TypeScript", "#API"],
  },
  {
    title: "ClipIt",
    thumbnail: clipitThumb,
    imgs: clipitImages,
    link: "http://www.test7.alexanackis.com/",
    linkGitHub: "https://github.com/anackis/Angular_Learning_ZTM_2",
    description:
      "The #1 app to watch, clip, and share your awesome gaming moments with your friends and the world!",
    description_detailed:
      "The #1 app to watch, clip, and share your awesome gaming moments with your friends and the world! With our world-class tools, we make it incredibly easy to share your videos. Get started today!",
    hashtags: ["#Angular", "#TypeScript", "#Firebase"],
  },
  {
    title: "Food App",
    thumbnail: foodAppThumb,
    imgs: foodAppImages,
    link: "http://test8.alexanackis.com/",
    linkGitHub: "https://github.com/anackis/Food_App_Form_Scratch/tree/main",
    description:
      "This app is mix of Instagram about food and app for calculating calories / creating diet.",
    description_detailed:
      "This app is mix of Instagram about food and app for calculating calories / creating diet.",
    hashtags: ["#React", "#Firebase"],
  },
  {
    title: "Web Shop",
    thumbnail: webShopThumb,
    imgs: webShopImages,
    link: "http://test4.alexanackis.com/",
    linkGitHub: "https://github.com/anackis/WebShop",
    description:
      "This is web shop with catalog of items, account creation and skrill payments.",
    description_detailed:
      "This is web shop with catalog of items, account creation and skrill payments.",
    hashtags: ["#React", "#Redux", "#Firebase"],
  },
  {
    title: "Web Bank",
    thumbnail: bankThumb,
    imgs: bankImages,
    link: "http://www.test.alexanackis.com/",
    linkGitHub: "https://github.com/anackis/Web_Bank_App_From_Scratch",
    description:
      "Web bank where users can add funds to balance and send funds to other bank users.",
    description_detailed:
      "Web bank where users can add funds to balance and send funds to other bank users.",
    hashtags: ["#React", "#Firebase"],
  },
  {
    title: "Run Smart",
    thumbnail: runsmartThumb,
    imgs: runsmartImages,
    link: "http://test1.alexanackis.com/#promo",
    linkGitHub: "https://github.com/anackis/ProjectNr2",
    description:
      "Webpage for selling sport gear. Have features as sliders, form sending and Google Map Api.",
    description_detailed:
      "Webpage for selling sport gear. Have features as sliders, form sending and Google Map Api.",
    hashtags: ["#JavaScript", "#API", "#Gulp"],
  },
]

export const projects2: ProjectData[] = [
  {
    title: "Portfolio",
    thumbnail: oldportfolioThumb,
    imgs: oldPortfolioImages,
    linkGitHub: "https://github.com/anackis/Portfolio",
    description:
      "Old Portfolio on React with adaptive design, sliders and email send form.",
    description_detailed:
      "Old Portfolio on React with adaptive design, sliders and email send form.",
    hashtags: ["#React", "#EmailJs", "#Responsive"],
  },
  {
    title: "Marvel",
    thumbnail: marvelThumb,
    imgs: marvelImages,
    // link: "http://test2.alexanackis.com/#",
    linkGitHub: "https://github.com/anackis/Marvel-Wiki",
    description:
      "Marvell wiki build with Marvel Api. Currently API was closed and no more available.",
    description_detailed:
      "Marvell wiki build with Marvel Api. Currently API was closed and no more available.",
    hashtags: ["#React", "#API", "#FSM"],
  },
  {
    title: "Heroes Creator",
    thumbnail: heroesThumb,
    imgs: heroesImages,
    linkGitHub: "https://github.com/anackis/Heroes-Creator-Filter",
    description:
      "Creation form with filter for practicing Redux and Json Server.",
    description_detailed:
      "Creation form with filter for practicing Redux and Json Server.",
    hashtags: ["#React", "#Redux", "#JsonServer"],
  },
  {
    title: "Pineapple",
    thumbnail: pineappleThumb,
    imgs: pineappleImages,
    linkGitHub: "https://github.com/anackis/Junior-Mid-recruiting-task",
    description: "This is recruiting task. Form page with validation.",
    description_detailed: "This is recruiting task. Form page with validation.",
    hashtags: ["#React", "#PixelPerfect", "#Formik+Yup"],
  },
  {
    title: "Web Food",
    thumbnail: foodThumb,
    imgs: foodImages,
    linkGitHub: "https://github.com/anackis/Food-Store",
    description:
      "Beautiful website about food with calories calculator built with Javascript.",
    description_detailed:
      "Beautiful website about food with calories calculator built with Javascript.",
    hashtags: ["#JavaScript", "#JSON"],
  },
  {
    title: "Admin Panel",
    thumbnail: adminPanelThumb,
    imgs: adminPanelImages,
    linkGitHub: "https://github.com/anackis/Workers-Admin-Panel",
    description:
      "Admin panel for workers management for practicing React Hooks and Components.",
    description_detailed:
      "Admin panel for workers management for practicing React Hooks and Components.",
    hashtags: ["#React", "#ReactHooks/Components"],
  },
  {
    title: "Web Blog",
    thumbnail: blogThumb,
    imgs: blogImages,
    linkGitHub: "https://github.com/anackis/Project_1.13_Blog_V2",
    description:
      "Blog project with post creation for practicing EJS and MongoDb.",
    description_detailed:
      "Blog project with post creation for practicing EJS and MongoDb.",
    hashtags: ["#EJS", "#MongoDb"],
  },
  {
    title: "Product List",
    thumbnail: productlistThumb,
    imgs: productListImages,
    linkGitHub:
      "https://github.com/anackis/Products-List_and_Add-Product-Panel",
    description: "This is recruiting task. Products list with admin panel.",
    description_detailed:
      "This is recruiting task. Products list with admin panel.",
    hashtags: ["#React", "#PHP", "#MySql"],
  },
]
