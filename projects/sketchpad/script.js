const gridContainer = document.querySelector('#GridContainer');

const resetButton = document.querySelector('#ResetButton');
resetButton.onclick = resetGrid;

const dimensionButton = document.querySelector('#DimensionButton');
dimensionButton.onclick = changeDimension;

const borderCheckbox = document.querySelector('#BorderCheckbox');
borderCheckbox.onclick = toggleBorders;

let currentDimension = 8;

function setupGrid(dimension) {
    for (let i = 0; i < dimension; i++) {
        let newRow = document.createElement("div");
        newRow.className = "grid-row";
        for (let j = 0; j < dimension; j++) {
            let newSquare = document.createElement("div");
            newSquare.className = "grid-square";
            let text = document.createTextNode(" ");
            newSquare.appendChild(text);
            newRow.appendChild(newSquare);
        }
        gridContainer.appendChild(newRow);
    }
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach((square) => {
        square.addEventListener('mouseenter', () => {
            colorSquare(square);
        });
    });
}

function colorSquare(square) {
    //console.log("called colorsquare!");
    square.style.backgroundColor = generateRandomRGB();
}

function generateRandomRGB() {
    let retString = "rgb(";
    for (let i = 0; i < 3; i++) {
        let newVal = Math.floor(Math.random() * 256);
        retString += newVal;
        if (i < 2) {
            retString += ", ";
        }
    }
    retString += ")";
    //console.log(retString);
    return retString;

}

function changeDimension() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    let newDimension = prompt("Input the dimension of the grid [1-100]");
    if (newDimension < 1) {
        newDimension = 1;
    }
    if (newDimension > 100) {
        newDimension = 100;
    }
    setupGrid(newDimension);
}

function resetGrid() {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach((square) => {
        square.style.backgroundColor = "rgb(218, 218, 218)";
    });
}

function toggleBorders() {
    //console.log("calling toggleBorders()");
    const squares = document.querySelectorAll('.grid-square');
    if (borderCheckbox.checked) {
        squares.forEach((square) => {
            //console.log("turning border on");
            square.style.borderWidth = "2px";
        });
    }
    else {
        squares.forEach((square) => {
            //console.log("turning border off");
            square.style.borderWidth = "0px";
        });
    }

}

setupGrid(8);