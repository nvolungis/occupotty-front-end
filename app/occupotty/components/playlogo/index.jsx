import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from './style';

export default class PlayGraphic extends Component {
  render () {
    return (
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" >
        <path class={classNames.st0} d="M28.1,61.5c0,4.4,2.8,5.7,6.2,2.9l12-9.9c3.4-2.8,3.4-7.4,0-10.1l-12-9.9c-3.4-2.8-6.2-1.5-6.2,2.9V61.5z"/>
        <path class={classNames.st0} d="M52.8,60.7c0,4.4,2.8,5.7,6.2,2.9l11.1-9.1c3.4-2.8,3.4-7.4,0-10.2L59,35.2c-3.4-2.8-6.2-1.5-6.2,2.9V60.7z" />
      </svg>
    );
  }
}
