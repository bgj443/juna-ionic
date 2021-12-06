<template>
    <div class="location">
        <ion-button 
            color="success"
            @click="getLocation"
        >
            Hae lähin asema
        </ion-button>
    </div>
</template>

<script>
import getStations from "../services/getStations";
import {
  IonButton
} from "@ionic/vue";
export default {
  components: {
      IonButton
  },
  data () {
    return {
        location: null,
        stations: [],
        closestStation: "",
        closestStationShort: "",
        closestStationDistance: 9999999
    }
  },
  methods: {
    // find closest station to user and redirect
    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.location = position
                this.findClosestStation()
                console.log("Closest station:", this.closestStation, "- Distance:", this.closestStationDistance, "km")
                this.$router.push({
                    name: "Junat",
                    params: {
                        closestStation: this.closestStationShort,
                        searchWord: this.closestStation
                    }
                });
            }
        ) 
    },
    // compare distances to determine closest station
    checkDistance(el) {
        let distance = this.getDistance(this.location.coords.latitude, this.location.coords.longitude, el.latitude, el.longitude, "K");
        if(distance < this.closestStationDistance && el.passengerTraffic == true) {
            this.closestStationShort = el.stationShortCode
            this.closestStation = el.stationName
            this.closestStationDistance = distance
        }
    },
    // calculate distance, code from https://www.geodatasource.com/developers/javascript
    getDistance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    },
    findClosestStation() {
        if(!this.location) return;
        this.stations.forEach(
            (el) => this.checkDistance(el)
        )
    }, 
  },
  mounted() {
    getStations().then((data) => (this.stations = data));
  }
}
</script>

<style>
.location {
    text-align: center;
}
</style>