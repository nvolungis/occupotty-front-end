import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from './style';
import {fetchMotivations} from '../../actions';


const mapStateToProps = (state) => ({
  motivations: state.occupotty.motivations,
  currentMotivation: state.occupotty.currentMotivation
});


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchMotivations
  }, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Motivations extends Component {
  constructor () {
    super();
    this.state = {currentMotivation: 0};
  }

  componentDidMount () {
    this.props.fetchMotivations();
  }

  render () {
    const {motivations, currentMotivation} = this.props;

    return (
      <div className={classNames.motivations}>
        <div className={classNames.motivations__body}>
          <h1 className={classNames.motivations__headline}>Today's Motivations</h1>
          <p>{motivations[currentMotivation]}</p>
        </div>
      </div>
    );
  }
}
