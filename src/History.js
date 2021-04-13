import React from "react";
import { round } from "mathjs";
import "./History.scss";

class History extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [],
      calculationCount: 0
    }

    this.appendCalculation = this.appendCalculation.bind(this);
    this.displayCalculation = this.displayCalculation.bind(this);
  }

  appendCalculation(){
    this.setState((prevState, props) => {
      const history = prevState.history.slice();
      const calculationCount = prevState.calculationCount;
      
      history.push({
        id: calculationCount + 1,
        expression: props.expression,
        result: props.result
      });

      if(history.length > 20){
        history.shift();
      }

      return {history, calculationCount: calculationCount + 1};
    });
  }

  componentDidUpdate(prevProps) {
    const { 
      expression: prevExpression,
      result: prevResult } = prevProps;
    const { 
      expression: newExpression,
      result: newResult
     } = this.props;

    if (newResult !== "") {
      if (newResult !== prevResult){
        this.appendCalculation()
      } else if (newExpression !== prevExpression){
        this.appendCalculation()
      }
    }

    this.scrollToBottom();
  }

  displayCalculation({id, expression, result}){
    const roundedResult = round(result, 4).toString();
    const restorePrevious = this.props.restorePrevious;

    function restoreExpression(){
        restorePrevious(expression);
    }

    function restoreResult(){
        const resultStr = result.toString();
        restorePrevious(resultStr);
    }

    return (
        <div className="result-container" id={id} key={id}>
            <div className="expression" onClick={restoreExpression}>{expression}</div>
            <div className="equals">=</div>
            <div className="result" onClick={restoreResult}>{roundedResult}</div>
        </div>
    );
  }

  scrollToBottom(){
    const historyContainer = document.getElementById("history-container");
    historyContainer.scrollTop = historyContainer.scrollHeight;
  }

  render() {
    const history = this.state.history;

    const previousCalculations = history.map((calculation) => this.displayCalculation(calculation));

    return (
      <div id="history-container">
        {previousCalculations}
      </div>
    );
  }
}

export default History;