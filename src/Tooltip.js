import "./Tooltip.scss";

export function Tooltip(props){

  return (
    <div id="tooltip">
      <button id="info" onClick={props.toggleTooltip}><i class="fa fa-times" aria-hidden="true"></i></button>
      hi
    </div>
  );
}

export default Tooltip;