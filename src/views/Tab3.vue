<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Junan tiedot</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Junan tiedot</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <Compositions
          class="element"
          :date="$route.params.date"
          :trainNumber="$route.params.trainNumber"
        ></Compositions>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Compositions from "../components/Compositions";
export default  {
  name: 'Tab3',
  components: {  Compositions, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>
