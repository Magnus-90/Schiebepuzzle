const size = 4;
const container = document.querySelector(".grid-container");
let tiles = Array.from(container.children);
tiles.sort(() => Math.random() - 0.5);
tiles.forEach(tile => container.appendChild(tile));
function getEmpty(){
  return document.getElementById("leer");
}

function getPos(index){
  return { row: Math.floor(index / size), col: index % size};
}

container.addEventListener("click", (e) => {
  const tile = e.target;
  const empty = getEmpty();
  if (!tile.classList.contains("item") || tile === empty) return;
  const tilesArray = Array.from(container.children);
  const tileIndex = tilesArray.indexOf(tile);
  const emptyIndex = tilesArray.indexOf(empty);
  const tileRow = Math.floor(tileIndex / size);
  const tileCol = tileIndex % size;
  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;
  if ((tileRow === emptyRow && Math.abs(tileCol - emptyCol) === 1) ||
      (tileCol === emptyCol && Math.abs(tileRow - emptyRow) === 1)) {
    swapTiles(tile, empty);
    checkWin();
  }
});

function swapTiles(tile, empty){
  const temp = document.createElement("div");
  container.replaceChild(temp, tile);
  container.replaceChild(tile, empty);
  container.replaceChild(empty, temp);
}


function checkWin() {
  const allTiles = Array.from(container.children);
  const allCorrect = allTiles.every((tile, index) => {
    if (tile.id === "leer") return true;
    return parseInt(tile.dataset.cardinfo) === index + 1;
  });

  if (allCorrect) {
    alert("Alles Richtig :)");
  }
}
