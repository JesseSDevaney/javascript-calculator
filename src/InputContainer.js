import "./InputContainer.scss";

export default function InputContainer(props){
    const { 
        cursorIndex, 
        expression, 
        handleChange,
        isInputUnfocused,
        updateFocus 
    } = props;

    function displayInput(expression, isInputUnfocused, 
                          handleChange, updateFocus){
        const style = {};

        if (isInputUnfocused){
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

    function displayUnfocusedInput(expression, cursorIndex){
            
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

    const input = displayInput(expression, isInputUnfocused, 
                               handleChange, updateFocus);
    const unfocusedInput = displayUnfocusedInput(expression, cursorIndex);

    return (
        <div id="input-container">
            {input}
            {isInputUnfocused && unfocusedInput}
        </div>
    );
}
