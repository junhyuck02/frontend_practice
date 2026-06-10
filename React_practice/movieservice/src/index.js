import React from "react";
// 리액트 라이브러리를 불러오기
import ReactDOM from "react-dom/client";
// 리액트가 만든 컴포넌트(우리가 짠 코드)를 실제 브라우저의 화면(DOM)에다가
// 그려낼 수 있게 해주는 도구(라이브러리)를 가져오겠다
import App from "./App";
// App.js 불러오기
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
// html 파일에 있는 root id를 찾아서 뿌리 공간을 만든다
root.render(
  //<React.StrictMode>
  <App />,
  //</React.StrictMode>
);
// <React.StrictMode>란?
// 개발 환경에서만 작동하는 일종의 검사 도구
// 앱 내부에 잠재적인 문제점(예: 사용하면 안 되는 예전 문법, 비효율적인 코드 등)이 있는지 미리 확인하고
// 콘솔에 경고를 띄워준다. 실제 배포되는 환경에서는 작동하지 않으며, 개발할 때
// 버그를 잡기 좋게 도와주는 안전벨트임
