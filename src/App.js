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
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      input: '0',
      output: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({target}) {
    const currentButton = target;

    if (currentButton.id === "clear") {
      this.setState((state) => ({
        output: '0'
      }))
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
