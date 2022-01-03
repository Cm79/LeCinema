<template>
  <div class="container">
    <div class="title">
      <h2>{{ movie.Title }} - {{ movie.Year }}</h2>
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
    <div class="detail">
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
        `https://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`
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


.container {
  margin: 30px 0;

  .title { 
    position: relative;
    @include md {
    display: flex;
    flex-direction: column;
    }

  h2 {
    color: $darker;
    font-size: 28px;
    font-weight: 600;
    padding-bottom: 16px;
  }

       .save {
          @include md {
            position: absolute;
            top: 0;
            right: 30px;
          }            
            width: 60px;
            height: 60px;
            background-color: $darker;
            border-radius: 50% 50%;
            position: relative;

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
              color: $light;
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

  .detail {
    display: flex;
    flex-direction: column;
    letter-spacing: 0.5px;
    margin-top: 15px;

// min-width: small tablets (768px)
    @include md {
      flex-direction: row;
    }

    .description {
      padding: 20px;


      p {
        color: $dark;
        
        span {
          color: $black;
        }
      }

      .movie-plot {
        color: $black;        
        padding-top: 20px;
      }
    }


  }
  
}
</style>