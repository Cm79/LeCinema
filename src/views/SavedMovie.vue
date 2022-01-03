<template>
  <div class="container">
    <div class="if-empty" v-show="!moviesContent.length">
      <p>Vide pour le moment ...</p>
    </div>
    <div class="movie-item" v-for="movie in moviesContent" :key="movie.imdbID">
      <div class="movie-info">
        <router-link :to="'/movie/' + movie.imdbID">
          <h3 class="movie-title" :title="movie.Title">{{ movie.Title }}</h3>
        </router-link>
        <p>{{ movie.Year }} <span> - De </span>{{ movie.Director }}</p>
      </div>
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
  </div>
</template>


<script>
import { ref, onBeforeMount } from "vue";
import env from "@/env.js";
import Cookies from "js-cookie";

export default {
  setup() {
    let liked = ref([]);
    let moviesContent = ref([]);


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

    onBeforeMount(() => {
      getLikeCookie();

      for (let i = 0; i < liked.value.length; i++) {
        fetch(
          `https://www.omdbapi.com/?apikey=${env.apikey}&i=${liked.value[i]}`
        )
          .then((response) => response.json())
          .then((data) => {
            moviesContent.value.push(data);
          });
      }
    });

    return {
      liked,
      getLikeCookie,
      setLikeCookie,
      moviesContent,
    };
  },
};
</script>

<style scoped lang="scss">
@import "./scss/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Eczar:wght@500&display=swap");

.container { 
  margin: 30px 0;

  .if-empty {
    color: $darker;
    font-family: "Eczar", serif;


  }
  .movie-item {
    background: linear-gradient(90deg, rgba(24,183,190,1) 0%, rgba(23,140,164,1) 70%, rgba(7,42,64,1) 100%);    max-width: 600px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-family: "Eczar", serif;
    margin: 15px 0;

    a {
      text-decoration: none;
    }

    .movie-info {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;

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
        }
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
</style>