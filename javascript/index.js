// -------------------- DIGITAL CLOCK --------------------

// Updates the date and time for a specific city
function updateCityTime(cityId, timeZone) {
  const cityEl = document.querySelector(`#${cityId}`);
  if (!cityEl) return;

  const dateEl = cityEl.querySelector(".date");
  const timeEl = cityEl.querySelector(".time");
  const cityTime = moment().tz(timeZone);

  dateEl.innerHTML = cityTime.format("ddd, MMMM Do, YYYY");
  timeEl.innerHTML = cityTime.format("h:mm [<small>]A[</small>]");

    // DAY/NIGHT LOGIC
  const hour = cityTime.hours();
  const isDayTime = hour >= 6 && hour < 18;

  const sunIcon = cityEl.querySelector(".fa-sun");
  const moonIcon = cityEl.querySelector(".fa-moon");
  const clockFace = cityEl.querySelector(".clock-face");

  if (sunIcon && moonIcon) {
    sunIcon.style.display = isDayTime ? "block" : "none";
    moonIcon.style.display = isDayTime ? "none" : "block";
  }

if (isDayTime) {
  cityEl.classList.remove("night-mode-card");
  clockFace.classList.remove("night-clock-face");
} else {
  cityEl.classList.add("night-mode-card");
  clockFace.classList.add("night-clock-face");
}

}

// Update time for all listed cities
function updateTime() {
  updateCityTime("los-angeles", "America/Los_Angeles");
  updateCityTime("paris", "Europe/Paris");
  updateCityTime("tokyo", "Asia/Tokyo");
}

// Handle city selection change
function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  const cityName = cityTimeZone.replace("_", " ").split("/")[1];
  const cityId = cityName.toLowerCase().replace(/ /g, "-");
  const cityTime = moment().tz(cityTimeZone);

  const citiesElement = document.querySelector("#cities");

  citiesElement.innerHTML = `
    <div class="city" id="${cityId}">
      <i class="fa-solid fa-sun"></i>
      <i class="fa-solid fa-moon"></i>
      <div class="clock-wrapper">
        <div class="clock-face">
          <div class="needle hour"></div>
          <div class="needle minute"></div>
          <div class="needle second"></div>
          <div class="center-point"></div>
        </div>
      </div>
      <div class="time">${cityTime.format("h:mm")}<small>${cityTime.format("A")}</small></div>
      <div class="date">${cityTime.format("ddd, MMMM Do, YYYY")}</div>
      <h2>${cityName}</h2>
    </div>
  `;

  updateCityTime(cityId, cityTimeZone);
  setAnalogTimeForCity(cityId, cityTimeZone);
}


// -------------------- ANALOG CLOCK --------------------
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};


function setAnalogTimeForCity(cityId, timeZone) {
  const cityEl = document.querySelector(`#${cityId}`);
  if (!cityEl) return;

  const hourEl = cityEl.querySelector('.hour');
  const minuteEl = cityEl.querySelector('.minute');
  const secondEl = cityEl.querySelector('.second');

  const now = moment().tz(timeZone);
  const hours = now.hours() % 12 + now.minutes() / 60; 
  const minutes = now.minutes();
  const seconds = now.seconds();

  hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hours, 0, 12, 0, 360)}deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`;
  secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`;
}

function updateAllAnalogClocks() {
  setAnalogTimeForCity("los-angeles", "America/Los_Angeles");
  setAnalogTimeForCity("paris", "Europe/Paris");
  setAnalogTimeForCity("tokyo", "Asia/Tokyo");
  setAnalogTimeForCity("auckland", "Pacific/Auckland");
  setAnalogTimeForCity("phoenix", "America/Phoenix");
  setAnalogTimeForCity("new-york", "America/New_York");
  setAnalogTimeForCity("london", "Europe/London");
}

//--------------------------------------------------

document.querySelector("#city").addEventListener("change", updateCity);

updateTime();
updateAllAnalogClocks();

setInterval(updateTime, 1000);
setInterval(updateAllAnalogClocks, 1000);

