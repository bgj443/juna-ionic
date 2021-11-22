<template>
  <template
    v-if="composition.journeySections && composition.journeySections.length">
    <div class="flex-container">
      <div
        v-for="(wagon, i) in composition.journeySections[0].wagons"
        :key="i"
        class="wagon-info"
      >
        <!-- <div>Vaunutyyppi: {{ wagon.wagonType }}</div> -->
        <div class="train-style">{{ wagon.salesNumber }}</div>
        <div v-if="wagon.catering">
          <span
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <g
                transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"
              >
                <g>
                  <ellipse
                    cx="10.6"
                    cy="3.5"
                    rx="2.4"
                    ry="3"
                    style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                  ></ellipse>
                  <line
                    x1="10.6"
                    y1="6.5"
                    x2="10.6"
                    y2="13.5"
                    style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                  ></line>
                  <g>
                    <line
                      x1="3.5"
                      y1="0.5"
                      x2="3.5"
                      y2="13.5"
                      style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                    ></line>
                    <path
                      d="M6,.5V3A2.5,2.5,0,0,1,3.5,5.5h0A2.5,2.5,0,0,1,1,3V.5"
                      style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                    ></path>
                  </g>
                </g>
              </g></svg
          ></span>
        </div>
        <div v-if="wagon.disabled">
          <span
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <g
                transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"
              >
                <g>
                  <circle
                    cx="8"
                    cy="2.5"
                    r="2"
                    style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                  ></circle>
                  <path
                    d="M8,4.5v4h3a1,1,0,0,1,1,1v4"
                    style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                  ></path>
                  <path
                    d="M5.5,6.5a3.5,3.5,0,1,0,3.22,4.88"
                    style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                  ></path>
                </g>
              </g></svg
          ></span>
        </div>
        <div v-if="wagon.pet">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <g
              transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"
            >
              <g>
                <ellipse
                  cx="1.5"
                  cy="8"
                  rx="1"
                  ry="1.5"
                  style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                ></ellipse>
                <ellipse
                  cx="4.5"
                  cy="3.5"
                  rx="1"
                  ry="1.5"
                  style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                ></ellipse>
                <ellipse
                  cx="9.5"
                  cy="3.5"
                  rx="1"
                  ry="1.5"
                  style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                ></ellipse>
                <ellipse
                  cx="12.5"
                  cy="8"
                  rx="1"
                  ry="1.5"
                  style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                ></ellipse>
                <path
                  d="M10,10c0,1.38-1.62,2-3,2s-3-.62-3-2S5,6.5,7,6.5,10,8.62,10,10Z"
                  style="fill: none;stroke: currentColor;stroke-linecap: round;stroke-linejoin: round"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <div v-if="wagon.playground">
          <span
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <g
                transform="matrix(3.4285714285714284,0,0,3.4285714285714284,0,0)"
              >
                <path
                  d="M4.09,1.19a2,2,0,0,1,.6,1.33L6.52.7a.67.67,0,0,1,1,0L9,2.24a2.18,2.18,0,0,0-.57.4,2.06,2.06,0,0,0,2.91,2.91,2.18,2.18,0,0,0,.4-.57L13.3,6.52a.67.67,0,0,1,0,1L11.48,9.31a2.05,2.05,0,1,1-2.17,2.17L7.48,13.3a.67.67,0,0,1-1,0L5,11.76a2.18,2.18,0,0,0,.57-.4A2.06,2.06,0,0,0,2.64,8.45a2.18,2.18,0,0,0-.4.57L.7,7.48a.67.67,0,0,1,0-1L2.52,4.69a2,2,0,0,1-1.33-.6,2.05,2.05,0,0,1,2.9-2.9Z"
                  style="fill: none;stroke: currentColor ;stroke-linecap: round;stroke-linejoin: round"
                ></path>
              </g></svg
          ></span>
        </div>
      </div>
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