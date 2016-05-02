import React, {Component}    from 'react';
import ReactDOM              from 'react-dom';
import {connect}             from 'react-redux';
import {bindActionCreators}  from 'redux';
import classNames            from './style';
import {fetchBathroomStatus} from './actions';
import Logo                  from './components/logo/';
import Motivations           from './components/motivations/';
import PlayGraphic           from './components/playlogo/';
import Search                from './components/search/';
import Statuses              from './components/statuses/';


const mapStateToProps = (state) => ({
  status: state.occupotty.status,
  count: state.occupotty.count
});


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchBathroomStatus
  }, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Occupotty extends Component {
  componentDidMount () {
    this.poll()
  }


  poll () {
    const {fetchBathroomStatus} = this.props;
    fetchBathroomStatus();

    setInterval( () => {
      fetchBathroomStatus();
    }, 1000)
  }


  render () {
    const {count} = this.props;

    return (
      <div>
        <header className={classNames.occupotty__header}>
          <div className={classNames.occupotty__header__inner}>
            <Logo />
            <div className={classNames.occupotty__header__count}>
              <span>Flushes: {Math.floor(count/2)}</span>
            </div>
          </div>
        </header>
        <Motivations />
        <div className={classNames.occupotty}>
          <div className={classNames.occupotty__statuses}>
            <Statuses />
          </div>

          <div className={classNames.occupotty__body}>
            <Search />
          </div>
        </div>
      </div>
    )
  }
}
