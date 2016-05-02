import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchTracks} from '../../actions';
import {loadTrack} from '../../actions';
import classNames from './styles';
import _ from 'lodash';


const mapStateToProps = (state) => ({
  results: state.occupotty.results,
});


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchTracks,
    loadTrack
  }, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Search extends Component {

  constructor () {
    super()
    this.state = {queryTerm: ''}
  }

  renderResultsList () {
    const {results} = this.props;

    return _.map(results, (result) => {
      return (
        <li
          className={classNames.search__result}
          onClick={this.onTrackClick.bind(this, result.uri)}>
          <i className="fa fa-caret-right" aria-hidden="true"></i>&nbsp;
          {result.name} by {result.artist}
        </li>
      );
    })
  }

  onChange (e) {
    this.setState({queryTerm:e.target.value});
    this.props.searchTracks(e.target.value);
  }


  onTrackClick (uri) {
    this.props.loadTrack(uri)
  }


  onControlClick () {
    if (this.state.queryTerm != '') {
      this.refs.input.value = ''
      this.onChange({target: {value:''}})
    } else {
      this.refs.input.focus()
    }
  }

  renderResults () {
    if(this.props.results.length == 0){
      return ""
    }

    return (
      <ul className={classNames.search__results}>
        {this.renderResultsList()}
      </ul>
    )
  }


  render () {
    const controlClasses = [
      classNames.search__box__control
    ].join(' ')

    const iconClasses = [
      (this.state.queryTerm != '' ? 'fa fa-times' : 'fa fa-search')
    ].join(' ')


    return (
      <div className={classNames.search}>
        <div className={classNames.search__box}>
          <div className={controlClasses} onClick={this.onControlClick.bind(this)}>
            <i className={iconClasses} />
          </div>
          <input
            ref='input'
            type='text'
            placeholder='Play a song!'
            className={classNames.search__box__input}
            onChange={_.debounce(this.onChange.bind(this), 300)} />
        </div>
        {this.renderResults()}
      </div>
    )
  }
}
