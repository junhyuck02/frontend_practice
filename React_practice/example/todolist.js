import { useState } from "react";
// 리액트에서 제공하는 useState도구를 가져와서 사용하겠다
// 언제 사용해?
// 컴포넌트가 상태(데이터)를 기억하고, 그 상태가 바뀔 때마다 화면을 즉시 새로 그려야 할 때 사용

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    // 브라우저가 기본적으로 수행하는 동작을 막아라
    // 보통 form에서 많이 씀, 제출할때마다 새로고침하니까 -> 이러면 데이터 다 날라갈수도
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    // 기존의 투두리스트에 새로운 투두 목록을 추가할려면 이렇게 해야함, 새로운 배열에 예전 배열의 요소들이 같이 추가되는 방식
    // ... 이건 배열의 요소들을 낱개로 꺼내서 나열하는 것
    // 앞쪽에서부터 추가되며 데이터를 배열의 요소들을 낱개로 펼쳐놓은거에 추가해서 다시 배열로 합침

    // 콘솔에 추가되는 부분이 보이려면 이 코드로 사용
    // setToDos((currentArray) => {
    //   const newArray = [toDo, ...currentArray];
    //   console.log(newArray);
    //   return newArray;
    // });
    setToDo("");
  };
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do.."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        {/* map은 이 안에 함수를 넣을 수 있도록 해주는데 배열의 모든 요소에 대해 실행됨 */}
        {/* map은 배열에 들어있는 데이터를 하나씩 꺼내서, 똑같은 모양의 컴포넌트들로 변신시킬 때 사용
        보통 리스트를 화면에 그릴때 많이 사용함 */}
      </ul>
    </div>
  );
}

export default App;
