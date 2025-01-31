import { Provider as UiProvider } from "./components/ui/provider.jsx"
import { Provider } from "react-redux"
import store from './redux/store.js'
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UiProvider>
          <App />
        </UiProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)