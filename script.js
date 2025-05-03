// script.js

const bandNameBox = document.getElementById("bandName");
const savedNamesList = document.getElementById("savedNames");
const container = document.getElementById("generatorContainer");

const adjectives = ["Electric", "Neon", "Fuzzy", "Lunar", "Burning", "Silent", "Heavy", "Crimson", "Violet", "Shattered"];
const nouns = ["Tigers", "Echoes", "Storm", "Monks", "Voltage", "Screams", "Nomads", "Mirage", "Jackals", "Horizons"];

const fonts = ["Orbitron", "Rubik", "Arial", "Courier New", "Georgia", "Verdana"];
const colors = ["#00ffee", "#ff4fa3", "#ffee00", "#88ffcc", "#ffaa00", "#ffffff"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName() {
  const name = `${getRandom(adjectives)} ${getRandom(nouns)}`;
  const font = getRandom(fonts);
  const size = `${Math.floor(Math.random() * 20 + 24)}px`;
  const color = getRandom(colors);

  bandNameBox.textContent = name;
  bandNameBox.style.fontFamily = font;
  bandNameBox.style.fontSize = size;
  bandNameBox.style.color = color;
  bandNameBox.style.textShadow = `0 0 10px ${color}`;

  renderSavedNames(name, font, size, color);
}

function copyName() {
  const name = bandNameBox.textContent;
  if (!name || name === "Click Generate!") return;
  navigator.clipboard.writeText(name).then(() => {
    alert("Band name copied to clipboard!");
  });
}

function downloadGeneratorImage() {
  html2canvas(container).then(canvas => {
    const link = document.createElement("a");
    link.download = "band_name_generator.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

function renderSavedNames(name, font, size, color) {
  const maxNames = 10;
  const li = document.createElement("li");
  li.textContent = name;
  li.style.fontFamily = font;
  li.style.fontSize = size;
  li.style.color = color;
  li.style.textShadow = `0 0 6px ${color}`;

  savedNamesList.prepend(li);

  while (savedNamesList.children.length > maxNames) {
    savedNamesList.removeChild(savedNamesList.lastChild);
  }
}

// Initial styling for placeholder
bandNameBox.style.fontFamily = getRandom(fonts);
bandNameBox.style.fontSize = "32px";
bandNameBox.style.color = getRandom(colors);
bandNameBox.style.textShadow = `0 0 10px ${bandNameBox.style.color}`;
