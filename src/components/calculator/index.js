let displaySum = "0";
let firstValue = null; // เก็บ ค่าแรก
let operator = null; //เก็บ ตัวดำเนินการ
let secondValue = false; //เก็บค่า 2
let clearType = "AC";
let activeOperatorButton = null; // ตัวแปรเพื่อเก็บปุ่มที่ถูกกด
let previousValue = null;
let previousOperator = null; // เก็บ operator ที่ใช้ล่าสุด
let history = [];

// อัพเดต ผลรวม เช่น ค่าเริ่ม กับ
function updateSum() {
  const display = document.getElementById("Result");
  //ทำให้มีcomma
  let commaResult = Number(displaySum).toLocaleString() 
  display.innerText = commaResult;

  const clearButton = document.querySelector("button.clear");
  clearButton.innerText = clearType;


}
// เคลียร์ เรื่องของ AC กับ C
function clearCalculator() {
  if (clearType === "AC" || operator === null) {
    // เพิ่มการตรวจสอบว่า operator เป็น null เพื่อเคลียร์ทั้งหมดเมื่อกด =
    displaySum = "0";
    firstValue = null;
    operator = null;
    secondValue = false;
    document.getElementById("history").innerHTML = "";
    history = [];
    //ลบ remove active ออกไป
    if (activeOperatorButton) {
      activeOperatorButton.classList.remove("active-operator");
      activeOperatorButton = null;
    }
  } else {
    displaySum = "0";
  }
  clearType = "AC";
  updateSum();
}

// รับค่าตัวเลข 
function inputDigit(digit) {
  if (secondValue) {
    displaySum = digit;
    secondValue = false;
  } else {
    // ตรวจสอบถ้า displaySum เป็น '0' หรือ '-0' กรณีการกด +/-
    if (displaySum === "0" || displaySum === "-0") {
      // ถ้าเป็น -0 ให้แทนที่ด้วย -digit
      displaySum = displaySum === "-0" ? "-" + digit : digit;
    } else {
      displaySum += digit;
    }
  }
  console.log("ค่าที่1 =" + digit);
  console.log(operator)
  console.log("ค่าที่ 2 =" + secondValue);
  clearType = "C";
  updateSum();
}

// สำหรับทศนิยม
function inputDecimal() {
  if (!displaySum.includes(".")) {
    displaySum += ".";
  }
  updateSum();
}
// toggle ของการกด +/-
function toggleSign() {
  // เปลี่ยนแปลงค่า displaySum
  displaySum = displaySum.startsWith("-")
    ? displaySum.slice(1)
    : `-${displaySum}`;

  // อัปเดตค่า firstValue และ secondValue ตาม displaySum
  if (firstValue !== null) {
    firstValue = parseFloat(displaySum);
  }

  if (operator && secondValue) {
    secondValue = parseFloat(displaySum);
  }

  updateSum();
}

// รับค่า + - * /
function handleOperator(presentOperator) {
  const value = parseFloat(displaySum);

  if (operator && secondValue) {
    operator = presentOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displaySum = `${parseFloat(result.toFixed(7))}`;
    history.push(`${firstValue} ${operator} ${value} = ${displaySum}`);
    showHistory();
    firstValue = result;
    previousValue = value; // เก็บค่า secondValue ไว้สำหรับการคำนวณซ้ำ
    previousOperator = operator; // เก็บ operator ล่าสุด
  }

  secondValue = true;
  operator = presentOperator;
  clearType = "C";

  if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active-operator");
  }

  activeOperatorButton = document.querySelector(
    `button[data-operator="${presentOperator}"]`
  );
  if (activeOperatorButton) {
    activeOperatorButton.classList.add("active-operator");
  }
  
  console.log("ค่าแรก = " + firstValue)
  console.log("ตัวดำเนินการ = " + operator)
  console.log("" + secondValue)


  updateSum();
}

// กด =
function handleEquals() {
  if (operator) {
    const value = parseFloat(displaySum);
    const result = calculate(firstValue, value, operator);
    displaySum = `${parseFloat(result.toFixed(7))}`;
    history.push(`${firstValue} ${operator} ${value} = ${displaySum}`);
    showHistory();
    firstValue = result;
    previousValue = value; // เก็บค่า value ที่ใช้คำนวณไว้
    previousOperator = operator; // เก็บ operator ล่าสุด
    operator = null;
  } else if (previousValue !== null && previousOperator !== null) {
    // ใช้ operator และ previousValue ล่าสุดในการคำนวณซ้ำ
    const result = calculate(firstValue, previousValue, previousOperator); //ส่งค่าไปคำนวณ
    displaySum = `${parseFloat(result.toFixed(7))}`;
    history.push(`${firstValue} ${previousOperator} ${previousValue} = ${displaySum}`);
    showHistory();
    firstValue = result;
  }

  if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active-operator");
    activeOperatorButton = null;
  }

  updateSum();
}

//คำนวณค่าที่ส่งมาแล้วส่งออกไป
function calculate(first, second, operator) {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "×":
      return first * second;
    case "÷":
      return first / second;
    default:
      return second;
  }
}

// โชว์ ประวัติการคำนวณเลข
function showHistory() {
  const historyDisplay = document.getElementById("history");
  historyDisplay.innerHTML = history.join("<br>");
}

document.addEventListener("keydown", function (event) {
  const key = event.key;
  // ตรวจ number ใน คีย์บอร์ด
  if (!isNaN(key)) {
    inputDigit(key);
    // console.log(key);
  }
  // สำหรับรับ key จาก operator ในคีย์บอร์ด
  if (key === "+") {
    handleOperator("+");
  } else if (key === "-") {
    handleOperator("-");
  } else if (key === "*") {
    handleOperator("×");
  } else if (key === "/") {
    handleOperator("÷");
  }

   // สำหรับรับ key ในคีย์บอร์ด
  if (key === "Enter") {
    handleEquals();
  }
  if (key === "Escape") {
    clearCalculator();
  }
  if (key === ".") {
    inputDecimal();
  }
});

// เพิ่ม event ให้เมื่อ click แล้วจะไปที่ target แล้ว target จะไปหาเงื่อนไขนั้นๆที่เรากด
document.querySelector(".all-btn").addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.dataset.operator);
    return;
  }

  if (target.classList.contains("equals")) {
    handleEquals();
    return;
  }

  if (target.classList.contains("clear")) {
    clearCalculator();
    return;
  }

  if (target.innerText === ".") {
    inputDecimal();
    return;
  }

  if (target.id === "minusandplus") {
    toggleSign();
    return;
  }

  inputDigit(target.innerText);
});
