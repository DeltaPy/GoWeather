import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
        
      }

       componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }

      componentWillUnmount() {
        clearInterval(this.timerID);
      }

      tick() {
        this.setState({
          date: new Date()
        });
      }

    render() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <>
                {this.state.date.toLocaleTimeString(('it-IT')).slice(0,5)}
                <br/>
                {this.state.date.toLocaleString('it-IT', options)}
            </>
        )
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);