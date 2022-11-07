<template>
  <div>
    <b-container class="text-center">
      <b-row>
        <b-col
          cols="4"
          style="padding: 5%"
          @click="$emit('validate-access', pokemon.url)"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :class="{ iconMouse: hover }"
          v-for="(pokemon, index) in pokemons"
          :key="index"
        >
          {{ pokemon.name }}
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.iconMouse {
  cursor: pointer;
}
</style>

<script>
export default {
  created() {
    this.getPokemonList();
  },
  data() {
    return {
      pokemons: {},
      hover: false,
    };
  },
  methods: {
    getPokemonList: async function () {
      try {
        const settings = {
          method: "GET",
        };
        const url = process.env.VUE_APP_POKEMON_API;

        const dataReturned = await fetch(url, settings);
        const pokemonsInJson = await dataReturned.json();
        if (dataReturned.status >= 400 && dataReturned.status < 600) {
          throw new Error(pokemonsInJson);
        }

        this.pokemons = pokemonsInJson.results;
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>
