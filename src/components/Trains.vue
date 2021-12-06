<template>
  <div>
    <ion-searchbar
      id="station-search"
      placeholder="Hae asemaa"
      show-cancel-button="always"
      v-model="searchWord"
      @ionFocus="showStationList = true"
      @ionCancel="showStationList = false"
      @ionChange="updateSearch($event)"
    >
    </ion-searchbar>
    <ion-list v-if="showStationList">
      <template v-for="(station, i) in stations">
        <ion-item
          button
          @click="
            departureStation = station.stationShortCode;
            refreshTrains();
            showStationList = false;
            searchWord = findStationName(departureStation);
          "
          v-bind:key="'station' + i"
          :value="station.stationShortCode"
          v-if="station.passengerTraffic === true"
        >
          {{ station.stationName }}
        </ion-item>
      </template>
    </ion-list>
    <ion-segment value="departures" @ionChange="showTable($event)">
      <ion-segment-button value="departures">
        <ion-label>Lähtevät</ion-label>
      </ion-segment-button>
      <ion-segment-button value="arrivals">
        <ion-label>Saapuvat</ion-label>
      </ion-segment-button>
    </ion-segment>
    <span class="train-category-filter">
      <ion-chip ref="filter-option-commuter" @click="updateFilter('Commuter')">
        <input
          type="checkbox"
          id="commuter"
          value="Commuter"
          v-model="trainCategories"
          @change="refreshTrains"
        />
        <ion-label>Lähijunat</ion-label>
      </ion-chip>
      <ion-chip
        ref="filter-option-long-distance"
        @click="updateFilter('Long-distance')"
      >
        <input
          type="checkbox"
          id="long-distance"
          value="Long-distance"
          v-model="trainCategories"
          @change="refreshTrains"
        />
        <ion-label>Kaukojunat</ion-label>
      </ion-chip>
    </span>
    <ion-grid v-if="departureStation && searchWord" fixed>
      <ion-row>
        <ion-toolbar>
          <ion-title>{{searchWord}}</ion-title>
        </ion-toolbar>
      </ion-row>
    </ion-grid>
    <template v-if="trains.length && departureStation && searchWord">
      <!--Lähtevät-->

      <div v-if="showTables.includes('departures')">
        <ion-grid fixed>
          <ion-row>
            <ion-col size="4">
              <div>Juna</div>
            </ion-col>
            <ion-col size="9">
              <div>Määränpää</div>
            </ion-col>
            <ion-col size="3">
              <div>Raide</div>
            </ion-col>
            <ion-col size="8">
              <div>Lähtöaika</div>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div
          class="departure-table table-row"
          v-for="(train, i) in trains"
          v-bind:key="i"
        >
          <template
            v-if="
              findDeparture(train.timeTableRows) &&
                trainCategories.includes(train.trainCategory) &&
                (findDeparture(train.timeTableRows).liveEstimateTime ??
                  findDeparture(train.timeTableRows).scheduledTime) >=
                  new Date().toISOString()
            "
          >
            <router-link
              :to="
                '/tabs/tab3/' + train.departureDate + '/' + train.trainNumber
              "
            >
              <ion-grid fixed>
                <ion-row>
                  <ion-col size="4">
                    <span class="train-type">
                      {{ formatTrainType(train) }}
                    </span>
                  </ion-col>
                  <ion-col size="9">
                    <span
                      class="train-destination"
                      v-if="train.timeTableRows.length"
                    >
                      <span
                        v-if="
                          train.commuterLineID == 'P' ||
                            train.commuterLineID == 'I'
                        "
                      >
                        <span v-if="stationPassed(train.timeTableRows, 'LEN')"
                          >Helsinki</span
                        >
                        <span v-else>Lentoasema</span>
                      </span>
                      <span v-else>
                        {{
                          findStationName(
                            train.timeTableRows[train.timeTableRows.length - 1]
                              .stationShortCode
                          )
                        }}
                      </span>
                    </span>
                  </ion-col>
                  <ion-col size="3">
                    <span class="train-track">
                      {{ findDeparture(train.timeTableRows).commercialTrack }}
                    </span>
                  </ion-col>
                  <ion-col size="8">
                    <span
                      class="train-schedule"
                      v-if="train.cancelled == false"
                    >
                      {{
                        formatTime(
                          findDeparture(train.timeTableRows).scheduledTime
                        )
                      }}
                    </span>
                    <span class="train-live-schedule" v-else>
                      {{ "Peruttu" }}
                    </span>
                    <span
                      class="train-live-schedule"
                      v-if="
                        findDeparture(train.timeTableRows).liveEstimateTime &&
                          formatTime(
                            findDeparture(train.timeTableRows).liveEstimateTime
                          ) !=
                            formatTime(
                              findDeparture(train.timeTableRows).scheduledTime
                            )
                      "
                    >
                      {{
                        "  ~" +
                          formatTime(
                            findDeparture(train.timeTableRows).liveEstimateTime
                          )
                      }}
                    </span>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </router-link>
          </template>
        </div>
      </div>
      <!--Saapuvat-->

      <div v-if="showTables.includes('arrivals')">
        <ion-grid fixed>
          <ion-row>
            <ion-col size="4">
              <div>Juna</div>
            </ion-col>
            <ion-col size="9">
              <div>Määränpää</div>
            </ion-col>
            <ion-col size="3">
              <div>Raide</div>
            </ion-col>
            <ion-col size="8">
              <div>Saapumisaika</div>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div class="arrival-table" v-for="(train, i) in trains" v-bind:key="i">
          <template
            v-if="
              findArrival(train.timeTableRows) &&
                trainCategories.includes(train.trainCategory)
            "
          >
            <router-link
              :to="
                '/tabs/tab3/' + train.departureDate + '/' + train.trainNumber
              "
            >
              <ion-grid fixed>
                <ion-row>
                  <ion-col size="4">
                    <span class="train-type">
                      {{ formatTrainType(train) }}
                    </span>
                  </ion-col>
                  <ion-col size="9">
                    <span
                      class="train-destination"
                      v-if="train.timeTableRows.length"
                    >
                      <span
                        v-if="
                          train.commuterLineID == 'P' ||
                            train.commuterLineID == 'I'
                        "
                      >
                        <span v-if="stationPassed(train.timeTableRows, 'LEN')"
                          >Helsinki</span
                        >
                        <span v-else>Lentoasema</span>
                      </span>
                      <span v-else>
                        {{
                          findStationName(
                            train.timeTableRows[train.timeTableRows.length - 1]
                              .stationShortCode
                          )
                        }}
                      </span>
                    </span>
                  </ion-col>
                  <ion-col size="3">
                    <span class="train-track">
                      {{ findArrival(train.timeTableRows).commercialTrack }}
                    </span>
                  </ion-col>

                  <ion-col size="8">
                    <span
                      class="train-schedule"
                      v-if="train.cancelled == false"
                    >
                      {{
                        formatTime(
                          findArrival(train.timeTableRows).scheduledTime
                        )
                      }}
                    </span>
                    <span class="train-live-schedule" v-else>
                      {{ "Peruttu" }}
                    </span>

                    <span
                      class="train-live-schedule"
                      v-if="
                        findArrival(train.timeTableRows).liveEstimateTime &&
                          formatTime(
                            findArrival(train.timeTableRows).liveEstimateTime
                          ) !=
                            formatTime(
                              findArrival(train.timeTableRows).scheduledTime
                            )
                      "
                    >
                      {{
                        "  ~" +
                          formatTime(
                            findArrival(train.timeTableRows).liveEstimateTime
                          )
                      }}
                    </span>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </router-link>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import getTrainsByStation from "../services/getTrainsByStation";
