import React, {useState, useEffect} from 'react';
import arrowUp from './img/arrowUp.png';
import "./css/style.css";

function App() {
  let [fxValue, setFxValue] = useState("");
  let [equationValue, setEquationValue] = useState("");
  let [selectValue, setSelectValue] = useState(5);
  let [selectRepValue, setSelectRepValue] = useState(10);
  
  useEffect(() => {
    window.document.addEventListener("scroll",()=> onScrollFunc())
  })

  const onScrollFunc = () => {
    const scrollHeight = window.scrollY;
    const arrowIcon = document.querySelector(".arrowUp");

    if(scrollHeight > 200){
      arrowIcon.classList.add("arrowUp--show")
    }else{
      arrowIcon.classList.remove("arrowUp--show")
    }
  }

  const canNewtonMethod = () => {
    window.addEventListener('DOMContentLoaded', (event) => {
      const calculateButton = document.querySelector(".calculate");
      if(fxValue && equationValue){
        calculateButton.classList.add("calculate--allow");
      }else{
        calculateButton.classList.remove("calculate--allow");
      }
  });

  const calculateButton = document.querySelector(".calculate");
  if(calculateButton){
    if(fxValue && equationValue){
      calculateButton.classList.add("calculate--allow");
    }else{
      calculateButton.classList.remove("calculate--allow");
    }
  }
  }

  const onChangeFxInput = (e) => {
    setFxValue(e.target.value);
    canNewtonMethod();
    document.querySelector(".tBody").innerHTML = "";
  }

  const onChangeEquationInput = (e) => {
    setEquationValue(e.target.value);
    canNewtonMethod();
    document.querySelector(".tBody").innerHTML = "";
  }

  const onChangeSelectInput = (e) => {
    setSelectValue(e.target.value)
    document.querySelector(".tBody").innerHTML = "";
  }

  const onChangeRepInput = (e) => {
    setSelectRepValue(e.target.value)
    document.querySelector(".tBody").innerHTML = "";
  }

  const onClickCalculateBtn = () =>{
      const splitEquation = equationValue.split(" ");

      if(splitEquation.length !== 5){
        return setEquationValue("Wrong equation value");
      };

      const splitPartOne = splitEquation[0].split("");
      const partOneResult = splitPartOne.splice(2).join("");
  
      const splitPartTwo = splitEquation[2].split("");
      const partTwoResult = splitPartTwo.splice(0, splitPartTwo.length -1).join("");
  
      const partThreeResult = splitEquation[4];
  
      for(let i = 1; i < parseInt(selectRepValue) + 1; i++){
      const fx = parseFloat(fxValue ** partOneResult) + (parseFloat(splitEquation[1].concat(partTwoResult)) * fxValue)  + parseFloat(splitEquation[3].concat(partThreeResult));
      const fxPrime = partOneResult * fxValue ** (partOneResult - 1) - partTwoResult;
      const fxResult = fxValue - (fx / fxPrime);


      //Create new row with result
      if(fxValue !== fxResult){
        const newRow = document.createElement("tr");
        newRow.classList.add("newRow");

        const id = document.createElement("td");
        id.textContent = i + ".";

        const x = document.createElement("td");
        x.textContent = fxResult.toFixed(selectValue);

        const accuracy = document.createElement("td");
        accuracy.textContent = fxResult.toFixed(selectValue);

        const prime = document.createElement("td");
        prime.textContent = fx;


        document.querySelector(".tBody").appendChild(newRow);
        newRow.appendChild(id);
        newRow.appendChild(x);
        newRow.appendChild(accuracy);
        newRow.appendChild(prime);

        fxValue = fxResult;
      }else{
        return
      }

    }
  }

  const onClickScrollToTop = () => {
    window.scrollTo(0, 0);
  }

//x^9 - 41x - 71
  canNewtonMethod();

  return (
    <div className="App">
        <h1 className="title">Newton Raphson Method</h1>

        <div className="newton">
          <input className='fx' placeholder="x0" onChange={(e)=> onChangeFxInput(e)} value={fxValue}/>
          <input className='equation' placeholder="Equation" onChange={(e)=> onChangeEquationInput(e)} value={equationValue}/>

          <select name="rest" id="rest" onChange={(e)=> onChangeRepInput(e)}>
            <option value="10">max 10 rep</option>
            <option value="20">max 20 rep</option>
            <option value="50">max 50 rep</option>
            <option value="100">max 100 rep</option>
            <option value="200">max 200 rep</option>
            <option value="500">max 500 rep</option>
          </select>

          <select name="rest" id="rest" onChange={(e)=> onChangeSelectInput(e)}>
            <option value="5">5 digit</option>
            <option value="10">10 digit</option>
            <option value="15">15 digit</option>
            <option value="20">20 digit</option>
            <option value="20">25 digit</option>
            <option value="20">30 digit</option>
          </select>

          <button className="calculate" onClick={()=>onClickCalculateBtn()}>Calculate</button>

          <div className="resultWrapper">
            <table className="result">
              <thead>
                <tr>
                  <th>n</th>
                  <th>x</th>
                  <th>Accuracy(x)</th>
                  <th>f(x)</th>
                </tr>
              </thead>
              <tbody className="tBody" align="center">
              </tbody>

            </table>
          </div>
        </div>
      
      {/* FIXED ELEMENTS */}
      <div className="arrowUp" onClick={()=>onClickScrollToTop()}><img src={arrowUp} alt="arrowIcon"></img></div>
    </div>
  );
}

export default App;
