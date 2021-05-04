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
        return (
            <>
                {this.state.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}
            </>
        )
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);