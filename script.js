const bandNameEl = document.getElementById("bandName");
const savedList = document.getElementById("savedNames");
const container = document.getElementById("generatorContainer");
const mainTitle = document.getElementById("mainTitle");
const savedLabel = document.getElementById("savedLabel");

const names = [
  "Solar Lungs", "Echo Mirage", "Velvet Engine", "Rust Phantom",
  "Moon Voltage", "Neon Ritual", "Grave Disco", "Crimson Circuit",
  "Dream Thief", "Shadow Pulse", "Quantum Grime", "Plastic Messiah"
];

const fonts = [
  "'Orbitron', sans-serif",
  "'Rubik', sans-serif",
  "'Courier New', monospace",
  "Impact, sans-serif",
  "'Lucida Console', monospace"
];

const colors = [
  "#ff0055", "#0099ff", "#ff9900", "#66ff66", "#cc00cc", "#4444ff"
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName() {
  const name = getRandom(names);
  const font = getRandom(fonts);
  const color = getRandom(colors);
  const size = Math.floor(Math.random() * 20) + 24;

  bandNameEl.textContent = name;
  bandNameEl.style.fontFamily = font;
  bandNameEl.style.color = color;
  bandNameEl.style.fontSize = size + "px";

  // Apply to page elements (not saved names)
  container.style.borderColor = color;
  mainTitle.style.color = color;
  savedLabel.style.color = color;

  // Save formatted name as-is
  const clone = bandNameEl.cloneNode(true);
  clone.style.margin = "0.5rem 0";

  // Remove oldest if already 6
  if (savedList.children.length >= 6) {
    savedList.removeChild(savedList.firstElementChild);
  }

  savedList.appendChild(clone);
}

function copyName() {
  navigator.clipboard.writeText(bandNameEl.textContent)
    .then(() => alert("Band name copied to clipboard!"));
}

function downloadGeneratorImage() {
  html2canvas(container).then(canvas => {
    const link = document.createElement("a");
    link.download = "band-name.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
