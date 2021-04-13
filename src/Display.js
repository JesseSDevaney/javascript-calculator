import { round } from "mathjs";
import './Display.scss';
import InputContainer from "./InputContainer";

export function Display(props){
    const { expression, isMalformed, result } = props.calculation;
    const { isInputUnfocused, 
        cursorIndex, 
        handleChange, 
        restorePrevious,
        updateFocus
    } = props;




    // TODO: Implement display result
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
            <div id="result-container">
                <div id="expression" onClick={restoreExpression}>{expression}</div>
                <div id="equals">=</div>
                <div id="result" onClick={restoreResult}>{roundedResult}</div>
            </div>
        );
    }

    const resultDisplay = displayResult(expression, result);

    return (
        <div id="display">
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

export default Display;