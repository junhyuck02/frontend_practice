const weather = document.querySelector("#weather span:nth-child(1)");
const city = document.querySelector("#weather span:nth-child(2)");
const country = document.querySelector("#weather span:nth-child(3)");

const API_KEY = "";
// API 키 채워서 넣기

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        city.innerText = data.name;
        country.innerText = data.sys.country;
    });

}
function onGeoError(error) {
    console.log("위치 가져오기 실패 원인:", error.message);
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);