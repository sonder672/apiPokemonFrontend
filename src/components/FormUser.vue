<template>
  <div class="container-form">
    <b-form @submit.prevent="$emit('submit-form', { email, password })">
      <b-form-group
        id="fieldset-1"
        label="Enter your email"
        label-for="input-1"
      >
        <b-form-input id="input-1" v-model="email"></b-form-input>
        <span class="error-form" v-if="form.msg.email">{{
          form.msg.email
        }}</span>
      </b-form-group>

      <b-form-group
        id="fieldset-2"
        label="Enter your password"
        label-for="input-2"
        class="separation-between-fields"
      >
        <b-form-input id="input-2" v-model="password"></b-form-input>
        <span class="error-form" v-if="form.msg.password">{{
          form.msg.password
        }}</span>
      </b-form-group>

      <div class="separation-between-fields">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<style>
.error-form {
  color: red;
}

.container-form {
  margin-right: 30%;
  margin-left: 30%;
}

.separation-between-fields {
  margin-top: 2%;
}
</style>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      form: {
        msg: [],
      },
    };
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      // binding this to the data value in the email input
      this.password = value;
      this.validatePassword(value);
    },
  },
  methods: {
    validateEmail(value) {
      //eslint-disable-next-line
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.form.msg["email"] = "";
      } else {
        this.form.msg["email"] = "Invalid Email Address";
      }
    },
    validatePassword(value) {
      const difference = 8 - value.length;

      if (value.length < 8) {
        this.form.msg["password"] =
          "Must be 8 characters! " + difference + " characters left";
      } else {
        this.form.msg["password"] = "";
      }
    },
  },
};
</script>
