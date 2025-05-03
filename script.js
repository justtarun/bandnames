const bandNameBox = document.getElementById("bandName");
const savedNamesList = document.getElementById("savedNames");
const darkModeToggle = document.getElementById("darkModeToggle");

const adjectives = ["Electric", "Neon", "Fuzzy", "Lunar", "Burning", "Silent", "Heavy", "Crimson", "Violet", "Shattered"];
const nouns = ["Tigers", "Echoes", "Storm", "Monks", "Voltage", "Screams", "Nomads", "Mirage", "Jackals", "Horizons"];
const fonts = ["Orbitron", "Rubik", "Poppins", "Arial", "Comic Sans MS"];
const colors = ["#ff6347", "#00ff00", "#1e90ff", "#ff1493", "#ff4500"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName() {
  const name = `${getRandom(adjectives)} ${getRandom(nouns)}`;
  bandNameBox.textContent = name;
  
  // Random font size and style
  bandNameBox.style.fontFamily = getRandom(fonts);
  bandNameBox.style.fontSize = `${Math.floor(Math.random() * 40) + 20}px`; // Random size between 20px and 60px
  
  // Random color
  bandNameBox.style.color = getRandom(colors);
}

function copyName() {
  const name = bandNameBox.textContent;
  if (name !== "Click Generate!") {
    navigator.clipboard.writeText(name).then(() => {
      alert("Band name copied to clipboard!");
    });
  }
}

function downloadGeneratorImage() {
  html2canvas(document.getElementById("generatorContainer")).then(function(canvas) {
    const link = document.createElement("a");
    link.download = "band_name_generator.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

function toggleDarkMode() {
  const isDarkMode = darkModeToggle.checked;
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.querySelector(".container").classList.toggle("dark-mode", isDarkMode);
  localStorage.setItem("darkMode", isDarkMode);
}

function loadDarkModePreference() {
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  darkModeToggle.checked = isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.querySelector(".container").classList.toggle("dark-mode", isDarkMode);
}

function shareOnTwitter() {
  const bandName = bandNameBox.textContent;
  if (bandName !== "Click Generate!") {
    const url = `https://twitter.com/intent/tweet?text=Check%20out%20my%20band%20name:%20${encodeURIComponent(bandName)}`;
    window.open(url, "_blank");
  }
}

function shareOnMastodon() {
  const bandName = bandNameBox.textContent;
  if (bandName !== "Click Generate!") {
    const url = `https://mastodon.social/share?text=Check%20out%20my%20band%20name:%20${encodeURIComponent(bandName)}`;
    window.open(url, "_blank");
  }
}

// Load dark mode setting on page load
window.onload = loadDarkModePreference;
