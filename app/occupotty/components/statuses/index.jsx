import React, {Component} from 'react';
import ReactDOM           from 'react-dom';
import {connect}          from 'react-redux';
import classNames         from './style';
import ClosedFace         from 'app/occupotty/components/closedface/';
import OpenFace           from 'app/occupotty/components/openface/';
import _                  from 'lodash';


const mapStateToProps = (state) => ({
  status: state.occupotty.status
});



@connect(mapStateToProps)
export default class Statuses extends Component {
  roomText (room) {
    switch (room) {
      case 'menUpstairs':
        return "Men\'s 2nd Floor";

      case 'menDownstairs':
        return 'Men\'s 1st Floor';

      case 'womenDownstairs':
        return 'Women\'s 1st Floor';

      case 'womenUpstairs':
        return 'Women\'s 2nd Floor';
    }
  }


  getIcon (room) {
    const {status} = this.props;
    return status[room] ? <ClosedFace /> : <OpenFace />
  }


  innerClassNames (room) {
    const {status} = this.props;

    return [
      classNames.status__inner,
      (status[room] ? classNames['is-occupied'] : ''),
      (classNames['is-first-render'])
    ].join(' ')
  }


  renderRoom (room, index) {
    const innerClassNames = this.innerClassNames(room)

    return (
      <div key={index} className={classNames.status}>
        <div className={innerClassNames}>
          <div className={classNames.svgCircle}>
            {this.getIcon(room)}
          </div>
          <p className={classNames.roomText}>
            {this.roomText(room)}
          </p>
        </div>
      </div>
    );
  }


  render () {
    const rooms = ['womenUpstairs', 'menUpstairs', 'womenDownstairs', 'menDownstairs'];

    return (
      <div>
        {_.map(rooms, this.renderRoom.bind(this))}
      </div>
    );
  }
}
