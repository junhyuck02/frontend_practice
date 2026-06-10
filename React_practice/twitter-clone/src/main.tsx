import { StrictMode } from "react";
// StrictMode 검사 도구 불러올게
import { createRoot } from "react-dom/client";
// 리액트가 웹 브라우저(DOM)에 화면을 그릴 수 있게 해주는 그리기 엔진인 createRoot를 불러옴
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
