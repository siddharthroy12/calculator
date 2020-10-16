import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "0",
            formula: "",
            operator: null,
            prevOperator: false,
            prevEval: false
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(buttonId) {
       let currentNumber = "";
       let clear = false;
       let operator = null;
       let equal = false;

       switch(buttonId) {
           case "one":
               currentNumber = "1";
               break;
            case "two":
                currentNumber = "2";
               break;
            case "three":
                currentNumber = "3";
               break;
            case "four":
                currentNumber = "4";
               break;
            case "five":
                currentNumber = "5";
               break;
            case "six":
                currentNumber = "6";
               break;
            case "seven":
                currentNumber = "7";
               break;
            case "eight":
                currentNumber = "8";
               break;
            case "nine":
                currentNumber = "9";
               break;
            case "zero":
                currentNumber = "0";
               break;
            case "decimal":
                currentNumber = ".";
                break;
            case "add":
                operator = "+";
                break;
            case "divide":
                operator = "/";
                break;
            case "subtract":
                operator = "-";
                break;
            case "multiply":
                operator = "*";
                break;
            case "clear":
                clear = true;
                break;
            case "equals":
                equal = true;
                break;
            default:
                break;
       }

       if (this.state.prevEval) {
           if (currentNumber) {
               this.setState({
                   display:currentNumber,
                   formula:currentNumber,
                   prevEval:false
               })
           } else if (operator) {
               this.setState((state) => ({
                   display: operator,
                   formula: state.formula + operator,
                   prevEval:false
               }));
           } else if (clear) {
                this.setState({
                    display: "0",
                    formula: "",
                    operator: null,
                    prevOperator: false,
                    prevEval: false
                });
           }
       } else if(this.state.display == "0") {
           if (currentNumber == ".") {
                this.setState({
                    display:"0.",
                    formula:"0."
                });
           } else if (operator) {
                if (operator == "-") {
                    this.setState({
                        display: operator,
                        formula: operator
                    })
                }
           } else if (equal) {
               this.setState({
                   display:"0",
                   formula:"0",
               });
           } else if (clear) {
                this.setState({
                    display: "0",
                    formula: "",
                    operator: null,
                    prevOperator: false,
                    prevEval: false
                });
           } else {
                this.setState({
                    display:currentNumber,
                    formula:currentNumber
                });
           }    
        } else if (currentNumber == ".") {
            if ( !(this.state.display.includes(".")) ) {
                this.setState((state) => ({
                    display: state.display + currentNumber,
                    formula: state.formula + currentNumber
                }));
            }
        } else if (clear) {
            this.setState({
                display: "0",
                formula: "",
                operator: null,
                prevOperator: false,
                prevEval: false
            });
        } else if (operator) {
            if (this.state.operator) {
                if (operator == "-") {
                    this.setState( (state) => ({
                        prevOperator: true,
                        formula: state.formula + operator,
                    }));
                } else {
                    if (this.state.operator === "-") {
                        let newString = this.state.formula.slice(0, this.state.formula.length - 2);
                        newString += operator;
                        this.setState( (state) => ({
                            prevOperator: true,
                            formula: newString,
                            display:operator
                        }));
                    } else {
                        let newString = this.state.formula.slice(0, this.state.formula.length - 1);
                        newString += operator;
                            this.setState( (state) => ({
                            prevOperator: true,
                            formula: newString,
                            display:operator
                        }));
                    }
                }
            } else {
                this.setState( (state) => ({
                    prevOperator: true,
                    formula: state.formula + operator,
                    display:operator
                }));
            }
        } else if (this.state.prevOperator) {
            if(operator) {
                // Do nothings
            } else {
                this.setState((state) => ({
                    display:currentNumber,
                    formula: state.formula + currentNumber,
                }));
            }
        } else if (equal) {
            let evaluated = eval(this.state.formula);
            
            if (this.state.formula == "") {
                this.setState({
                    display: "0",
                    formula: "0",
                    prevEval:true,
                });
            } else {
                this.setState({
                    display:evaluated,
                    formula:evaluated,
                    prevEval:true
                });
            }
            
        } else {
            this.setState((state) => ({
                display: state.display + currentNumber,
                formula: state.formula + currentNumber
            }));
        }
        
        if (!operator) {
            this.setState({
                prevOperator: false
            });
        }

        this.setState({
            operator:operator
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
            <div id="app-container">
                <Formula display={this.state.formula}></Formula>
                <Display display={this.state.display}></Display>
                <Buttons eventHandler={this.handleButtonClick}></Buttons>
            </div>
            <p style={{textAlign:"center"}}>Coded and Designed by</p>
            <p style={{textAlign:"center"}}>Siddharth Roy</p>
            </div>
        )
    }
}

function Display(props) {
    return (
        <div id="display" className="output">
            <p>{props.display}</p>
        </div>
    );
}

function Formula(props) {
    return (
        <div id="formula" className="output">
            <p>{props.display}</p>
        </div>
    )
}

function Buttons(props) {

    function onButtonClick(event) {
        props.eventHandler(event.currentTarget.id);
    }

    return (
        <div id="buttons-container">
            <button className="cal-button" id="clear" onClick={onButtonClick}>AC</button>
            <button className="cal-button" id="divide" onClick={onButtonClick}>/</button>
            <button className="cal-button" id="multiply" onClick={onButtonClick}>x</button>
            <button className="cal-button" id="seven" onClick={onButtonClick}>7</button>
            <button className="cal-button" id="eight" onClick={onButtonClick}>8</button>
            <button className="cal-button" id="nine" onClick={onButtonClick}>9</button>
            <button className="cal-button" id="subtract" onClick={onButtonClick}>-</button>
            <button className="cal-button" id="four" onClick={onButtonClick}>4</button>
            <button className="cal-button" id="five" onClick={onButtonClick}>5</button>
            <button className="cal-button" id="six" onClick={onButtonClick}>6</button>
            <button className="cal-button" id="add" onClick={onButtonClick}>+</button>
            <button className="cal-button" id="one" onClick={onButtonClick}>1</button>
            <button className="cal-button" id="two" onClick={onButtonClick}>2</button>
            <button className="cal-button" id="three" onClick={onButtonClick}>3</button>
            <button className="cal-button" id="equals" onClick={onButtonClick}>=</button>
            <button className="cal-button" id="zero" onClick={onButtonClick}>0</button>
            <button className="cal-button" id="decimal" onClick={onButtonClick}>.</button>
        </div>
    )
}

ReactDOM.render(<Calculator></Calculator>, document.getElementById("root"));