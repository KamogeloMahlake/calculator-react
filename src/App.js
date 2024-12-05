import './App.css';
import React, {Component} from 'react'

const items = [
  {value: 'AC', id: 'clear', className: 'clear'},
  {value: '/', id: 'divide', className: 'operators'},
  {value: 'x', id: 'multiply', className: 'operators'},
  {value: '7', id: 'seven', className: 'numbers'},
  {value: '8', id: 'eight', className: 'numbers'},
  {value: '9', id: 'nine', className: 'numbers'},
  {value: '-', id: 'subtract', className: 'operators'},
  {value: '4', id: 'four', className: 'numbers'},
  {value: '5', id: 'five', className: 'numbers'},
  {value: '6', id: 'six', className: 'numbers'},
  {value: '+', id: 'add', className: 'operators'},
  {value: '1', id: 'one', className: 'numbers'},
  {value: '2', id: 'two', className: 'numbers'},
  {value: '3', id: 'three', className: 'numbers'},
  {value: '=', id: 'equals', className: 'equals'},
  {value: '0', id: 'zero', className: 'numbers'},
  {value: '.', id: 'decimal', className: 'decimal'}
]

const Button = ({value, id, className, click}) => {
  return (
    <button id={id} className={className} onClick={click}>{value}</button>
  )
}

const answer = (equation) => {
  let index = 0
  
  if (equation[0] === "-") {
    equation = equation.replace(1, "");
  } 
  if (equation.includes("- -") || equation.includes("x -") || equation.includes("/ -") || equation.includes("+ -")) {
    index = equation.indexOf("- -");
    equation = equation.replace(index + 2, "");
  }
  const values = equation.trim().split(" ");
  while (["+", "-", "/", "x"].includes(values[values.length - 1])) {
    values.pop();
  }

  const operators = ["x", "/", "+", "-"]
  for (const operator of operators) {
    while (values.includes(operator)) {
      switch (operator) {
        case "x":
          index = values.indexOf("x");
          values[index - 1] = parseFloat(values[index - 1]) * parseFloat(values[index + 1]);
          values.splice(index, 1);
          values.splice(index, 1)
          break;
        case "/":
          index = values.indexOf("/");
          values[index - 1] = parseFloat(values[index - 1]) / parseFloat(values[index + 1]);
          values.splice(index, 1);
          values.splice(index, 1)
          break;

        case "-":
          index = values.indexOf("-");
          values[index - 1] = parseFloat(values[index - 1]) - parseFloat(values[index + 1]);
          values.splice(index, 1);
          values.splice(index, 1);
          break;

        case "+":
          index = values.indexOf("+");
          values[index - 1] = parseFloat(values[index - 1]) + parseFloat(values[index + 1]);
          values.splice(index, 1);
          values.splice(index, 1);
          break;

        default:
          break;
      }
    }
  }
  return values.join("");
}
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      output: '0'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({target}) {
    const currentButton = target;

    switch (currentButton.id) {
      case "clear":
        this.setState({
          output: '0'
        });
        break;

      case "equals":
        this.setState((prevState) => ({
          output: answer(prevState.output)
        }));
        break;

      case "decimal":
        if (this.state.output[this.state.output.length - 1] === ".") {
          break;
        }
        const currentValue = this.state.output.trim().split(" ");
        if (currentValue[currentValue.length - 1].includes(".")) {
          break;
        }
        this.setState((prevState) => ({
          output: prevState.output + "."
        }))
        break;

      default:
        if (this.state.output === "0" && currentButton.textContent !== ".") {
          this.setState({
            output: currentButton.textContent
          });
          break;
        }

        if (["+", "/", "x"].includes(this.state.output[this.state.output.length - 1])) {
          if (["+", "/", "x"].includes(currentButton.textContent)) {
            this.setState((prevState) => ({
              output: prevState.output.slice(0, -1) + currentButton.textContent
            }));
            break;
        }} else if ((this.state.output[this.state.output.length - 1] === "-" && this.state.output[this.state.output.length - 2] === "-")) {
          /*if (["+", "/", "x", "-"].includes(currentButton.textContent)) {
            break;
        } else*/ if (currentButton.textContent === "-") {
          break;
        }
      } 

        if (["x", "/", "-", "+"].includes(currentButton.textContent)) {
          this.setState((prevState) => ({
            output: prevState.output + " " + currentButton.textContent + " "
          }));
          break;
        }
        
        this.setState((prevState) => ({
          output: prevState.output + currentButton.textContent
        })); 
        break;
      }

  }

  render() { 
    return (
      <div id="calculator">
        <p id="display">{this.state.output}</p>
        <div id="grid-container">{items.map(({value, id, className}, index) => <Button click={this.handleClick} key={index} value={value} id={id} className={className} />)}</div>
      </div>
    )
  }
}

export default App;
