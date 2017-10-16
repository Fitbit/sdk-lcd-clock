import document from "document";
import * as messaging from "messaging";

let page = document.getElementById("page");

// TIME
let separator = document.getElementById("separator");
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");

// DATE
let day = document.getElementById("day");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");

clocker();
setInterval(clocker, 1000);

function clocker() {
  let d = new Date();

  // DATE
  setDate(d.getDate());

  // DAY NAME
  setDay(d.getDay());

  // HOURS
  let hour = ("0" + d.getHours()).slice(-2);
  setHours(hour);

  // MINUTES
  let minute = ("0" + d.getMinutes()).slice(-2);
  setMins(minute);

  // BLINK SEPARATOR
  setSeparator(d.getSeconds());
}

// Apply theme colors to elements
function applyTheme(background, foreground) {
  let items = document.getElementsByClassName("background");
  items.forEach(function(item) {
    item.style.fill = background;
  });
  let items = document.getElementsByClassName("foreground");
  items.forEach(function(item) {
    item.style.fill = foreground;
  });
}

// Blink time separator
function setSeparator(val) {
  separator.style.display = (val % 2 === 0 ? "inline" : "none");
}

function setHours(val) {
  drawDigits("", val, hours1, hours2);
}

function setMins(val) {
  drawDigits("", val, mins1, mins2);
}

function setDate(val) {
  drawDigits("datenum_", val, date1, date2);
}

function setDay(val) {
  day.href = getDayImg(val);
}

function drawDigits(prefix, val, place1, place2) {
  place1.href = prefix + Math.floor(val / 10) + ".png";
  place2.href = prefix + Math.floor(val % 10) + ".png";
}

function getDayImg(index) {
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return "day_" + days[index] + ".png";
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // console.log("device got: " + evt.data.background);
  applyTheme(evt.data.background, evt.data.foreground);
}
