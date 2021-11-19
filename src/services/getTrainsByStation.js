const API_BASE_PATH = "https://rata.digitraffic.fi/api/v1";

function getTrainsByStation(station) {
  let API_PATH = "/live-trains/station";
  let requestUrl =
    API_BASE_PATH +
    API_PATH +
    "/" +
    station +
    "?minutes_before_departure=200&minutes_after_departure=0&minutes_before_arrival=200&minutes_after_arrival=0";
  console.log(requestUrl);
  return fetch(requestUrl).then((response) => response.json());
}

export default getTrainsByStation;
