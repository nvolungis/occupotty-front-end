import Api from "app/utils/api";

const spotifyConnectAPI = 'http://162.243.127.194:8080'

export function apiFetchBathroomStatus() {
  return Api.get({
    path: '/states.json?orderBy="_timeStamp"',
  });
}

export function apiFetchMotivations() {
  return Api.get({
    path: '/motivations.json',
  });
}

export function apiPlayTrack(trackId) {
  return Api.get({
    path: `/load/${trackId}`,
    host: spotifyConnectAPI
  });
}
