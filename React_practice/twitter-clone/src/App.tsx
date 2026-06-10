import { createBrowserRouter, RouterProvider } from "react-router-dom";
// createBrowserRouter: 라우터의 설계도를 만드는 함수
// RouterProvider: 설계도를 실제로 적용하는 도구
import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
// createGlobalStyle: 웹사이트 전체에 적용될 공통 스타일(글로벌 스타일)을 정의할 때 쓰는 도구
import reset from "styled-reset";
// 모든 브라우저의 기본 스타일(여백, 글자 크기 등)을 깔끔하게 초기화해주는 도구
import { useState, useEffect } from "react";

const myRouter = createBrowserRouter([
  // 설계도 생성하기
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  // 먼저 Layout을 보여주고 달라지는 부분만 Outlet으로 자식을 갈아 끼우는 형식
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/create-account", element: <CreateAccount /> },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`; // reset으로 브라우저를 초기화 해주고 공통설정을 적용하기

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    // wait for firebase
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={myRouter} />}
      {/* 라우터 설계도를 앱에 적용해주기, router 속성명은 고정임 */}
    </>
  );
}

export default App;
