<template>
  <label for="start">Start date:</label>

  <input type="date" id="start" name="trip-start" v-model="date" />
  {{ date }}
</template>
<script>
export default {
  data() {
    return {
      date: "",
    };
  },
};
</script>

<style></style>
