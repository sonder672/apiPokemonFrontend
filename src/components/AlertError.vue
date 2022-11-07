<template>
  <div v-if="showError">
    <b-alert
      :show="dismissCountDown"
      class="alert-error"
      variant="danger"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{ message }}</p>
      <b-progress
        variant="danger"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
  </div>
</template>

<style>
.alert-error {
  margin-right: 30%;
  margin-left: 30%;
}
</style>

<script>
export default {
  props: ["showError", "message"],
  created() {
    this.countDownChanged();
    this.showAlert();
  },
  data() {
    return {
      dismissSecs: 2,
      dismissCountDown: 0,
    };
  },
  watch: {
    dismissCountDown() {
      if (this.dismissCountDown == 0) {
        //eslint-disable-next-line
        this.showError = false;
        this.dismissCountDown = 2;
      }
    },
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
