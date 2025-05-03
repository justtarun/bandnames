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

  saveName(name);
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

function saveName(name) {
  // Store saved names in an array (limit to 6 entries)
  let savedNames = JSON.parse(localStorage.getItem("savedNames")) || [];
  if (savedNames.length >= 6) {
    savedNames.shift(); // Remove the oldest name if the limit is reached
  }
  savedNames.push(name);

  // Update the local storage and the UI
  localStorage.setItem("savedNames", JSON.stringify(savedNames));
  displaySavedNames();
}

function displaySavedNames() {
  let savedNames = JSON.parse(localStorage.getItem("savedNames")) || [];
  savedNamesList.innerHTML = savedNames.map(name => `<li>${name}</li>`).join('');
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

// Load saved names and dark mode preference on page load
window.onload = () => {
  loadDarkModePreference();
  displaySavedNames();
};

