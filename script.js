// script.js
async function loadReview() {
  const textBox = document.getElementById("reviewText");
  textBox.innerText = "AI likh raha hai review… ⏳";

  try {
    const res = await fetch("/.netlify/functions/generate-review");
    const json = await res.json();
    textBox.innerText = json.review;
  } catch (err) {
    textBox.innerText = "IK MART ekdam perfect shop hai — low price, high style 💖";
  }
}

document.getElementById("reviewBtn").addEventListener("click", () => {
  window.open("https://www.google.com/search?kgmid=%2Fg%2F11c1psxtm9", "_blank");
});

window.onload = loadReview;