const day = document.querySelector("#days");
const hour = document.querySelector("#hours");
const min = document.querySelector("#mins");
const second = document.querySelector("#seconds");

const commingDate = new Date("7 Jul 2023");

function timer() {
    const now = new Date();
    const secDiff = (commingDate - now) / 1000;
    const days = Math.floor(secDiff / 3600 / 24)
    const hours = addZero(Math.floor((secDiff / 3600) % 24))
    const mins = addZero(Math.floor((secDiff / 60) % 60));
    const secs = addZero(Math.floor((secDiff % 60)));
    day.innerHTML = days;
    hour.innerHTML = hours;
    min.innerHTML = mins;
    second.innerHTML = secs;


}

function addZero(t) {
    return t < 10 ? (`0${t}`) : t
}
timer()

setInterval(timer, 1000)