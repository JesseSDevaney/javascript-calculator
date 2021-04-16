import { useEffect } from "react";
import { round } from "mathjs";
import "./History.scss";

export default function History(props) {
  const { altMenuToggled, history, isMobile, restorePrevious } = props;

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    if(altMenuToggled){
      scrollToBottom();
    }
  }, [altMenuToggled]);

  const displayCalculation = ({id, expression, result}, isMobile) => {
    const roundedResult = round(result, 4).toString();
    let classNames = "result-container";

    if(isMobile){
      classNames += " result-container-mobile";
    } else {
      classNames += " result-container-desktop";
    }

    return (
        <div className={classNames} key={id}>
            <div className="expression" data-id={"calculation"+id} onClick={restoreExpression}><p>{expression}</p></div>
            <div className="equals">=</div>
            <div className="result" data-id={"calculation"+id} onClick={restoreResult}><p>{roundedResult}</p></div>
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
    try {
      const id = event.currentTarget.attributes["data-id"].nodeValue.replace("calculation", "");
      const { expression } = findCalculationById(id);
      restorePrevious(expression);
    }
    catch(error) {
      console.error(error);
    }
  }

  const restoreResult = (event) => {
    try {
      const id = event.currentTarget.attributes["data-id"].nodeValue.replace("calculation", "");
      const { result } = findCalculationById(id)
      restorePrevious(result.toString());
    }
    catch(error) {
      console.error(error);
    }
  }

  const previousCalculations = history.map((calculation) => displayCalculation(calculation, isMobile));

  const style = {};

  if(!isMobile){
    style["order"] = "-1";
    style["height"] = "20%";
  } else if(altMenuToggled) {
    style["order"] = "2";
    style["height"] = "38.4%";
  } else {
    style["display"] = "none";
  }

  return (
    <div id="history-container" style={style}>
      {previousCalculations}
    </div>
  );
}