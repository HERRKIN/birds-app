import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import ApiProvider from "./providers/ApiProvider.tsx";

import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  </StrictMode>
);
