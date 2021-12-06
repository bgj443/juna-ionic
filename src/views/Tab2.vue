<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lähtevät junat</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Lähtevät junat</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <Trains :pageLoad="trigger" />
      </ion-content>
    </ion-content>
  </ion-page>
</template>
 
<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { defineComponent } from 'vue';
import Trains from "@/components/Trains.vue";

export default defineComponent({
  name: "Tab2",
  components: {
    Trains,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  data() {
    return {
      trigger: 0,
    };
  },
  // update tab when opened
  ionViewDidEnter() {
      this.trigger++;
  },
});
</script>