import getStations from "../services/getStations";
import {
  IonSegment,
  IonLabel,
  IonSegmentButton,
  IonSearchbar,
  IonList,
  IonItem,
  IonChip,
  IonTitle,
  IonToolbar,
  IonRow,
  IonGrid,
  IonCol
} from "@ionic/vue";
export default {
  components: {
    IonSegment,
    IonLabel,
    IonSegmentButton,
    IonSearchbar,
    IonList,
    IonItem,
    IonChip,
    IonTitle,
    IonToolbar,
    IonRow,
    IonGrid,
    IonCol
  },
  data() {
    return {
      departureStation: "",
      arrivalStation: "",
      trains: [],
      stations: ["stationShortCode", "stationName"],
      headers: [],
      trainCategories: ["Commuter", "Long-distance"],
      showTables: ["departures"],
      showStationList: false,
      searchWord: "",
    };
  },
  props: ['pageLoad'],
  methods: {
    refreshTrains() {
      if (this.departureStation) {
        let departureStation = this.departureStation;
        getTrainsByStation(this.departureStation).then(
          (data) =>
            (this.trains = data.sort(function compare(a, b) {
              let indexA = a.timeTableRows.findIndex(
                (el) => el.stationShortCode == departureStation
              );
              let indexB = b.timeTableRows.findIndex(
                (el) => el.stationShortCode == departureStation
              );
              return (
                new Date(a.timeTableRows[indexA].scheduledTime) -
                new Date(b.timeTableRows[indexB].scheduledTime)
              );
            }))
        );
      }
    },
    findDeparture(timetable) {
      let departure = timetable.find(
        (el) =>
          el.stationShortCode == this.departureStation && el.type == "DEPARTURE"
      );
      return departure;
    },
    findArrival(timetable) {
      let arrival = timetable.find(
        (el) =>
          el.stationShortCode == this.departureStation && el.type == "ARRIVAL"
      );
      return arrival;
    },
    formatDate(value) {
      let formatted = new Date(value).toLocaleDateString("fi-fi");
      return formatted;
    },
    formatTime(value) {
      let formatted = new Date(value).toLocaleTimeString("fi-fi", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formatted;
    },
    formatTrainType(train) {
      return train.commuterLineID
        ? train.commuterLineID
        : train.trainType + train.trainNumber;
    },
    findStationName(stationShort) {
      let stationName = this.stations.find(
        (el) => el.stationShortCode == stationShort
      );
      return stationName.stationName.split(" ")[0];
    },
    showTable(event) {
      event.detail.value == "arrivals"
        ? (this.showTables = ["arrivals"])
        : (this.showTables = ["departures"]);
    },
    updateSearch(event) {
      if(!this.showStationList) return;
      let items = Array.from(document.querySelector('ion-list').children);
      let query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach((item) => {
          let shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? "block" : "none";
        });
      });
    },
    updateFilter(value) {
      this.trainCategories.includes(value)
        ? (this.trainCategories = this.trainCategories.filter(
            (el) => el !== value
          ))
        : this.trainCategories.push(value);
    },
    stationPassed(timetable, stationShort) {
      let passed;
      timetable.findIndex((el) => el.stationShortCode == stationShort) <=
      timetable.findIndex((el) => el.stationShortCode == this.departureStation)
        ? (passed = true)
        : (passed = false);
      return passed;
    },
    readParams() {
      if(this.$route.params.closestStation)
        this.departureStation = this.$route.params.closestStation;
      if(this.$route.params.searchWord)
        this.searchWord = this.$route.params.searchWord;
    }
  },
  mounted() {
    getStations().then((data) => (this.stations = data));
  },
  watch: { 
    pageLoad: function() {
      this.readParams();
      this.refreshTrains();
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
.train-type {
  display: inline-block;
  border-radius: 50px;
  min-width: 30px;
  height: 30px;
  background: var(--ion-color-dark);
  color: var(--ion-color-light);
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  padding: 6px 8px;
}
.train-destination {
  font-size: 16px;
  font-weight: bold;
  padding: 6px;
}
.train-track {
  font-size: 16px;
  font-weight: bold;
  padding: 6px;
}
.train-schedule {
  font-size: 16px;
  font-weight: bold;
  padding: 6px;
}
.train-live-schedule {
  color: var(--ion-color-danger);
}
.train-category-filter {
  padding: 6px;
  display: block;
  text-align: center;
}
ion-col {
  --ion-grid-columns: 24;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  background: gainsboro;
  
}

ion-chip > ion-label {
  padding: 5px;
}
ion-grid {
  padding: 1px;
}
</style>
