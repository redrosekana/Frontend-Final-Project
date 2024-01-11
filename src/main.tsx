import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// redux
import { store } from "./store/store";
import { Provider } from "react-redux";

import App from "./App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
