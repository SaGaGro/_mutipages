import React, { useState, useEffect } from 'react';
import './Calculator.css';

function Calculator() {
  const [displaySum, setDisplaySum] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [secondValue, setSecondValue] = useState(false); 
  const [clearType, setClearType] = useState('AC');
  const [history, setHistory] = useState([]);
  const [activeOperatorButton, setActiveOperatorButton] = useState(null);
  const [lastOperator, setLastOperator] = useState(null);
  const [lastValue, setLastValue] = useState(null);

  useEffect(() => {
    const formattedDisplaySum = Number(displaySum).toLocaleString();
    const displayElement = document.getElementById('Result');
    if (displayElement) {
      displayElement.innerText = formattedDisplaySum;
    }
    const clearButton = document.querySelector('button.clear');
    if (clearButton) {
      clearButton.innerText = clearType;
    }
  }, [displaySum, clearType]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (!isNaN(key)) {
        // Check if the key is a number
        inputDigit(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key === '*' ? '×' : key === '/' ? '÷' : key);
      } else if (key === 'Enter') {
        handleEquals();
      } else if (key === 'Backspace') {
        clearCalculator(); // Optional: handle clear on Backspace
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [displaySum, firstValue, operator, secondValue, activeOperatorButton]);

  const clearCalculator = () => {
    if (clearType === 'C') {
      setDisplaySum('0');
      setSecondValue(true); 
      setClearType('AC'); 
    } else {
      setDisplaySum('0');
      setFirstValue(null);
      setOperator(null);
      setSecondValue(false);
      setHistory([]);
      setLastOperator(null);
      setLastValue(null);
      if (activeOperatorButton) {
        activeOperatorButton.classList.remove('active-operator');
        setActiveOperatorButton(null);
      }
    }
  };

  const inputDigit = (digit) => {
    if (secondValue) {
      setDisplaySum(digit); 
      setSecondValue(false); 
    } else {
      setDisplaySum((prev) => 
        prev === '0' ? digit : prev + digit 
      );
    }
    setClearType('C');
  };

  const inputDecimal = () => {
    if (!displaySum.includes('.')) {
      setDisplaySum((prev) => prev + '.');
    }
  };

  const toggleSign = () => {
    setDisplaySum((prev) => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
  };

  const handleOperator = (presentOperator) => {
    const value = parseFloat(displaySum);
  
    if (firstValue === null) {
      setFirstValue(value);
    } else if (operator && secondValue) {
      return;
    } else {
      const result = calculate(firstValue, value, operator);
      setDisplaySum(`${parseFloat(result.toFixed(7))}`);
      setFirstValue(result);
    }
  
    setOperator(presentOperator);
    setSecondValue(true);
    setClearType('C'); 

    if (activeOperatorButton) {
      activeOperatorButton.classList.remove('active-operator');
    }
  
    const newOperatorButton = document.querySelector(`button[data-operator="${presentOperator}"]`);
    if (newOperatorButton) {
      newOperatorButton.classList.add('active-operator');
      setActiveOperatorButton(newOperatorButton);
    }

    setLastOperator(presentOperator);
    setLastValue(value);
  };

  const handleEquals = () => {
    let value = parseFloat(displaySum);
    let result;
  
    if (operator && firstValue !== null) {
      result = calculate(firstValue, value, operator);
      setDisplaySum(`${parseFloat(result.toFixed(7))}`);
      setHistory((prev) => [...prev, `${firstValue} ${operator} ${value} = ${result}`]);
      setFirstValue(result);
      setLastOperator(operator);
      setLastValue(value);
      setOperator(null);
      setSecondValue(false);
    } else if (lastOperator && lastValue !== null) {
      result = calculate(parseFloat(displaySum), lastValue, lastOperator);
      setDisplaySum(`${parseFloat(result.toFixed(7))}`);
      setHistory((prev) => [...prev, `${displaySum} ${lastOperator} ${lastValue} = ${result}`]);
      setFirstValue(result);
    }
  
    if (activeOperatorButton) {
      activeOperatorButton.classList.remove('active-operator');
      setActiveOperatorButton(null);
    }
  };

  const calculate = (first, second, operator) => {
    switch (operator) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '×':
        return first * second;
      case '÷':
        return second === 0 ? 'Error' : first / second; 
      default:
        return second;
    }
  };

  return (
    <div className='calculator-container1'>
      <div className="calculator-container">
        <div className="display" id="Result">{displaySum}</div>
        <div className="all-btn">
          <button className="clear" onClick={clearCalculator}>AC</button>
          <button id="minusandplus" onClick={toggleSign}>+/-</button>
          <button className="operator" data-operator="÷" onClick={() => handleOperator('÷')}>&divide;</button>
          <button className="operator" data-operator="×" onClick={() => handleOperator('×')}>&times;</button>

          {[7, 8, 9].map((num) => (
            <button key={num} onClick={() => inputDigit(num.toString())}>{num}</button>
          ))}
          <button className="operator" data-operator="-" onClick={() => handleOperator('-')}>-</button>

          {[4, 5, 6].map((num) => (
            <button key={num} onClick={() => inputDigit(num.toString())}>{num}</button>
          ))}
          <button className="operator" data-operator="+" onClick={() => handleOperator('+')}>+</button>

          {[1, 2, 3].map((num) => (
            <button key={num} onClick={() => inputDigit(num.toString())}>{num}</button>
          ))}
          <button className="equals" onClick={handleEquals}>=</button>

          <button onClick={() => inputDigit('0')}>0</button>
          <button onClick={inputDecimal}>.</button>
          {/* <b className="history">History: &nbsp;</b>
          <div id="history">{history.join(' ')}</div> */}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
