function updateTime() {
//LOS ANGELES
let losAngelesEl = document.querySelector("#los-angeles");
let losAngelesDateEl = losAngelesEl.querySelector(".date");
let losAngelesTimeEl = losAngelesEl.querySelector(".time");
let losAngelesTime = moment().tz("America/Los_Angeles");


losAngelesDateEl.innerHTML = moment().format("MMMM Do, YYYY");
losAngelesTimeEl.innerHTML = losAngelesTime.format("h:mm:ss [<small>]A[</small>]");

//PARIS
let parisEl = document.querySelector("#paris");
let parisDateEl = parisEl.querySelector(".date");
let parisTimeEl = parisEl.querySelector(".time");
let parisTime = moment().tz("Europe/Paris");


parisDateEl.innerHTML = moment().format("MMMM Do, YYYY");
parisTimeEl.innerHTML = parisTime.format("h:mm:ss [<small>]A[</small>]");
}

setInterval(updateTime, 1000);