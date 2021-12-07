<template>
  <template
    v-if="composition.journeySections && composition.journeySections.length"
    ><div class="flex-container">
      <div class="train-schedule">
        Juna {{ composition.trainType }} {{ composition.trainNumber }}

        {{
          composition.journeySections[0].beginTimeTableRow.stationShortCode
        }}
        -

        {{ composition.journeySections[0].endTimeTableRow.stationShortCode }}
      </div>
      <div
        v-for="(wagon, i) in composition.journeySections[0].wagons"
        :key="i"
        class="wagon-info"
      >
        <div class="train-style">{{ wagon.salesNumber }}</div>
        <div class="wagon-type">
          <Icon name="catering" label="Ravintolavaunu" v-if="wagon.catering" />
          <Icon
            name="disabled"
            label="Pyörätuolipaikka"
            v-if="wagon.disabled"
          />
          <Icon name="pet" label="Lemmikkieläinvaunu" v-if="wagon.pet" />
          <Icon
            name="playground"
            label="Lasten leikkipaikka"
            v-if="wagon.playground"
          />
        </div>
      </div>
    </div>
  </template>
</template>
<script>
import getComposition from "../services/getComposition";
import Icon from "./Icon.vue";
export default {
  props: ["date", "trainNumber"],
  components: { Icon },
  data() {
    return {
      composition: {},
    };
  },
  methods: {
    //finds train information with url values
    //date syntax: YYYY-MM-DD
    findComposition(date, trainNumber) {
      getComposition(date, trainNumber).then(
        (data) => (this.composition = data)
      );
    },
  },
  //watches value trainNumber for changes
  watch: {
    trainNumber: function (newval) {
      this.findComposition(this.date, newval);
    },
  },
  mounted() {
    console.log(this.date, this.trainNumber);
    this.findComposition(this.date, this.trainNumber);
  },
};
</script>

<style>
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
}
.wagon-info {
  flex: 1;
  padding: 0 2px;
}
.wagon-info svg {
  width: 18px;
  height: 18px;
  margin: 3px;
  text-align: center;
}
.wagon-type {
  text-align: center;
}

.flex-container .wagon-info:first-child,
.flex-container .wagon-info:last-child {
  margin: 0;
}
.train-style {
  background: var(--ion-color-dark);
  color: var(--ion-color-light);
  border-radius: 5px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.flex-container .wagon-info:first-child .train-style {
  border-radius: 30px 5px 5px 5px;
}
.flex-container .wagon-info:last-child .train-style {
  border-radius: 5px 30px 5px 5px;
}
</style>
