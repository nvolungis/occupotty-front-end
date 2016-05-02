import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default Video extends Component {
  render () {
    return (
      <div>
        <div
          className="wistia_responsive_padding"
          style={{padding:'56.25% 0 0 0', position:'relative'}}>
          <div
            className="wistia_responsive_wrapper"
            style={{height:'100%',left:'0', position:'absolute',top:'0',width:'100%'}}>
              <div
                className="wistia_embed wistia_async_yzlsfke2wc videoFoam=true"
                style={{height:'100%',width:'100%'}}>&nbsp;
              </div>
            </div>
          </div>
      </div>
    )
  }
}

