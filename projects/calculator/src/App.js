import ResultComponent from "./components/ResultComponent";
import KeyPadComponent from "./components/KeyPadComponent";
import ResetBtn from "./components/ResetBtn";
import { useState } from "react";
import OutputArray from "./components/outputArray";
// const output = [];
// const operationData = [];
export default function App() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const selectedVal = (buttonVal) => {
    if (buttonVal === "=") {
      calculate();
    } else if (buttonVal === "C") {
      reset();
    } else if (buttonVal === "CE") {
      backSpace();
    } else {
      setResult(result + buttonVal);
    }
  };
  const calculate = () => {
    try {
      const calculatingResult = eval(result).toString();
      setResult(calculatingResult);
      //output.push(calculatingResult);
      const operation = result + " = " + calculatingResult;
      setHistory([...history, operation]);
      //setResult("");
    } catch (error) {
      setResult("Error");
    }
  };
  const reset = () => {
    setResult("");
  };
  const backSpace = () => {
    setResult(result.slice(0, -1));
  };
  function resetHistory() {
    setHistory([]);
  }

  return (
    <div>
      <div>
        <h1>Simple Calculator</h1>
        <ResultComponent resultIs={result} />
        {/* <input type="text" value={result} readOnly /> */}
        <KeyPadComponent setSelectedVal={selectedVal} />
        <OutputArray /*output={output} */ operationData={history} />
        <ResetBtn reset={resetHistory} />
      </div>
    </div>
  );
}
