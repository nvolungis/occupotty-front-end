import * as ih       from "app/utils/immutable_helpers";
import Types         from "./types";

const initialState = ih.immutable({
  count: 0,
  motivations: {'init': 'initial motivation'},
  currentMotivation: 'init',
  pollCount: 0,
  status: {
    womenDownstairs: false,
    womenUpstairs: false,
    menDownstairs: false,
    menUpstairs: false,
    _timeStamp: 0
  },
  results: []
});

function updateBathroomState (state, action) {
  const keys = Object.keys(action.apiResponse);
  const count = keys.length;
  const response = action.apiResponse[keys[count-1]];
  state = ih.set(state, 'status', response);
  state = ih.set(state, 'count', count);
  state = ih.set(state, 'pollCount', state.pollCount + 1);
  return state;
}


export default function reducer (state = initialState, action) {
  switch(action.type) {
    case Types.FETCH_BATHROOM_STATUS.done:
      state = updateBathroomState(state, action);
      break;

    case Types.FETCH_MOTIVATIONS.done:
      const keys = Object.keys(action.apiResponse);
      const randomIndex = Math.floor(Math.random() * keys.length)
      const randomKey = keys[randomIndex];

      state = ih.set(state, 'motivations', action.apiResponse);
      state = ih.set(state, 'currentMotivation', randomKey);
      break;

    case Types.SET_SEARCH_RESULTS:
      const result = action.payload.map((result) => {
        return {
          name: result.name,
          artist: result.artists[0].name,
          uri: result.uri.replace('spotify:track:', '')
        }
      });

      state = ih.set(state, 'results', result);
      break;

  }

  return state;
}
