// script.js

const bandNameBox = document.getElementById("bandName");
const savedNamesList = document.getElementById("savedNames");

const adjectives = ["Electric", "Neon", "Fuzzy", "Lunar", "Burning", "Silent", "Heavy", "Crimson", "Violet", "Shattered"];
const nouns = ["Tigers", "Echoes", "Storm", "Monks", "Voltage", "Screams", "Nomads", "Mirage", "Jackals", "Horizons"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName() {
  const name = `${getRandom(adjectives)} ${getRandom(nouns)}`;
  bandNameBox.textContent = name;
}

function saveName() {
  const name = bandNameBox.textContent;
  if (!name || name === "Click Generate!") return;

  const existing = JSON.parse(localStorage.getItem("bandNames")) || [];
  if (!existing.includes(name)) {
    existing.push(name);
    localStorage.setItem("bandNames", JSON.stringify(existing));
    renderSavedNames();
  }
}

function renderSavedNames() {
  const saved = JSON.parse(localStorage.getItem("bandNames")) || [];
  savedNamesList.innerHTML = "";
  saved.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    savedNamesList.appendChild(li);
  });
}

function downloadName() {
  const canvas = document.getElementById("downloadCanvas");
  const ctx = canvas.getContext("2d");
  const name = bandNameBox.textContent;
  if (!name || name === "Click Generate!") return;

  canvas.width = 600;
  canvas.height = 200;

  // Background
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text
  ctx.font = "bold 32px Orbitron, sans-serif";
  ctx.fillStyle = "#00ffee";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "#00ffee";
  ctx.shadowBlur = 10;
  ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  const link = document.createElement("a");
  link.download = `${name.replace(/ /g, "_")}_bandname.png`;
  link.href = canvas.toDataURL();
  link.click();
}

// Load saved names on startup
renderSavedNames();
