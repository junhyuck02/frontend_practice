const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // 문자열로 변환
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    // 클릭된 x 버튼을 감싸고 있는 부모태그인 li를 가져온다
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    // 데이터 배열에서 배열 속 투두의 id가
    // 우리가 방금 화면에서 지운 li 태그의 id와 같지 않은 것들만 남기라는 것
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = ""; // 입력창에 남아있는 글자 지우기
    const newTodoObj = { // 데이터를 객체로 업그레이드
        text: newTodo,
        id: Date.now(), // 매번 다른 숫자가 나오도록 id를 달아줌, 구별 가능하게
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) { // 투두리스트에 데이터가 존재한다면
    const parsedToDos = JSON.parse(savedToDos); // 객체로 변환
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo); // 배열에 담긴 개수만큼 반복문 돌려주기 (forEach)
}