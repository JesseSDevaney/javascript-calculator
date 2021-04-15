import React from "react";
import { evaluate } from 'mathjs';
import './App.scss';
import Display from './Display';
import History from './History';
import ButtonContainer from './ButtonContainer';

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
      altMenuToggled: false,
      calculation: DEFAULT_CALCULATION,
      calculationCount: 0,
      cursorIndex: 0,
      history: [],
      isInputUnfocused: true,
      isMobile: false,
      variables: {},
    };

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleFocusedInput = this.handleFocusedInput.bind(this);
    this.handleUnfocusedInput = this.handleUnfocusedInput.bind(this);
    this.restorePrevious = this.restorePrevious.bind(this);
    this.setMobile = this.setMobile.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleUnfocusedInput);
    this.mediaQuery = window.matchMedia("(max-width: 600px)");
    this.setMobile(this.mediaQuery);
    this.mediaQuery.addEventListener("change", this.setMobile);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleUnfocusedInput);
    this.mediaQuery.removeEventListener("change", this.setMobile);
  }

  clearMemory(){
    this.setState({
      calculation: DEFAULT_CALCULATION,
      calculationCount: 0,
      cursorIndex: 0,
      history: [],
      variables: {}
    });
  }

  executeExpression(){
    const { calculation: {expression}, variables } = this.state;
    let result = "";
    const variablesAfter = Object.assign({}, variables);

    if (expression !== ""){
      try {
        result = evaluate(expression, variablesAfter);
        if (isDifferent(variables, variablesAfter)){
          this.updateVariables(variablesAfter);
        }
        if (result !== "") {
          this.submitResult(result);
        }
      }
      catch (error) {
        console.error(error);
        this.throwMalformedError();
      }
    }
  }

  getPreviousCalculation(){
    this.setState(prevState => {
      const { calculation: { result }, history } = prevState;

      if (result === "" && history.length !== 0){
        let { expression, result } = history.slice().pop();
        let newCalculation = {
          expression,
          isMalformed: false,
          result
        };
        return {calculation: newCalculation};
      }
      else {
        return {};
      }

    })
  }

  handleButtonPress(buttonId){
    const { calculation: { expression, result } } = this.state;
    let buttonText = document.getElementById(buttonId).textContent;
    let newExpression = "";

    switch(buttonId){
      case "back":
        this.getPreviousCalculation();
        break;
      case "all-clear":
        this.clearMemory();
        break;
      case "clear":
        if (result !== ""){
          newExpression = "";
        } else {
          newExpression = expression.replace(/([^\w]|\w+|sqrt\()$/, "");
        }
        this.updateCursorIndex(newExpression.length);
        this.updateExpression(newExpression)
        break;
      case "evaluate":
        if (result === ""){
          this.executeExpression();
        } else {
          newExpression = result.toString();
          this.updateCursorIndex(newExpression.length);
          this.updateExpression(newExpression);
        }
        break;
      case "alt":
        this.toggleMenu();
        break;
      case "menu":
        this.toggleMenu();
        break;
      case "sqrt":
        if (result === ""){
          newExpression = expression + buttonText + "(";
        } else {
          newExpression = buttonText + "(" + result + ")";
        }
        this.updateCursorIndex(newExpression.length)
        this.updateExpression(newExpression)
        break;
      case "left-parenthesis":
        if (result === ""){
          newExpression = expression + buttonText;
        } else {
          newExpression = buttonText + result;
        }
        this.updateCursorIndex(newExpression.length)
        this.updateExpression(newExpression)
        break;
      case "add": //intentional fall-through
      case "subtract":
      case "multiply":
      case "divide":
      case "exponential":
        if(result === ""){
          newExpression = expression + buttonText;
        } else {
          newExpression = result + buttonText;
        }
        this.updateCursorIndex(newExpression.length)
        this.updateExpression(newExpression)
        break;
      default:
        if(result === ""){
          newExpression = expression + buttonText;
        } else {
          newExpression = buttonText;
        }
        this.updateCursorIndex(newExpression.length)
        this.updateExpression(newExpression)
        break;
    }
  }

  handleFocusedInput(event){
    this.updateExpression(event.target.value);
  }

  handleUnfocusedInput(event){
    const key = event.key;
    let { calculation: { result }, isInputUnfocused } = this.state;

    if (key === "Enter") {
      if (result === ""){
          document.getElementById("input").blur();
          this.executeExpression();
      } else {
        const resultStr = result.toString();
        this.updateCursorIndex(resultStr.length);
        this.updateExpression(resultStr);
      }
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
          this.updateExpression(expression);
          break;
        case "ArrowRight":
          if (cursorIndex < expression.length){
            this.updateCursorIndex(cursorIndex + 1);
          }
          this.updateExpression(expression);
          break;
        case "Home":
          this.updateCursorIndex(0);
          break;
        case "End":
          this.updateCursorIndex(expression.length);
          break;
        default:
          if(result === ""){
            newExpression = expression.slice(0, cursorIndex) + key + expression.slice(cursorIndex)
            this.updateCursorIndex(cursorIndex + 1);
            this.updateExpression(newExpression);
          }
          else {
            const numList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            if (numList.includes(key)){
              this.updateCursorIndex(1);
              this.updateExpression(key);
            } else {
              const resultStr = result.toString();
              newExpression = resultStr + key;
              this.updateCursorIndex(newExpression.length);
              this.updateExpression(newExpression);
            }
          }
          break;
      }
    }
  }

  restorePrevious(expression){
    this.updateCursorIndex(expression.length);
    this.updateExpression(expression);
  }

  setMobile(mediaQuery){
    if(mediaQuery.matches){
      this.setState({isMobile: true});
    } else {
      this.setState({isMobile: false});
    }
  }

  submitResult(result){
    this.setState(prevState => {
      const oldCalculation = prevState.calculation;
      const calculationUpdate = {
        isMalformed: false,
        result
      };

      const newCalculation = Object.assign({}, oldCalculation, calculationUpdate);

      return {calculation: newCalculation};
    });
    this.updateHistory();
  }

  toggleMenu(){
    this.setState(prevState => ({
      altMenuToggled: !prevState.altMenuToggled
    }));
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

  updateHistory(){
    this.setState(prevState => {
      const { 
        calculation: { expression, result },
        calculationCount,
        history
      } = prevState;

      const newHistory = [...history];
      newHistory.push({
        id: calculationCount + 1,
        expression: expression,
        result: result
      });

      if(newHistory.length > 20){
        newHistory.shift();
      }

      return {history: newHistory, calculationCount: calculationCount + 1};
    })
  }

  updateVariables(variables){
    this.setState({variables});
  }
  

  render() {
    const { 
      altMenuToggled, 
      calculation, 
      cursorIndex, 
      history, 
      isInputUnfocused, 
      isMobile
    } = this.state;
    const expression = calculation.expression;

    // TODO: Implement other components
    return (
      <main id="calculator">
        <Display 
          calculation={calculation}
          cursorIndex={cursorIndex}
          isInputUnfocused={isInputUnfocused}
          handleChange={this.handleFocusedInput}
          restorePrevious={this.restorePrevious}
          updateFocus={this.updateFocus}
          />
        
        <History 
          altMenuToggled={altMenuToggled}
          history={history}
          isMobile={isMobile}
          restorePrevious={this.restorePrevious}
        />

        <ButtonContainer 
          altMenuToggled={altMenuToggled}
          expression={expression}
          isMobile={isMobile}
          sendButtonPress={this.handleButtonPress}
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
