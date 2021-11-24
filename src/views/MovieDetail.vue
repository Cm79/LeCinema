<template>
  <div class="movie-detail">
    <div class="title">
      <h2>{{ movie.Title }} - <span class="year">{{ movie.Year }}</span></h2>
    </div>
    <div class="detail-wrapper">
      <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
      <div class="description">
        <p>De <span>{{ movie.Director }}</span></p>
        <p v-if="movie.Actors !== 'N/A'">Avec <span>{{ movie.Actors }}</span></p>
        <p>Durée <span>{{ decomposeRuntime() }}</span></p>
        <p class="movie-plot">{{ movie.Plot }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();

    onBeforeMount(() => {
      fetch(
        `http://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`
      )
        .then((response) => response.json())
        .then((data) => {
          movie.value = data;
        });

    });

    // Décompose une durée en min vers une durée en h et min
    const decomposeRuntime = () => {
      let min = parseInt(movie.value.Runtime);
      let hour = 0;
  
      while (min >= 60){ 
        min -= 60;        
        hour++;        
      }
      min = min < 10 ? "0" + min : min;
      hour = hour ? hour + "h " : "";

      return hour + min + "min";
    
    }

    return { movie, decomposeRuntime };
  },
};
</script>

<style lang="scss">
@import "./scss/variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Eczar:wght@500&display=swap');


.movie-detail {
  padding: 16px;
  background-image: linear-gradient($light, $dark, $darker);
  font-family: "Eczar", serif;

  h2 {
    color: $darker;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;

    span {
      font-size: 25px;

    }
  }

  .detail-wrapper {
    display: flex;

    .description {
      padding: 20px;


      p {
        color: $lighter;

        span {
          color: $darker;

        }

      }

      .movie-plot {
        padding-top: 20px;
      }
    }

  }
  
}
</style>