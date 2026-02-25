import ReactDOM from "react-dom/client"
import "./index.scss"
import "./components/sections/section.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { SectionProvider } from "./contexts/section-context"
import { App } from "./App"
import { UIProvider } from "./contexts/ui-context"

const rootElement = document.getElementById("root")

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <UIProvider>
      <SectionProvider>
        <App />
      </SectionProvider>
    </UIProvider>,
  )
} else {
  console.error("Failed to find the root element")
}
