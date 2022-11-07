import Vue from "vue";
import VueRouter from "vue-router";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Pokemons from "../views/Pokemons.vue";
import PokemonDetails from "../views/PokemonDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "signin",
    component: Login,
  },
  {
    path: "/pokemons",
    name: "pokemons",
    component: Pokemons,
  },
  {
    path: "/pokemon/detail",
    name: "pokemonDetails",
    component: PokemonDetails,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
