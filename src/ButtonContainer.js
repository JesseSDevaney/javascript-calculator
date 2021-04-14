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
  "sqrt": "sqrt(",
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
    "exponential": "^",
    "sqrt": "sqrt(",
    "equals": "=",
    "evaluate": "Evaluate",
    "alt-menu": "alt-menu",
}

const MOBILE_ALT_MENU_BUTTONS = {
  "evaluate": "Evaluate",
  "menu": "menu",
  "left-parenthesis": "(",
  "right-parenthesis": ")"
}


export function ButtonContainer(props) {
  const { altMenuToggled, isMobile, sendButtonPress } = props;

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
      return '40%';
    } else {
      return '80%';
    }
  };

  const displayButtons = (buttons) => {
    const buttonKey = Object.keys(buttons);

    return buttonKey.map(key => {
        if(buttons.hasOwnProperty(key)){
          const buttonText = buttons[key];
          const style = {"gridArea": key};

          return (
            <button 
              className="calculatorButton"
              id={key} 
              key={key} 
              style={style} 
              onClick={handleButtonPress}>
                {buttonText}
              </button>
          );
        }

        return null;
      });
  };

  const handleButtonPress = (event) => {
      sendButtonPress(event.target.id);
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