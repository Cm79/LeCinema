<template>
  <div class="home">
    <form @submit.prevent="SearchMovies()" class="search-box">
      <input type="text" placeholder="Rechercher un film" v-model="search" />
      <input type="submit" value="Rechercher" />
    </form>

    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
          <div class="movie-link">
          <router-link :to="'/movie/' + movie.imdbID">
            <div class="product-image">
              <img :src="movie.Poster" alt="Poster not found"/>
            </div>
          </router-link>

          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
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
        </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import env from "@/env.js";
import Cookies from 'js-cookie';


export default {

  name: 'Home',

  setup() {
    const search = ref("spiderman");
    const movies = ref([]);
    const liked = ref([]);


    const SearchMovies = () => {
      if (search.value != "") {
        fetch(
          `http://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}&type=movie`
        )
          .then((response) => response.json())
          .then((data) => {
            movies.value = data.Search;
          });
      }
    };

    
    const setLikeCookie = () => {
      setTimeout( () => {
            let likedArray = JSON.parse(JSON.stringify(liked.value));
            Cookies.set('like', JSON.stringify(likedArray));

      }, 1000);
    };

    const getLikeCookie = () => {
      let cookieValue = JSON.parse(Cookies.get('like'));
      liked.value = (cookieValue ? cookieValue : []) ;
    };

    
    onMounted(getLikeCookie);

      

    return {
      search,
      movies,
      SearchMovies,
      liked,
      getLikeCookie,
      setLikeCookie
    };
  },
};
</script>


<style lang="scss">
@import "./scss/variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Eczar:wght@500&display=swap');


.home {
  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    background-image: linear-gradient($light, $dark, $darker);

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: $dark;
        background-color: $lighter;
        font-size: 20px;
        padding: 10px 16px;
        margin-bottom: 15px;
        transition: 0.4s;

        &:hover {
          opacity: 0.9;
        }

        &::placeholder {
          color: $light;
        }
      }
      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: $lighter;
        padding: 12px;
        font-family: "Eczar", serif;
        color: $dark;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.3s;

        &:hover {
          opacity: 0.8;
        }

        &:active {
          opacity: 0.5;
        }
      }
    }
  }


  .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;

    .movie {
      width: 23.5%;
      margin: 16px 8px;
      transition: 0.2s;
      box-sizing: border-box;

      &:hover {
        box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.7);
      }
      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;
        user-select: none;

        .product-image {
          display: block;

          img {
            display: block;
            width: 100%;
            height: 500px;
            object-fit: cover;
          }


        }

        .detail {
          background-image: linear-gradient($light, $dark, $darker);
          padding: 16px 8px;
          flex: 1 1 100%;
          position: relative;
          font-family: "Verdana", sans-serif;

          .year {
            color: $darker;
            font-size: 14px;
          }

          h3 {
            color: $lighter;
            font-weight: 600;
            font-size: 18px;
          }

          .save {
            position: absolute;
            width: 70px;
            height: 70px;
            background-color: $darker;
            color: $lighter;
            top: -100px;
            right: 20px;
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
              top: 20px;
              left: 22px;
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
        }

      }
    }
    }
  }
}
</style>

