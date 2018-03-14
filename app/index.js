import { me } from "appbit";
import clock from "clock";
import document from "document";
import * as fs from "fs";
import * as messaging from "messaging";
import { preferences } from "user-settings";
import * as util from "./utils";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings = loadSettings();
applyTheme(settings.background, settings.foreground);

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

clock.granularity = "seconds";

clock.ontick = evt => {
  let d = evt.date;

  // DATE
  setDate(d.getDate());

  // DAY NAME
  setDay(d.getDay());

  // HOURS
  let hours = d.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  setHours(hours);

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
  settings.background = background;
  settings.foreground = foreground;
}

// Blink time separator
function setSeparator(val) {
  separator.style.display = (val % 2 === 0 ? "inline" : "none");
}

function setHours(val) {
  if (val > 9) {
    drawDigit(Math.floor(val / 10), hours1);
  } else {
    drawDigit("", hours1);
  }
  drawDigit(Math.floor(val % 10), hours2);
}

function setMins(val) {
  drawDigit(Math.floor(val / 10), mins1);
  drawDigit(Math.floor(val % 10), mins2);
}

function setDate(val) {
  drawDigit(Math.floor(val / 10), date1);
  drawDigit(Math.floor(val % 10), date2);
}

function setDay(val) {
  day.image = getDayImg(val);
}

function drawDigit(val, place) {
  place.image = `${val}.png`;
}

function getDayImg(index) {
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return `day_${days[index]}.png`;
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = evt => {
  applyTheme(evt.data.background, evt.data.foreground);
}

// Register for the unload event
me.onunload = saveSettings;

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    return {
      background: "#000000",
      foreground: "#FFFFFF"
    }
  }
}

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
