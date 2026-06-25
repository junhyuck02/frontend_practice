import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
  // 윗줄 의미: 이 컴포넌트 안에는 어떤 형태의 React 요소든 자식으로 들어올 수 있다
}) {
  const user = auth.currentUser;
  // .currentUser: firebase 제공, 로그인된 사용자의 정보가 담긴 객체
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
// <Navigate />: 렌더링 도중 페이지를 이동시켜야 할 때 사용
// useNavigate(): 특정 이벤트 발생 시 이동시킬 때 사용
