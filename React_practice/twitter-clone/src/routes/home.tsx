import { auth } from "../firebase";

export default function Home() {
  const logOut = () => {
    auth.signOut();
    // firebase에서 제공하는 로그아웃 하는 함수
  };
  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
    </h1>
  );
}

// 아니 왜안돼?? + 코드 챌린지
