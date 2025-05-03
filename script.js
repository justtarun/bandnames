const bandNameBox = document.getElementById("bandName");
const savedNamesList = document.getElementById("savedNames");

const adjectives = ["Electric", "Neon", "Fuzzy", "Lunar", "Burning", "Silent", "Heavy", "Crimson", "Violet", "Shattered", "Blazing", "Thunderous", "Starry", "Shiny"];
const nouns = ["Tigers", "Echoes", "Storm", "Monks", "Voltage", "Screams", "Nomads", "Mirage", "Jackals", "Horizons", "Riders", "Wolves", "Phoenix", "Blizzards"];
const fonts = ["Orbitron", "Rubik", "Poppins", "Arial", "Comic Sans MS"];
const colors = ["#ff6347", "#00ff00", "#1e90ff", "#ff1493", "#ff4500", "#ffff00", "#800080", "#00ffff"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName() {
  const name = `${getRandom(adjectives)} ${getRandom(nouns)}`;
  bandNameBox.textContent = name;

  // Random color for the band name
  const nameColor = getRandom(colors);
  bandNameBox.style.color = nameColor;

  // Apply the same random color to the container
  document.querySelector(".container").style.color = nameColor;

  // Apply the same random font to the band name
  const randomFont = getRandom(fonts);
  bandNameBox.style.fontFamily = randomFont;

  // Apply a random font size (from 1.5rem to 3rem)
  const randomSize = `${Math.floor(Math.random() * 1.5) + 1.5}rem`;
  bandNameBox.style.fontSize = randomSize;

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
  savedNamesList.innerHTML = savedNames.map(name => `<li style="color: ${bandNameBox.style.color}; font-family: ${bandNameBox.style.fontFamily}; font-size: ${bandNameBox.style.fontSize};">${name}</li>`).join('');
}

// Load saved names on page load
window.onload = () => {
  displaySavedNames();
};
