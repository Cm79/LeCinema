<template>
  <div class="movie-detail">
    <div class="title">
      <h2>{{ movie.Title }} - <span class="year">{{ movie.Year }}</span></h2>
        <div class="save">
        <input
          type="checkbox"
          name="checkbox"
          :id="movie.imdbID"
          :value="movie.imdbID"
          v-model="liked"
          @click="setLikeCookie"
        />
        <label :for="movie.imdbID">
          <i class="fas fa-heart"></i>
        </label>
      </div>
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
import Cookies from "js-cookie";


export default {
  setup() {
    const movie = ref({});
    const route = useRoute();
    let liked = ref([]);

    onBeforeMount(() => {
      getLikeCookie();
      fetch(
        `http://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`
      )
        .then((response) => response.json())
        .then((data) => {
          movie.value = data;
        });

    });

      const getLikeCookie = () => {
      if (Cookies.get("like")) {
        let cookieValue = JSON.parse(Cookies.get("like"));
        liked.value = cookieValue;
      } else {
        liked.value = [];
      }
    };


    const setLikeCookie = () => {
      setTimeout(() => {
        let likedArray = JSON.parse(JSON.stringify(liked.value));
        Cookies.set("like", JSON.stringify(likedArray));
      }, 700);
    };

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

    return { movie,
     decomposeRuntime,
     setLikeCookie,
     liked };
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

  .title { 
    position: relative;
    display: flex;
    flex-direction: column;


  h2 {
    color: $darker;
    font-size: 28px;
    font-weight: 600;
    padding-bottom: 16px;

    span {
      font-size: 25px;

    }
  }

       .save {
            position: absolute;
            width: 60px;
            height: 60px;
            background-color: $darker;
            color: $lighter;
            opacity: 0.9;
            top: 0;
            right: 30px;
            text-transform: capitalize;
            border-radius: 50% 50%;

            input[type="checkbox"] {
              display: none;
            }

            input[type="checkbox"] + label {
              color: $lighter;
              cursor: pointer;
              font-size: 25px;
              position: absolute;
              top: 12px;
              left: 18px;
              transition: 0.2s ease-in-out;
            }

            input[type="checkbox"]:hover + label {
              color: $dark;
              transform: scale(1.5);
            }

            input[type="checkbox"]:checked + label {
              color: $light;
              transform: scale(1.2);
            }

            input[type="checkbox"]:checked:hover + label {
              transform: scale(1.5);
            }
          }
  }

  .detail-wrapper {
    display: flex;
    flex-direction: column;

// min-width: small tablets (768px)
    @include md {
      flex-direction: row;
    }

    .description {
      padding: 20px;


      p {
        color: $lighter;

        span {
          color: $lighter;

          // min-width: small tablets (768px)
          @include md {
          color: $darker;
    }
        }

      }

      .movie-plot {
        padding-top: 20px;
      }
    }


  }
  
}
</style>