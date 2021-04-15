import "./ButtonContainer.scss";

const DESKTOP_BUTTONS = {
  "zero": "0",
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
  "decimal": ".",
  "add": "+",
  "subtract": "-",
  "divide": "/",
  "multiply": "*",
  "back": "Back",
  "clear": "C",
  "left-parenthesis": "(",
  "right-parenthesis": ")",
  "exponential": "^",
  "sqrt": "sqrt",
  "equals": "=",
  "evaluate": "Evaluate"
}

const MOBILE_MENU_BUTTONS = {
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "decimal": ".",
    "add": "+",
    "subtract": "-",
    "divide": "/",
    "multiply": "*",
    "clear": "C",
    "back": "Back",
    "exponential": "^",
    "equals": "=",
    "evaluate": "Evaluate",
    "alt": "alt",
}

const MOBILE_ALT_MENU_BUTTONS = {
  "evaluate": "Evaluate",
  "menu": "menu",
  "left-parenthesis": "(",
  "right-parenthesis": ")",
  "sqrt": "sqrt",
  "u": "u",
  "v": "v",
  "x": "x",
  "y": "z"
}


export function ButtonContainer(props) {
  const { altMenuToggled, expression, isMobile, sendButtonPress } = props;

  const getButtons = (altMenuToggled, isMobile) => {
    if(!isMobile){
      return DESKTOP_BUTTONS;
    } else if (altMenuToggled) {
      return MOBILE_ALT_MENU_BUTTONS;
    } else {
      return MOBILE_MENU_BUTTONS;
    }
  }

  const getButtonGridClass = (altMenuToggled, isMobile) => {
    if(!isMobile){
      return 'desktop-grid';
    } else if (altMenuToggled) {
      return 'mobile-alt-menu-grid';
    } else {
      return 'mobile-menu-grid';
    }
  };

  const getContainerHeight = (altMenuToggled, isMobile) => {
    if(!isMobile){
      return '60%';
    } else if (altMenuToggled) {
      return '41.6%';
    } else {
      return '80%';
    }
  };

  const displayButtons = (buttons) => {
    const buttonIds = Object.keys(buttons);

    return buttonIds.map(buttonId => {
        if(buttons.hasOwnProperty(buttonId)){
          let buttonText = buttons[buttonId];
          let displayText = "";

          if(buttonId === "clear" && expression === ""){
            buttonId = "all-clear";
            buttonText = "AC";
          }

          switch(buttonId) {
            case "divide":
              displayText = <>&#247;</>;
              break;
            case "multiply":
              displayText = <>&times;</>;
              break;
            case "subtract":
              displayText = <>&minus;</>;
              break;
            case "exponential":
              displayText = <><pre>x<sup>n</sup></pre></>;
              break;
            case "sqrt":
              displayText = <>&radic;</>;
              break;
            case "back":
              displayText = <i className="fa fa-angle-double-left" aria-hidden="true"></i>;
              break;
            case "all-clear":
              displayText = <i className="fa fa-trash-o" aria-hidden="true"></i>;
              break;
            default:
              displayText = buttonText;
              break;
          }

          return (
            <button 
              className="calculatorButton"
              id={buttonId} 
              key={buttonId}
              button-text={buttonText}
              onClick={(e) => sendButtonPress(buttonId, buttonText)}>
                {displayText}
              </button>
          );
        }

        return null;
      });
  };

  const buttons = getButtons(altMenuToggled, isMobile);
  const style = {};
  const gridClass = getButtonGridClass(altMenuToggled, isMobile);
  style["height"] = getContainerHeight(altMenuToggled, isMobile);

  return (
    <div className={"button-container " + gridClass} style={style}>
      {displayButtons(buttons)}
    </div>
  );
}

export default ButtonContainer;