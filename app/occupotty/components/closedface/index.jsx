import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from './style';


export default class ClosedFace extends Component {
  render () {
    return (
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="10 10 77 70" >
        <path className={classNames.closed__st0} d="M34.5,40.3v-5.1c0-7.9,6.4-14.3,14.3-14.3s14.3,6.4,14.3,14.3v5.1" />
        <g>
          <path className={classNames.closed__st1} d="M74.7,68.4c0,2.8-2.2,5-5,5H29.4c-2.8,0-5-2.2-5-5V44.9c0-2.8,2.2-5,5-5h40.4c2.8,0,5,2.2,5,5V68.4z"/>
        </g>
        <circle className={classNames.closed__st2} cx="39.4" cy="49.9" r="2.1"/>
        <circle className={classNames.closed__st2} cx="58.7" cy="49.8" r="2.1"/>
        <line className={classNames.closed__st3} x1="40.7" y1="60.9" x2="58.4" y2="60.9"/>
      </svg>
    );
  }
}
