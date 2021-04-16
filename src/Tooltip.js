import "./Tooltip.scss";

export function Tooltip(props){
  const evaluate = <i className="fa fa-long-arrow-right" aria-hidden="true"></i>;

  return (
    <div id="tooltip">
      <button id="close-tooltip" onClick={props.toggleTooltip}><i class="fa fa-times" aria-hidden="true"></i></button>
      <div class="tip">
        <h2>What does Evaluate do?</h2>
        <div class="example">
          <p>Evaluate executes the expression in the display.</p>
          <p>In what follows, we will use <code>{evaluate}</code> to mean evaluate</p>
          <pre>4^2 -> 16</pre>
        </div>
      </div>
      <div class="tip">
        <h2>What is the equals sign for?</h2>
        <p>The equals sign is not used to evaluate an expression. It is used for:</p>
        <div class="example">
          <h3>Variable Assignment</h3>
          <pre>x=7 {evaluate} 7</pre>
          <p>Now we have a variable stored in memory with x set to 7. Therefore,</p>
          <pre>x+4 {evaluate} 11</pre>
        </div>
        <div class="example">
          <h3>Equality Comparison</h3>
          <pre>7+3*4 == 7+12 {evaluate} true</pre>
          <pre>3^3 == 2*3+35 {evaluate} false</pre>
        </div>
      </div>
    </div>
  );
}

export default Tooltip;