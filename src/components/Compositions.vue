<template>
  <template
    v-if="composition.journeySections && composition.journeySections.length"
  >
    <div v-for="(wagon, i) in composition.journeySections[0].wagons" :key="i">
      <div>Vaunutyyppi: {{ wagon.wagonType }}</div>
      <div>Sijainti: {{ wagon.location }}</div>
      <div v-if="wagon.catering">Ravintolavaunu</div>
      <div v-if="wagon.disabled">Esteetön</div>
      <div v-if="wagon.pet">Lemmikkivaunu</div>
      <div v-if="wagon.playground">Leikkipaikka</div>
    </div>
  </template>
</template>
<script>
import getComposition from "../services/getComposition";

export default {
  props: ["date", "trainNumber"],
  data() {
    return {
      composition: {},
    };
  },

  methods: {
    findComposition(date, trainNumber) {
      getComposition(date, trainNumber).then(
        (data) => (this.composition = data)
      );
    },
  },
  mounted() {
    console.log(this.date, this.trainNumber);
    this.findComposition(this.date, this.trainNumber);
  },
};
</script>

<style></style>
