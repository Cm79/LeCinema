<template>
<div class="movie-item" v-for="movie in moviesContent" :key="movie.imdbID">
  <div class="movie-info"> 
    <router-link :to="'/movie/' + movie.imdbID">
      <h3 class="movie-title">{{ movie.Title }}</h3>
    </router-link>
    <p>{{ movie.Year }}
      <span> - De </span>{{ movie.Director }}
    </p>
  </div>
  <div class="save">
    <input type="checkbox" name="checkbox" :id="movie.imdbID" :value="movie.imdbID" v-model="liked" @click="setLikeCookie" />
    <label :for="movie.imdbID">
      <i class="fas fa-heart"></i>
    </label>
  </div>
</div>


</template>


<script>
import { ref, onBeforeMount } from "vue";
import env from "@/env.js";
import Cookies from 'js-cookie';


export default {

  setup() {
    let movie = ref({});
    let liked = [];
    const moviesContent = ref([]);
    
    const getLikeCookie = () => {
      let cookieValue = JSON.parse(Cookies.get('like'));
      liked = (cookieValue ? cookieValue : []) ;
      console.log(liked)
    };    

      onBeforeMount(() => {

        getLikeCookie();

        for( let i=0; i < liked.length; i++ ){
            
          fetch(
              `http://www.omdbapi.com/?apikey=${env.apikey}&i=${liked[i]}`
          )
              .then((response) => response.json())
              .then((data) => {
              movie.value = data;
              moviesContent.value.push(movie.value);

              });
      }
    });

    
    const setLikeCookie = () => {
      setTimeout( () => {
            let likedArray = JSON.parse(JSON.stringify(liked));
            Cookies.set('like', JSON.stringify(likedArray));

      }, 1000);
    };



    return {
        
      liked,
      getLikeCookie,
      setLikeCookie,
      moviesContent,
      movie,
    };
  },
};
</script>

<style scoped lang="scss">
@import "./scss/variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Eczar:wght@500&display=swap');

.movie-item{
  background-image: linear-gradient($light, $dark, $darker);
  margin: 10px;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-family: "Eczar", serif;

    .movie-info {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .movie-title {
        color: $darker;
        text-transform: uppercase;
        font-size: 20px;
      }

      p {
        color: $lighter;
        font-size: 18px;

        span {
          color: $darker;
        };
      }
    }
}

          .save {
            min-width: 70px;
            min-height: 70px;
            color: $lighter;
            text-transform: capitalize;
            position: relative;

            input[type="checkbox"] {
              display: none;
            }

            input[type="checkbox"] + label {
              color: $lighter;
              cursor: pointer;
              font-size: 25px;
              position: absolute;
              top: 20px;
              left: 22px;
              transition: 0.2s ease-in-out;
            }

            input[type="checkbox"]:hover + label {
              color: $darker;
              transform: scale(1.5);

            }

            input[type="checkbox"]:checked + label {
              color: $darker;
              transform: scale(1.2);

            }
        }

</style>