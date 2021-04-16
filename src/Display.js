import { round } from "mathjs";
import './Display.scss';
import InputContainer from "./InputContainer";

export default function Display(props){
    const { expression, isMalformed, result } = props.calculation;
    const {
        cursorIndex, 
        handleChange, 
        isInputUnfocused,
        restorePrevious,
        toggleTooltip,
        updateFocus
    } = props;

    function displayResult(expression, result){
        const roundedResult = round(result, 4).toString();

        function restoreExpression(){
            restorePrevious(expression);
        }

        function restoreResult(){
            const resultStr = result.toString();
            restorePrevious(resultStr);
        }

        return (
            <div className="result-container">
                <div className="expression" onClick={restoreExpression}><p>{expression}</p></div>
                <div className="equals">=</div>
                <div className="result" onClick={restoreResult}><p>{roundedResult}</p></div>
            </div>
        );
    }

    const resultDisplay = displayResult(expression, result);

    return (
        <div id="display">
            <p id="display-title">Display</p>
            <button id="display-tooltip" onClick={toggleTooltip}><i className="fa fa-info" aria-hidden="true"></i></button>
            {result === "" && 
                <InputContainer 
                    cursorIndex={cursorIndex}
                    expression={expression}
                    isInputUnfocused={isInputUnfocused}
                    isMalformed={isMalformed}
                    handleChange={handleChange}
                    updateFocus={updateFocus}
                 />
            }
            {isMalformed && <pre id="malformed-expression">Malformed expression</pre>}
            {result !== "" && resultDisplay}
        </div>
    );
}