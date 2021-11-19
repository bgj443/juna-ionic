const API_BASE_PATH = "https://rata.digitraffic.fi/api/v1";

function getStations() {
  let API_PATH = "/metadata/stations";
  let requestUrl = API_BASE_PATH + API_PATH;
  return fetch(requestUrl).then((response) => response.json());
}

export default getStations;
