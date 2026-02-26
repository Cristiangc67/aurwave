import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PlayerContextProvider } from "./context/PlayerContext";
import { Authprovider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authprovider>
      <PlayerContextProvider>
        <ToastProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ToastProvider>
      </PlayerContextProvider>
    </Authprovider>
  </StrictMode>
);
