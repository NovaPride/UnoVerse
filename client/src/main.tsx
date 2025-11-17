import { Toaster } from "@/components/ui";
import { clientSocket } from "@/lib/client-socket";
import { store } from "@/redux/store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import "./index.css";

clientSocket.__private.connect("http://localhost:8080");

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>,
);
