<template>
  <ion-tabs>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="schedule" href="/tabs/Tab1">
        <ion-icon :icon="calendar"></ion-icon>
        <ion-label>Etusivu</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="map" href="/tabs/Tab2">
        <ion-icon :icon="train"></ion-icon>
        <ion-label>Junat</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="about" href="/tabs/tab3">
        <ion-icon :icon="informationCircle"></ion-icon>
        <ion-label>Tiedot</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script>
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import {
  calendar,
  informationCircle,
  map,
  cogOutline,
  train,
} from "ionicons/icons";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    IonIcon,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonTabs,
  },
  setup() {
    return { calendar, informationCircle, map, cogOutline, train };
  },
});
</script>
