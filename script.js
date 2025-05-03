const fonts = [
  "'Orbitron', sans-serif",
  "'Rubik', sans-serif",
  "'Permanent Marker', cursive",
  "'Press Start 2P', cursive",
  "'Anton', sans-serif",
  "'Bebas Neue', sans-serif",
  "'Monoton', cursive"
];

const names = [
  "Electric Lobster",
  "Velvet Avalanche",
  "Neon Sphinx",
  "Crimson Echo",
  "Quantum Banjo",
  "Static Prism",
  "Feral Eclipse",
  "Glass Panther",
  "Turbo Halo",
  "Siren Spiral",
  "Grunge Oracle",
  "Cyborg Dove"
];

const savedList = document.getElementById("savedNames");
const bandNameBox = document.getElementById("bandName");
const pageTitle = document.getElementById("pageTitle");
const savedTitle = document.getElementById("savedTitle");
const generatorContainer = document.getElementById("generatorContainer");

let savedCount = 0;
const MAX_SAVED = 6;

// Pre-fill saved slots
window.onload = () => {
  for (let i = 0; i < MAX_SAVED; i++) {
    const placeholder = document.createElement("li");
    placeholder.innerHTML = "&nbsp;";
    savedList.appendChild(placeholder);
  }
};

function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 180 + 50);
  const g = Math.floor(Math.random() * 180 + 50);
  const b = Math.floor(Math.random() * 180 + 50);
  return `rgb(${r},${g},${b})`;
}

function generateName() {
  const name = getRandomFrom(names);
  const font = getRandomFrom(fonts);
  const size = `${Math.floor(Math.random() * 14) + 26}px`;
  const color = getRandomColor();

  // Apply styles to band name box
  bandNameBox.textContent = name;
  bandNameBox.style.fontFamily = font;
  bandNameBox.style.fontSize = size;
  bandNameBox.style.color = color;

  // Change page theme to match band name style
  pageTitle.style.color = color;
  savedTitle.style.color = color;
  generatorContainer.style.borderColor = color;

  // Save name as styled copy
  const li = document.createElement("li");
  li.textContent = name;
  li.style.fontFamily = font;
  li.style.fontSize = size;
  li.style.color = color;

  // Replace oldest entry if at max
  if (savedList.children.length >= MAX_SAVED) {
    savedList.removeChild(savedList.children[0]);
  }

  savedList.appendChild(li);
}

function copyName() {
  const name = bandNameBox.textContent;
  navigator.clipboard.writeText(name).then(() => {
    alert("Band name copied!");
  });
}

function downloadGeneratorImage() {
  html2canvas(document.getElementById("generatorContainer")).then(canvas => {
    const link = document.createElement("a");
    link.download = "band-name.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
