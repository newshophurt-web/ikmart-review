const reviewTextEl = document.getElementById('reviewText');
const generateBtn = document.getElementById('generateBtn');
const reviewBtn = document.getElementById('reviewBtn');

async function loadReview() {
  reviewTextEl.innerText = "✍️ AI likh raha hai review…";
  try {
    const res = await fetch('/.netlify/functions/ai-review');
    if (!res.ok) throw new Error('Server error');
    const json = await res.json();
    reviewTextEl.innerText = json.review || "IK MART ekdam perfect shop hai — low price, high style 💖";
  } catch (err) {
    console.error(err);
    reviewTextEl.innerText = "IK MART ekdam perfect shop hai — low price, high style 💖";
  }
}

generateBtn.addEventListener('click', loadReview);

reviewBtn.addEventListener('click', () => {
  // open Google Maps business review page
  window.open('https://www.google.com/search?kgmid=%2Fg%2F11c1psxtm9', '_blank');
});
