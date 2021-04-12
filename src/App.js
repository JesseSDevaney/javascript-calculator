import React from "react";
import { evaluate } from 'mathjs';
import './App.scss';
import Display from './Display';

const DEFAULT_CALCULATION = {
  expression: "",
  isMalformed: false,
  result: ""
}

const isDifferent = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return true;
  }

  for (let objKey of obj1Keys) {
    if (obj1[objKey] !== obj2[objKey]) {
      return true;
    }
  }

  return false;
};

const shouldCaptureKey = (key) => {
  const ignoreList = ["Shift", "CapsLock", "Control", "Alt", "Tab", "F1",
  "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
  "F11", "F12", "Insert", "PageDown", "PageUp", "Pause", "ScrollLock", "NumLock", "Escape",
  "ArrowDown", "ArrowUp"];

  return !ignoreList.includes(key);
}


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      calculation: DEFAULT_CALCULATION,
      cursorIndex: 0,
      variables: {},
      isInputUnfocused: true
    };

    this.executeExpression = this.executeExpression.bind(this);
    this.handleFocusedInput = this.handleFocusedInput.bind(this);
    this.handleUnfocusedInput = this.handleUnfocusedInput.bind(this);
    this.throwMalformedError = this.throwMalformedError.bind(this);
    this.updateCursorIndex = this.updateCursorIndex.bind(this);
    this.updateExpression = this.updateExpression.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.updateResult = this.updateResult.bind(this);
    this.updateVariables = this.updateVariables.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleUnfocusedInput);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleUnfocusedInput);
  }

  executeExpression(){
    const { calculation: {expression}, variables } = this.state;
    let result = "";
    const variablesAfter = Object.assign({}, variables);

    try {
      result = evaluate(expression, variablesAfter);
      if (isDifferent(variables, variablesAfter)){
        this.updateVariables(variablesAfter);
      }
      if (result !== "") {
        this.updateResult(result);
      }
    }
    catch (error) {
      console.error(error);
      this.throwMalformedError();
    }
  }

  handleFocusedInput(event){
    this.updateExpression(event.target.value);
  }

  handleUnfocusedInput(event){
    const key = event.key;
    let { calculation: { result }, isInputUnfocused } = this.state;

    if (key === "Enter") {
      document.getElementById("input").blur();
      this.executeExpression();
    }
    else if (shouldCaptureKey(key) && isInputUnfocused){
      let {calculation: {expression}, cursorIndex} = this.state;
      let newExpression = "";

      switch(key){
        case "Backspace":
          if (result !== ""){
            this.updateCursorIndex(0);
            this.updateExpression("");
          }
          else if (cursorIndex !== 0){
            newExpression = expression.slice(0, cursorIndex - 1) + expression.slice(cursorIndex);
            this.updateCursorIndex(cursorIndex - 1);
            this.updateExpression(newExpression);
          }
          break;
        case "Delete":
          if (cursorIndex !== expression.length){
            newExpression = expression.slice(0, cursorIndex) + expression.slice(cursorIndex+1);
            this.updateExpression(newExpression);
          }
          break;
        case "ArrowLeft":
          if (cursorIndex > 0){
            this.updateCursorIndex(cursorIndex - 1);
          }
          this.updateResult("");
          break;
        case "ArrowRight":
          if (cursorIndex < expression.length){
            this.updateCursorIndex(cursorIndex + 1);
          }
          this.updateResult("");
          break;
        case "Home":
          this.updateCursorIndex(0);
          break;
        case "End":
          this.updateCursorIndex(expression.length);
          break;
        default:
          newExpression = expression.slice(0, cursorIndex) + key + expression.slice(cursorIndex)
          this.updateCursorIndex(cursorIndex + 1);
          this.updateExpression(newExpression);
          break;
      }
    }
  }

  throwMalformedError(){
    this.setState(prevState => {
      const oldCalculation = prevState.calculation;
      const calculationUpdate = {
        isMalformed: true
      };

      const newCalculation = Object.assign({}, oldCalculation, calculationUpdate);

      return {calculation: newCalculation};
    });
  }

  updateCursorIndex(cursorIndex){
    this.setState({cursorIndex});
  }

  updateExpression(expression){
    this.setState({
      calculation: {
        expression,
        isMalformed: false,
        result: ""
      }
    });
  }

  updateFocus(event){
    this.setState(prevState => ({
      cursorIndex: event.target.selectionStart,
      isInputUnfocused: !prevState.isInputUnfocused
    }));
  }

  updateResult(result){
    // called on a successfully executed expression
    this.setState(prevState => {
      const oldCalculation = prevState.calculation;
      const calculationUpdate = {
        isMalformed: false,
        result
      };

      const newCalculation = Object.assign({}, oldCalculation, calculationUpdate);

      return {calculation: newCalculation};
    });
  }

  updateVariables(variables){
    this.setState({variables});
  }
  

  render() {
    const { calculation, cursorIndex, isInputUnfocused} = this.state;

    // TODO: Implement other components
    return (
      <main id="calculator">
        <Display 
          calculation={calculation}
          cursorIndex={cursorIndex}
          isInputUnfocused={isInputUnfocused}
          handleChange={this.handleFocusedInput} 
          updateFocus={this.updateFocus}
          />
          
      {/* REAL CODE */}
        {/* When screen size greater than ... */}
          {/* <History />
          <Display />
          <ButtonContainer /> */}
        {/* When screen size less than ... */}
          {/* When menuToggled */}
            {/* <Display />
            <ButtonContainer /> */}
          {/* When !menuToggled */}
            {/* <Display />
            <History />
            <ButtonContainer /> */}
      </main>
    );
  }
}

export default App;
