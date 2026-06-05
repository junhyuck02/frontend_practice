// useEffect의 기능과 예시
// import { useState, useEffect } from "react";

// function App() {
//   const [counter, setValue] = useState(0);
//   const [keyword, setKeyword] = useState("");
//   const onClick = () => setValue((prev) => prev + 1);
//   const onChange = (event) => setKeyword(event.target.value);
//   useEffect(() => {
//     console.log("I run only once.");
//   }, []); // 처음 실행 시에 딱 한번만 실행되고 다시는 하지 말어라
//   useEffect(() => {
//     console.log("I run when 'keyword' changes.");
//   }, [keyword]); // 시작할때, 이 keyword가 변화할때만 코드를 실행할거라고 알려주는 것
//   useEffect(() => {
//     console.log("I run when 'counter' changes");
//   }, [counter]); // 시작할때, 이 counter가 변화할때만 코드를 실행할거라고 알려주는 것
//   useEffect(() => {
//     console.log("I run when keyword & counter changes");
//   }, [keyword, counter]); // 시작할때, 이 keyword와 counter 둘중 하나라도 변화할때만 코드를 실행할거라고 알려주는 것
//   useEffect(() => {
//     if (keyword !== "" && keyword.length > 5) {
//       console.log("SEARCH FOR", keyword);
//     }
//   }, [keyword]); // 시작할때, 이 keyword가 변화할때만 코드를 실행할거라고 알려주는 것
//   return (
//     <div>
//       <input
//         value={keyword}
//         onChange={onChange}
//         type="text"
//         placeholder="Search here..."
//       />
//       <h1>{counter}</h1>
//       <button onClick={onClick}>click me</button>
//     </div>
//   );
// }

// export default App;

// Cleanup
import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("created :)");
    return () => console.log("destroyed :(");
    // 컴포넌트가 사라지거나 숨겨질때 뭔가를 하고싶을때 이용
  }, []);
  return <h1>Hello</h1>;

  // // 위에 껄 쪼개면
  // function byeFn() {
  //   console.log("bye :(");
  // }
  // function hiFn() {
  //   console.log("hi :)");
  //   // 언제 파괴되는지도 알고싶으면 hi가 bye를 return
  //   return byeFn;
  // }
  // useEffect(hiFn, []);
  // return <h1>Hello</h1>;

  // 동일한 두가지 방법 보통 짧은걸 더 많이 쓰긴함
  // function Hello() {
  //   useEffect(function () {
  //     console.log("hi :)");
  //     return function () {
  //       console.log("bye :(");
  //     };
  //   }, []);
  //   useEffect(() => {
  //     console.log("hi:)");
  //     return () => console.log("bye :(");
  //   }, []);
  //   return <h1>Hello</h1>;
  // }
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
