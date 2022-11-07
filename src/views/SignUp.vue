<template>
  <div>
    <h1>Register</h1>
    <alert-error :message="msg" :showError="showError" />
    <form-user @submit-form="saveUser" />
  </div>
</template>

<script>
import FormUser from "@/components/FormUser.vue";
import AlertError from "@/components/AlertError.vue";

export default {
  name: "signup",
  components: {
    FormUser,
    AlertError,
  },
  data() {
    return {
      msg: "",
      showError: false,
    };
  },
  methods: {
    saveUser: async function (userData) {
      try {
        const settings = {
          method: "POST",
          body: JSON.stringify({
            email: userData["email"],
            password: userData["password"],
          }),
          headers: {
            "Content-type": "application/json",
          },
        };
        const url = `${process.env.VUE_APP_PANTERA_API}/signup`;
        const signup = await fetch(url, settings);

        if (signup.status >= 400 && signup.status < 600) {
          const infoJson = await signup.json();
          throw new Error(infoJson.message);
        }

        this.msg = "Successfully created";
        this.$router.push("/login");
      } catch (error) {
        this.showError = true;
        this.msg = error;
      }
    },
  },
};
</script>
