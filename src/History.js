import React, { useEffect } from "react";
import { round } from "mathjs";
import "./History.scss";

export function History(props) {
  const { altMenuToggled, history, isMobile, restorePrevious } = props;

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const displayCalculation = ({id, expression, result}) => {
    const roundedResult = round(result, 4).toString();

    return (
        <div className="result-container" data-id={"calculation"+id} key={id}>
            <div className="expression" data-id={"calculation"+id} onClick={restoreExpression}><p data-id={"calculation"+id}>{expression}</p></div>
            <div className="equals">=</div>
            <div className="result" data-id={"calculation"+id} onClick={restoreResult}><p data-id={"calculation"+id}>{roundedResult}</p></div>
        </div>
    );
  }

  const findCalculationById = (calculationId) => {
    const numId = parseInt(calculationId, 10);
    const calculation = history.filter(({ id }) => numId === id);
    return calculation[0];
  }

  const scrollToBottom = () => {
    const historyContainer = document.getElementById("history-container");
    historyContainer.scrollTop = historyContainer.scrollHeight;
  }

  const restoreExpression = (event) => {
    let id = event.target.attributes["data-id"].nodeValue.replace("calculation", "");
    
    try {
      const { expression } = findCalculationById(id);
      restorePrevious(expression);
    }
    catch(error) {
      console.error(error);
    }
  }

  const restoreResult = (event) => {
    let id = event.target.attributes["data-id"].nodeValue.replace("calculation", "");

    try {
      const { result } = findCalculationById(id)
      restorePrevious(result.toString());
    }
    catch(error) {
      console.error(error);
    }
  }

  const previousCalculations = history.map((calculation) => displayCalculation(calculation));

  const style = {};

  if(!isMobile){
    style["order"] = "-1";
    style["height"] = "20%";
  } else if(altMenuToggled) {
    style["order"] = "2";
    style["height"] = "40%";
  } else {
    style["display"] = "none";
  }

  return (
    <div id="history-container" style={style}>
      {previousCalculations}
    </div>
  );
}

export default History;