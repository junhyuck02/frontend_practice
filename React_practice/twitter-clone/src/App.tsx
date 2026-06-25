import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";

const myRouter = createBrowserRouter([
  // createBrowserRouter: 라우터의 설계도를 만드는 함수
  // 설계도 생성하기
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    // element: 어떤 요소를 보여줄 것인가?
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
    // children: 부모 페이지 안에 포함된 자식 페이지를 정의할 때 사용
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
`;
// createGlobalStyle: 웹사이트 전체에 적용될 공통 스타일(글로벌 스타일)을 정의할 때 쓰는 도구
// reset: 모든 브라우저의 기본 스타일(여백, 글자 크기 등)을 깔끔하게 초기화해주는 도구
// reset으로 브라우저를 초기화 해주고 공통설정을 적용하기

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    // firebase 제공, 인증 상태가 준비되었는지 기다리기
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={myRouter} />}
      {/* 
        RouterProvider: 설계도를 실제로 적용하는 도구
        라우터 설계도를 앱에 적용해주기, router 속성명은 고정임 
      */}
    </Wrapper>
  );
}

export default App;
