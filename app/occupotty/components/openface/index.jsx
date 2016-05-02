import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from './style';


export default class OpenFace extends Component {
  render () {
    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="10 10 77 70">
        <g>
          <path className={classNames.open__st0} d="M62.6,30c-2.2-5.2-7.3-8.8-13.2-8.8c-7.9,0-14.3,6.4-14.3,14.3v5.1"/>
          <g>
            <path className={classNames.open__st1} d="M74.7,68.4c0,2.8-2.2,5-5,5H29.4c-2.8,0-5-2.2-5-5V44.9c0-2.8,2.2-5,5-5h40.4c2.8,0,5,2.2,5,5V68.4z"/>
          </g>
          <circle className={classNames.open__st2} cx="39.4" cy="49.9" r="2.1"/>
          <circle className={classNames.open__st2} cx="58.7" cy="49.8" r="2.1"/>
          <polygon className={classNames.open__st3} points="40,57.3 58.5,57.3 57.9,61.6 40.7,61.6 	"/>
          <path className={classNames.open__st4} d="M40,57.3c0,5.1,4.2,9.3,9.3,9.3c5.1,0,9.3-4.2,9.3-9.3H40z"/>
        </g>
      </svg>
    );
  }
}
