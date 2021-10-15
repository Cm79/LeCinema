<template>
  <div class="home">
    <form @submit.prevent="SearchMovies()" class="search-box">
      <input type="text" placeholder="Rechercher un film" v-model="search" />
      <input type="submit" value="Rechercher" />
    </form>

    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <!-- <router-link :to="'/movie/' + movie.imdbID" class="movie-link"> -->
        <div class="movie-link">
          <div class="product-image">
            <img :src="movie.Poster" alt="Movie Poster" />
            <div class="save">
              <input
                type="checkbox"
                name="checkbox"
                :id="movie.imdbID"
                :value="movie.imdbID"
                v-model="liked"
              />
              <label :for="movie.imdbID"><i class="fas fa-heart"></i></label>
            </div>
          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
          </div>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import env from "@/env.js";

export default {
  setup() {
    const search = ref("bach");
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

    return {
      search,
      movies,
      SearchMovies,
      liked,
    };
  },
};
</script>


<style lang="scss">
@import "./scss/variables.scss";

.home {
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;

      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: $lighter;
        margin-bottom: 16px;
      }

      p {
        color: $lighter;
      }
    }
  }

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
        padding: 16px;
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
      max-width: 19%;
      flex: 1 1 20%;
      margin: 16px 8px;
      transition: 0.2s;

      &:hover {
        box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.7);
      }
      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;
        user-select: none;

        .product-image {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
            height: 500px;
            object-fit: cover;
          }

          .save {
            position: absolute;
            width: 70px;
            height: 70px;
            background-color: $darker;
            color: $lighter;
            bottom: 16px;
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

            input[type="checkbox"]:checked + label {
              color: $light;
              font-size: 37px;
              top: 13px;
              left: 17px;
            }
          }
        }

        .detail {
          background-image: linear-gradient($light, $dark, $darker);
          padding: 16px 8px;
          flex: 1 1 100%;

          .year {
            color: $darker;
            font-size: 14px;
          }

          h3 {
            color: $lighter;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>

