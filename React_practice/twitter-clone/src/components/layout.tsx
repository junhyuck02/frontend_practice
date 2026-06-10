import { Outlet } from "react-router-dom";
// 부모의 뼈대는 그대로고 안의 자식(내용물)만 바뀔 때 사용함

export default function Layout() {
  return (
    <>
      <h2>layout</h2>
      <Outlet />
    </>
  );
}
