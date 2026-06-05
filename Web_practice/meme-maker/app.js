const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
// 클래스가 color-option인 추천 색상 동그라미들을 다 긁어모은 뒤, 
// Array.from을 써서 forEach를 쓸 수 있는 진짜 배열로 바꿔버림
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const saveBtn = document.getElementById("save");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value; // 붓의 두께를 html의 5로 일치시켜줌
ctx.lineCap = "round"; // 선 끝부분 동그랗게 마감처리
let isPainting = false; // 현재 마우스를 누르고 그리고 있는지, 뗀 상태인지 기억하는 스위치
let isFilling = false; // 현재 그리기 모드인지 채우기 모드인지 기억하는 스위치

function onMove(event){
    if(isPainting){ // 마우스가 눌리면 가이드라인을 긋고 잉크를 칠한다
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY); // 그리진 않고 투명한 연필 촉을 움직임
}
function startPainting(){ // 나 그릴거야
    isPainting = true;
}
function cancelPainting(){ // 손 뗴거나 캔버스에서 벗어나면 안그려
    isPainting = false;
    ctx.beginPath(); // 이전의 선과 연결을 끊어주기 위해서
}
function onLineWidthChange(event){ // 두께 슬라이더 바를 움직이면 바뀐 수치를 실시간으로 반영
    ctx.lineWidth = event.target.value; 
}
function onColorChange(event){ // 색을 고르면 그리기와 채우기 색깔을 바꿔버림
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event){ // 색상 동그라미를 고르면 데이터 주머니에서 색상 코드를 뽑아와서 넣음
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }

}
function onCanvasClick(){ // 채우기 모드일때
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick(){ // 빈 도화지로 만들기
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChange(event){
    const file = event.target.files[0];
    // 유저가 컴퓨터에서 사진을 업로드 하면 업로드 파일 배열 중 첫번째를 꺼냄
    const url = URL.createObjectURL(file); // 임시 가상 주소를 발급해서 변수에 저장
    const image = new Image();
    image.src = url; // 이미지 태그를 생성해서 가상 주소를 소스로 먹여줌
    image.onload = function(){ // 로딩이 끝나면 이미지를 그리고 다 그리면 input을 청소해줌
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}
function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") { // 입력창에 쓴 글자가 비어있지 않다면
        ctx.save(); // 스타일을 바꾸기 직전인 현재 상태를 저장해두고 작업을 시작함
        ctx.lineWidth = 1; // 글자를 그리기 위해 붓을 얇게 설정
        ctx.font = "68px sans-serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore(); // save에서 저장해둔 스타일을 그대로 꺼내와서 원상복구 시킴
    }
}
function onSaveClick() { // 내가 캔버스에 그린 그림을 이미지로 내 컴퓨터에 저장하는 기능
    const url = canvas.toDataURL(); // 그림 전체를 엄청나게 긴 텍스트 주소로 변환
    const a = document.createElement("a"); // 링크 상자를 만들어버림
    a.href = url; // 링크의 주소를 url로 저장
    a.download = "myDrawing.png"; // 파일 이름으로 다운로드
    a.click(); // 가상 링크를 누른 것처럼 컴퓨터가 대신 누름
}


// 이벤트를 함수에 맞춰서 추가
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
// document.addEventListener("mouseup", onMouseUp); 또다른 방법
// 캔버스 내가 아니라 문서 전체로 해서 마우스를 누르고 캔버스를 벗어나도 적용됨
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);