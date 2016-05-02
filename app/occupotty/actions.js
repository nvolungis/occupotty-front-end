import Types from "./types";
import Spotify from 'spotify-web-api-js';

import {apiFetchBathroomStatus} from './api.js';
import {apiFetchMotivations} from './api.js';
import {apiPlayTrack} from './api.js';

const s = new Spotify();
let fetching = false;

export function fetchBathroomStatus() {
  return {
    type: Types.FETCH_BATHROOM_STATUS,
    callAPI: () => apiFetchBathroomStatus()
  }
}

export function fetchMotivations() {
  return {
    type: Types.FETCH_MOTIVATIONS,
    callAPI: () => apiFetchMotivations()
  }
}

export function setSearchResults(results) {
  return {
    type: Types.SET_SEARCH_RESULTS,
    payload: results
  }
}

export function searchTracks(query) {
  return (dispatch) => {

    if (query == '') {
      dispatch(setSearchResults([]));
    }

    s.searchTracks(query, {limit: 10}).then((data) => {
      dispatch(setSearchResults(data.tracks.items));
    }, (err) => {
      console.log('err', err);
    });
  }
}

export function loadTrack (trackId) {
  return {
    type: Types.SET_CURRENT_TRACK,
    callAPI: () => apiPlayTrack(trackId)
  }
}
