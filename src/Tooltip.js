import "./Tooltip.scss";

export function Tooltip(props){
  const evaluate = <i className="fa fa-long-arrow-right" aria-hidden="true"></i>;

  return (
    <div id="tooltip">
      <button id="close-tooltip" onClick={props.toggleTooltip}><i className="fa fa-times" aria-hidden="true"></i></button>
      <div className="tip">
        <h2>What does Evaluate do?</h2>
        <div className="example">
          <p>Evaluate executes the expression in the display.</p>
          <p>In what follows, we will use <code>{evaluate}</code> to mean evaluate</p>
          <pre>4^2 {evaluate} 16</pre>
        </div>
      </div>
      <div className="tip">
        <h2>What is the equals sign for?</h2>
        <p>The equals sign is not used to evaluate an expression. It is used for:</p>
        <div className="example">
          <h3>Variable Assignment</h3>
          <pre>x=7 {evaluate} 7</pre>
          <p>Now we have a variable stored in memory with x set to 7. Therefore,</p>
          <pre>x+4 {evaluate} 11</pre>
        </div>
        <div className="example">
          <h3>Equality Comparison</h3>
          <pre>7+3*4 == 7+12 {evaluate} true (1)</pre>
          <pre>3^3 == 2*3+35 {evaluate} false (0)</pre>
        </div>
      </div>
    </div>
  );
}

export default Tooltip;