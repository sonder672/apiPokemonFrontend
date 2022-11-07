<template>
  <div>
    <pokemon-go @validate-access="pokemonDetails" />
  </div>
</template>

<script>
import PokemonGo from "@/components/Pokemons.vue";

export default {
  name: "signup",
  components: {
    PokemonGo,
  },
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    pokemonDetails: async function (urlPokemonDetails) {
      try {
        const token = sessionStorage.getItem("token");
        if (typeof token === "undefined" || token === null) {
          throw new Error("unauthorized");
        }

        const settings = {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const url = `${process.env.VUE_APP_PANTERA_API}/token`;
        const verifyToken = await fetch(url, settings);
        if (verifyToken.status >= 400 && verifyToken.status < 600) {
          throw new Error(verifyToken.statusText);
        }

        this.$router.push({
          name: "pokemonDetails",
          params: { urlDetails: urlPokemonDetails },
        });
      } catch (error) {
        this.msg = error;
        this.$router.push("/login");
      }
    },
  },
};
</script>
