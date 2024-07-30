let buffer = "0";
let runningTotal = 0;
let previousOperator;
const calcScreen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(number) {
  // calcScreen = document.querySelector(".screen");
  if (number === 0) {
    if (parseInt(buffer.at(-1)) === 0) {
      buffer = buffer;
    } else {
      buffer += number;
    }
  } else {
    if (parseInt(buffer.at(-1)) === 0 && isNaN(parseInt(buffer.at(-2)))) {
      buffer = buffer.slice(0, -1) + number;
    } else {
      buffer += number;
    }
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
        break;
      } else {
        buffer = buffer.slice(0, -1);
        break;
      }
    case "÷":
    case "×":
    case "-":
    case "+":
      handleMaths(symbol);
      break;
    case "=":
      if (previousOperator === null) {
        // Do nothing (needs two operands to find result)
        return;
      } else {
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
      }
      break;
  }
}

function handleMaths(symbol) {
  /* if (buffer === "0") {
    // do nothing
    return;
  } */

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
}

function init() {
  document
    .querySelector(".buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

function rerender() {
  calcScreen.innerText = buffer;
}

function screenAppend(character) {
  buffer += character;
}

init();
