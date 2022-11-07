<template>
  <div v-if="sendingPokemon">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="4">
          <ul class="list-group list-group-light">
            <li
              class="list-group-item px-3 border-0 active"
              aria-current="true"
            >
              {{ name }}
            </li>
            <li
              class="list-group-item px-3 border-0"
              v-for="(skill, index) in skills"
              :key="index"
            >
              {{ skill }}
            </li>
            <li class="list-group-item px-3 border-0">
              <router-link :to="{ name: 'pokemons' }">Go back</router-link>
            </li>
          </ul>
        </b-col>
        <b-col cols="8">
          <div>
            <b-carousel
              id="carousel-fade"
              style="text-shadow: 0px 0px 2px #000"
              fade
              indicators
              img-width="1024"
              img-height="480"
            >
              <div v-for="(image, index) in images" :key="index">
                <img :src="image" />
              </div>
            </b-carousel>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: ["urlDetails"],
  created() {
    this.getPokemonDetails();
  },
  data() {
    return {
      sendingPokemon: false,
      skills: [],
      images: [],
      name: "",
    };
  },
  methods: {
    getPokemonDetails: async function () {
      try {
        if (typeof this.urlDetails === "undefined") {
          this.$router.push("/pokemons");

          return;
        }

        this.sendingPokemon = true;
        const dataReturned = await fetch(this.urlDetails, { method: "GET" });
        const pokemonsInJson = await dataReturned.json();
        if (dataReturned.status >= 400 && dataReturned.status < 600) {
          throw new Error(pokemonsInJson);
        }

        pokemonsInJson.abilities.forEach((skill) => {
          this.skills.push(skill.ability.name);
        });

        Object.values(pokemonsInJson.sprites).forEach((image) => {
          if (typeof image !== "string" || image === null) {
            return;
          }

          this.images.push(image);
        });

        this.name = pokemonsInJson.name;
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>
