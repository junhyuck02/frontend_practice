import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    // 기존의 투두리스트에 새로운 투두 목록을 추가할려면 이렇게 해야함, 새로운 배열에 예전 배열의 요소들이 같이 추가되는 방식
    // 콘솔에 추가되는 부분이 보이는 코드
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
      </ul>
    </div>
  );
}

export default App;
