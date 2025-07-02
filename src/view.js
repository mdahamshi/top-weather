import { addCopyRight } from "@sarawebs/sb-utils";

const form = document.getElementById("locationForm");
const input = document.getElementById("locationInput");
const display = document.getElementById("weatherDisplay");
const loading = document.getElementById("loading");
const message = document.getElementById("message");
const submitbtn = form.querySelector('button[type="submit"]');
export class View {
  constructor(appName) {
    addCopyRight(appName);
    document.querySelector("title").textContent = appName;
    document.getElementById("logo-name").textContent = appName;
  }
  async renderWeather(weatherRaw) {
    display.innerHTML = "";
    const forecast = await weatherRaw.renderForeCast();
    const ul = document.createElement("ul");
    forecast.forEach((day) => {
      const li = document.createElement("li");
      li.classList.add("card");
      li.appendChild(day);
      ul.appendChild(li);
    });
    display.append(ul);
  }
  disableButton() {
    submitbtn.disabled = true;
  }
  enableButton() {
    submitbtn.disabled = false;
  }
  showMessage(msg) {
    message.textContent = msg;
    if (!msg) {
      message.classList.add("hidden");
      return;
    }
    message.classList.remove("hidden");
  }
}
