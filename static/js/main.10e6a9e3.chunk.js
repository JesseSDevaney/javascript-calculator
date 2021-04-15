(this["webpackJsonpjavascript-calculator"]=this["webpackJsonpjavascript-calculator"]||[]).push([[0],{59:function(e,t,s){},60:function(e,t,s){},61:function(e,t,s){},62:function(e,t,s){},71:function(e,t){},72:function(e,t,s){},73:function(e,t,s){},74:function(e,t,s){"use strict";s.r(t);var n=s(22),a=s.n(n),r=s(35),i=s.n(r),u=(s(59),s(20)),c=s(36),o=s(37),l=s(21),d=s(53),h=s(52),p=s(75),b=(s(60),s(2)),x=(s(61),s(62),s(9));var f=function(e){var t=e.cursorIndex,s=e.expression,n=e.handleChange,a=e.isInputUnfocused,r=function(e,t,s,n){var a={};return t&&(a.opacity=0),Object(x.jsx)("input",{style:a,type:"text",id:"input",value:e,onChange:s,onFocus:n,onBlur:n})}(s,a,n,e.updateFocus),i=function(e,t){var s=e.slice(0,t),n=e.slice(t);return Object(x.jsx)("div",{id:"unfocused-input-display",children:Object(x.jsxs)("pre",{children:[s,Object(x.jsx)("span",{id:"cursor",children:"|"}),n]})})}(s,t);return Object(x.jsxs)("div",{id:"input-container",children:[r,a&&i]})};var v=function(e){var t=e.calculation,s=t.expression,n=t.isMalformed,a=t.result,r=e.isInputUnfocused,i=e.cursorIndex,u=e.handleChange,c=e.restorePrevious,o=e.updateFocus,l=function(e,t){var s=Object(b.me)(t,4).toString();return Object(x.jsxs)("div",{className:"result-container",children:[Object(x.jsx)("div",{className:"expression",onClick:function(){c(e)},children:Object(x.jsx)("p",{children:e})}),Object(x.jsx)("div",{className:"equals",children:"="}),Object(x.jsx)("div",{className:"result",onClick:function(){var e=t.toString();c(e)},children:Object(x.jsx)("p",{children:s})})]})}(s,a);return Object(x.jsxs)("div",{id:"display",children:[Object(x.jsx)("p",{id:"display-title",children:"Display"}),""===a&&Object(x.jsx)(f,{cursorIndex:i,expression:s,isInputUnfocused:r,isMalformed:n,handleChange:u,updateFocus:o}),n&&Object(x.jsx)("pre",{id:"malformed-expression",children:"Malformed expression"}),""!==a&&l]})};s(72);var j=function(e){var t=e.altMenuToggled,s=e.history,a=e.isMobile,r=e.restorePrevious;Object(n.useEffect)((function(){u()}),[s]);var i=function(e){var t=parseInt(e,10);return s.filter((function(e){var s=e.id;return t===s}))[0]},u=function(){var e=document.getElementById("history-container");e.scrollTop=e.scrollHeight},c=function(e){var t=e.target.attributes["data-id"].nodeValue.replace("calculation","");try{var s=i(t).expression;r(s)}catch(n){console.error(n)}},o=function(e){var t=e.target.attributes["data-id"].nodeValue.replace("calculation","");try{var s=i(t).result;r(s.toString())}catch(n){console.error(n)}},l=s.map((function(e){return function(e,t){var s=e.id,n=e.expression,a=e.result,r=Object(b.me)(a,4).toString(),i="result-container";return i+=t?" result-container-mobile":" result-container-desktop",Object(x.jsxs)("div",{className:i,"data-id":"calculation"+s,children:[Object(x.jsx)("div",{className:"expression","data-id":"calculation"+s,onClick:c,children:Object(x.jsx)("p",{"data-id":"calculation"+s,children:n})}),Object(x.jsx)("div",{className:"equals",children:"="}),Object(x.jsx)("div",{className:"result","data-id":"calculation"+s,onClick:o,children:Object(x.jsx)("p",{"data-id":"calculation"+s,children:r})})]},s)}(e,a)})),d={};return a?t?(d.order="2",d.height="38.4%"):d.display="none":(d.order="-1",d.height="20%"),Object(x.jsx)("div",{id:"history-container",style:d,children:l})},g=(s(73),{zero:"0",one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9",decimal:".",add:"+",subtract:"-",divide:"/",multiply:"*",back:"Back",clear:"C","left-parenthesis":"(","right-parenthesis":")",exponential:"^",sqrt:"sqrt",equals:"=",evaluate:"Evaluate"}),m={zero:"0",one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9",decimal:".",add:"+",subtract:"-",divide:"/",multiply:"*",clear:"C",back:"Back",exponential:"^",equals:"=",evaluate:"Evaluate",alt:"alt"},k={evaluate:"Evaluate",menu:"menu","left-parenthesis":"(","right-parenthesis":")",sqrt:"sqrt",u:"u",v:"v",x:"x",y:"z"};var y=function(e){var t=e.altMenuToggled,s=e.expression,n=e.isMobile,a=e.sendButtonPress,r=function(e,t){return t?e?k:m:g}(t,n),i={},u=function(e,t){return t?e?"mobile-alt-menu-grid":"mobile-menu-grid":"desktop-grid"}(t,n);return i.height=function(e,t){return t?e?"41.6%":"80%":"60%"}(t,n),Object(x.jsx)("div",{className:"button-container "+u,style:i,children:function(e){return Object.keys(e).map((function(t){if(e.hasOwnProperty(t)){var n=e[t],r="";switch("clear"===t&&""===s&&(t="all-clear",n="AC"),t){case"divide":r=Object(x.jsx)(x.Fragment,{children:"\xf7"});break;case"multiply":r=Object(x.jsx)(x.Fragment,{children:"\xd7"});break;case"subtract":r=Object(x.jsx)(x.Fragment,{children:"\u2212"});break;case"equals":r=Object(x.jsx)(x.Fragment,{children:"\u208c"});break;case"exponential":r=Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)("pre",{children:["x",Object(x.jsx)("sup",{children:"n"})]})});break;case"sqrt":r=Object(x.jsx)(x.Fragment,{children:"\u221a"});break;case"back":r=Object(x.jsx)("i",{className:"fa fa-long-arrow-left","aria-hidden":"true"});break;case"all-clear":r=Object(x.jsx)("i",{className:"fa fa-trash-o","aria-hidden":"true"});break;default:r=n}return Object(x.jsx)("button",{className:"calculatorButton",id:t,"button-text":n,onClick:function(e){return a(t,n)},children:r},t)}return null}))}(r)})},O={expression:"",isMalformed:!1,result:""},I=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){var e;return Object(c.a)(this,s),(e=t.call(this)).state={altMenuToggled:!1,calculation:O,calculationCount:0,cursorIndex:0,history:[],isInputUnfocused:!0,isMobile:!1,variables:{}},e.handleButtonPress=e.handleButtonPress.bind(Object(l.a)(e)),e.handleFocusedInput=e.handleFocusedInput.bind(Object(l.a)(e)),e.handleUnfocusedInput=e.handleUnfocusedInput.bind(Object(l.a)(e)),e.restorePrevious=e.restorePrevious.bind(Object(l.a)(e)),e.setMobile=e.setMobile.bind(Object(l.a)(e)),e.updateFocus=e.updateFocus.bind(Object(l.a)(e)),e}return Object(o.a)(s,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleUnfocusedInput),this.mediaQuery=window.matchMedia("(max-width: 600px)"),this.setMobile(this.mediaQuery),this.mediaQuery.addEventListener("change",this.setMobile)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleUnfocusedInput),this.mediaQuery.removeEventListener("change",this.setMobile)}},{key:"clearMemory",value:function(){this.setState({calculation:O,calculationCount:0,cursorIndex:0,history:[],variables:{}})}},{key:"executeExpression",value:function(){var e=this.state,t=e.calculation.expression,s=e.variables,n="",a=Object.assign({},s);if(""!==t)try{n=Object(p.a)(t,a),function(e,t){var s=Object.keys(e),n=Object.keys(t);if(s.length!==n.length)return!0;for(var a=0,r=s;a<r.length;a++){var i=r[a];if(e[i]!==t[i])return!0}return!1}(s,a)&&this.updateVariables(a),""!==n&&this.submitResult(n)}catch(r){console.error(r),this.throwMalformedError()}}},{key:"getPreviousCalculation",value:function(){this.setState((function(e){var t=e.calculation.result,s=e.history;if(""===t&&0!==s.length){var n=s.slice().pop();return{calculation:{expression:n.expression,isMalformed:!1,result:n.result}}}return{}}))}},{key:"handleButtonPress",value:function(e,t){var s=this.state.calculation,n=s.expression,a=s.result,r="";switch(e){case"back":this.getPreviousCalculation();break;case"all-clear":this.clearMemory();break;case"clear":r=""!==a?"":n.replace(/([^\w]|\w+|sqrt\()$/,""),this.updateCursorIndex(r.length),this.updateExpression(r);break;case"evaluate":""===a?this.executeExpression():(r=a.toString(),this.updateCursorIndex(r.length),this.updateExpression(r));break;case"alt":case"menu":this.toggleMenu();break;case"sqrt":r=""===a?n+t+"(":t+"("+a+")",this.updateCursorIndex(r.length),this.updateExpression(r);break;case"left-parenthesis":r=""===a?n+t:t+a,this.updateCursorIndex(r.length),this.updateExpression(r);break;case"add":case"subtract":case"multiply":case"divide":case"exponential":r=""===a?n+t:a+t,this.updateCursorIndex(r.length),this.updateExpression(r);break;default:r=""===a?n+t:t,this.updateCursorIndex(r.length),this.updateExpression(r)}}},{key:"handleFocusedInput",value:function(e){this.updateExpression(e.target.value)}},{key:"handleUnfocusedInput",value:function(e){var t=e.key,s=this.state,n=s.calculation.result,a=s.isInputUnfocused;if("Enter"===t)if(""===n)document.getElementById("input").blur(),this.executeExpression();else{var r=n.toString();this.updateCursorIndex(r.length),this.updateExpression(r)}else if(function(e){return!["Shift","CapsLock","Control","Alt","Tab","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","Insert","PageDown","PageUp","Pause","ScrollLock","NumLock","Escape","ArrowDown","ArrowUp"].includes(e)}(t)&&a){var i=this.state,u=i.calculation.expression,c=i.cursorIndex,o="";switch(t){case"Backspace":""!==n?(this.updateCursorIndex(0),this.updateExpression("")):0!==c&&(o=u.slice(0,c-1)+u.slice(c),this.updateCursorIndex(c-1),this.updateExpression(o));break;case"Delete":c!==u.length&&(o=u.slice(0,c)+u.slice(c+1),this.updateExpression(o));break;case"ArrowLeft":c>0&&this.updateCursorIndex(c-1),this.updateExpression(u);break;case"ArrowRight":c<u.length&&this.updateCursorIndex(c+1),this.updateExpression(u);break;case"Home":this.updateCursorIndex(0);break;case"End":this.updateCursorIndex(u.length);break;default:if(""===n)o=u.slice(0,c)+t+u.slice(c),this.updateCursorIndex(c+1),this.updateExpression(o);else{if(["0","1","2","3","4","5","6","7","8","9"].includes(t))this.updateCursorIndex(1),this.updateExpression(t);else o=n.toString()+t,this.updateCursorIndex(o.length),this.updateExpression(o)}}}}},{key:"restorePrevious",value:function(e){this.updateCursorIndex(e.length),this.updateExpression(e)}},{key:"setMobile",value:function(e){e.matches?this.setState({isMobile:!0}):this.setState({isMobile:!1})}},{key:"submitResult",value:function(e){this.setState((function(t){var s=t.calculation,n={isMalformed:!1,result:e};return{calculation:Object.assign({},s,n)}})),this.updateHistory()}},{key:"toggleMenu",value:function(){this.setState((function(e){return{altMenuToggled:!e.altMenuToggled}}))}},{key:"throwMalformedError",value:function(){this.setState((function(e){var t=e.calculation;return{calculation:Object.assign({},t,{isMalformed:!0})}}))}},{key:"updateCursorIndex",value:function(e){this.setState({cursorIndex:e})}},{key:"updateExpression",value:function(e){this.setState({calculation:{expression:e,isMalformed:!1,result:""}})}},{key:"updateFocus",value:function(e){this.setState((function(t){return{cursorIndex:e.target.selectionStart,isInputUnfocused:!t.isInputUnfocused}}))}},{key:"updateHistory",value:function(){this.setState((function(e){var t=e.calculation,s=t.expression,n=t.result,a=e.calculationCount,r=e.history,i=Object(u.a)(r);return i.push({id:a+1,expression:s,result:n}),i.length>20&&i.shift(),{history:i,calculationCount:a+1}}))}},{key:"updateVariables",value:function(e){this.setState({variables:e})}},{key:"render",value:function(){var e=this.state,t=e.altMenuToggled,s=e.calculation,n=e.cursorIndex,a=e.history,r=e.isInputUnfocused,i=e.isMobile,u=s.expression;return Object(x.jsxs)("main",{id:"calculator",children:[Object(x.jsx)(v,{calculation:s,cursorIndex:n,isInputUnfocused:r,handleChange:this.handleFocusedInput,restorePrevious:this.restorePrevious,updateFocus:this.updateFocus}),Object(x.jsx)(j,{altMenuToggled:t,history:a,isMobile:i,restorePrevious:this.restorePrevious}),Object(x.jsx)(y,{altMenuToggled:t,expression:u,isMobile:i,sendButtonPress:this.handleButtonPress})]})}}]),s}(a.a.Component);i.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(I,{})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.10e6a9e3.chunk.js.map