<template>
  <div>
    <pokemon-details :urlDetails="urlDetails" />
  </div>
</template>

<script>
import PokemonDetails from "@/components/PokemonDetails.vue";

export default {
  props: ["urlDetails"],
  components: {
    PokemonDetails,
  },
};
</script>
