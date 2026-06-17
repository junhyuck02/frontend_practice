import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut();
    // firebase에서 제공하는 로그아웃 하는 함수
    navigate("/login");
  };
  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
    </h1>
  );
}

// 아니 왜안돼?? + 코드 챌린지 (비밀번호 초기화하면 그게 이메일로 보내지는지)
