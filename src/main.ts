import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
} else {
  if (localStorage.getItem("theme") == "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
