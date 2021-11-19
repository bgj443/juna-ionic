<template>
  <ion-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Valitse lähtöasema</span>
      </v-toolbar-title>
    </v-toolbar>
    <ion-router-outlet />
    <v-content>
      <Trains />
    </v-content>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>
