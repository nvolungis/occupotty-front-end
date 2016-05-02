import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Occupotty from 'app/occupotty';
import configureStore from 'app/store';
import 'app/assets/stylesheets/base';

const store = configureStore();

class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Occupotty />
      </Provider>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('reactApplication'))
