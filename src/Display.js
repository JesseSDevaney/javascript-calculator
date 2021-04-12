import React from "react";
import { round } from 'mathjs';
import './Display.scss';

export function Display(props){
    const { expression, isMalformed, result } = props.calculation;
    const { isInputUnfocused, cursorIndex, handleChange, updateFocus } = props;

    
    function displayInput(){
        const style = {};

        if( result !== ""){
            style["display"] = "none";
        }
        else if (isInputUnfocused){
            style["opacity"] = 0;
        }

        return (
            <input 
                style={style}
                type="text" 
                id="input"
                value={expression} 
                onChange={handleChange} 
                onFocus={updateFocus}
                onBlur={updateFocus}
                />
        );
    }

    function displayUnfocusedInput(){
        const beforeCursor = expression.slice(0, cursorIndex);
        const afterCursor = expression.slice(cursorIndex);

        return (
            <div id="unfocused-input-display">
                <pre>
                    {beforeCursor}
                    <span id="cursor">|</span>
                    {afterCursor}
                </pre>
            </div>
        );
    }

    function displayResult(){
        const style = {};

        if( result === ""){
            return (null);
        }

        return (
            <input 
                style={style}
                type="text" 
                id="input"
                value={expression} 
                onChange={handleChange} 
                onFocus={updateFocus}
                onBlur={updateFocus}
                />
        );
    }

    return (
        <div id="display">
            {result !== "" && displayResult()}
            {isInputUnfocused && displayUnfocusedInput()}
            {result === "" && displayInput()}

            {/* <p>{result !== "" && round(result, 4)}</p>
            <p>{isMalformed && "MalformedExpression"}</p> */}
        </div>
    );
}

export default Display;