// import { senddata } from "./resolve";
const attachbtn = document.querySelector(".attach-btn");
const submitbtn = document.querySelector(".submit-btn");
const fileinput = document.querySelector(".fileinput");

const selector = document.querySelector(".selector");
const promptbox = document.querySelector(".promptbox");


const origin = "http://localhost:5000";

var selected = selector.value;

promptbox.placeholder = `Message ${selected}`

selector.addEventListener("change", () => {
    selected = selector.value;
    promptbox.placeholder = `Message ${selected}`;
})

attachbtn.addEventListener("click", () => fileinput.click())