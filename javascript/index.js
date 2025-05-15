function updateTime() {
//LOS ANGELES
let losAngelesEl = document.querySelector("#los-angeles");
let losAngelesDateEl = losAngelesEl.querySelector(".date");
let losAngelesTimeEl = losAngelesEl.querySelector(".time");
let losAngelesTime = moment().tz("America/Los_Angeles");

losAngelesDateEl.innerHTML = moment().format("ddd, MMMM Do, YYYY");
losAngelesTimeEl.innerHTML = losAngelesTime.format("h:mm [<small>]A[</small>]");

//PARIS
let parisEl = document.querySelector("#paris");
if (parisEl) {
    let parisDateEl = parisEl.querySelector(".date");
    let parisTimeEl = parisEl.querySelector(".time");
    let parisTime = moment().tz("Europe/Paris");

    parisDateEl.innerHTML = moment().format("ddd, MMMM Do, YYYY");
    parisTimeEl.innerHTML = parisTime.format("h:mm [<small>]A[</small>]");
}

//TOKYO
let tokyoEl = document.querySelector("#tokyo");
if (tokyoEl) {
    let tokyoDateEl = tokyoEl.querySelector(".date");
    let tokyoTimeEl = tokyoEl.querySelector(".time");
    let tokyoTime = moment().tz("Asia/Tokyo");

    tokyoDateEl.innerHTML = moment().format("ddd, MMMM Do, YYYY");
    tokyoTimeEl.innerHTML = tokyoTime.format("h:mm [<small>]A[</small>]");
}
}

function updateCity(event) {
    let cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess();
    }
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let cityTime = moment().tz(cityTimeZone);
    let citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = `
    <div class="city">
          <div>
            <h2>${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do, YYYY")}</div>
          </div>
          <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format("A")}</small></div>
        </div>
    `
}


setInterval(updateTime, 1000);
updateTime();

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);

const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');

function setTime() {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const hours = time.getHours();
    const hoursForClock = hours % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`;
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`;
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`;

   
}
 const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime();

setInterval(setTime, 1000);