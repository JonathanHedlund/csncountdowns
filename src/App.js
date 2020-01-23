

import React, { Component } from 'react';
import Countdown from './Countdown.js'
import './App.css';
import Quotes from './Quotes.js';
import Money from './Money.js';

class App extends Component {
  render() {
    return (
      <div className="App" >

        <div className="intro-text">
          <p>When is CSN due?</p>
          <hr />
        </div>
        <div className="timer">
          <Countdown />
        </div>
        <div className="csnAmount">
          <Money></Money>
        </div>
        <div className="qoute-of-the-day">
          <Quotes></Quotes>
        </div>
        <div className="link-csn">
          <a href="https://www.csn.se/" target="_blank"> <br /> Click here to visit CSNs website</a>
          <div className="jonathan">
            <p>By Jonathan Hedlund</p>
            <a href="https://jonathanhedlund.com/" target="_blank">www.jonathanhedlund.com</a>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
