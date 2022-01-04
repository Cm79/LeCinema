<template>
  <div class="home">

    <div class="main">
      <div class="left">
        <h2 class="slogan">Trouvez vos films favoris</h2>
        <form @submit.prevent="SearchMovies()" class="search-box">
          <input type="text" placeholder="Rechercher un film..." v-model="search" />
          <input type="submit" value="Go" />
        </form>
      </div>

      <div class="right">
        <div class="new-movie-item" v-for="newMovie in newMoviesFull" :style="{backgroundImage:`url(${newMovie.Poster})`}" :key="newMovie.imdbID" >
          <router-link :to="'/movie/' + newMovie.imdbID">
            <p>{{ newMovie.Title }}</p>
          </router-link>
        </div>
        <h3 v-if="!movies.length" >Nouveautés {{ getMonthYear() }}</h3>
      </div>
    </div>

    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
          <router-link :to="'/movie/' + movie.imdbID">
            <div class="movie-image" :style="{backgroundImage:`url(${movie.Poster})`}">
              <p class="year">{{ movie.Year }}</p>
              <p class="title"> {{ movie.Title }}</p>
            </div>
          </router-link>
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
    <button v-if="movies.length" @click="scrollBackUp()" class="scroll-back-up"><i class="fas fa-arrow-circle-up"></i></button>
  </div>
</template>

<script>
import { ref, onBeforeMount} from "vue";
import env from "@/env.js";
import Cookies from "js-cookie";

export default {
  name: "Home",

  setup() {
    const search = ref("");
    const movies = ref([]);
    const liked = ref([]);
    const newMoviesNames = ["tt12618926", "tt11286314","tt10872600","tt10838180","tt3581652"];
    const newMoviesFull = ref([]);

    const getNewMovies = () => {
      newMoviesNames.forEach( item => {
        fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&i=${item}`) 
          .then((response) => response.json())
          .then((data) => {
            newMoviesFull.value.push(data);
          })     
      })
    }

    const SearchMovies = () => {
      const pagesOfResult = 10;
      movies.value.splice(0);
      let page = [];
      if (search.value != "") {

        for (let i = 1; i <= pagesOfResult; i++) {

        fetch(
          `https://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}&type=movie&page=${i}`
        )
          .then((response) => response.json())
          .then((data) => {
            page = data.Search;
            if (page) { 
              page.forEach( (item) => {
                if (item.Poster != "N/A" && item.Type != "N/A"){
                  movies.value.push(item);        
                  }
              })
            } else { i = pagesOfResult;}
            movies.value.sort( (a, b) => {
              return b.Year*1 - a.Year*1
              })          
            });        
        } 
      }

    }

    

    const setLikeCookie = () => {
      setTimeout(() => {
        let likedArray = JSON.parse(JSON.stringify(liked.value));
        Cookies.set("like", JSON.stringify(likedArray));
      }, 1000);
    };

    const getLikeCookie = () => {
      if (Cookies.get("like")) {
        let cookieValue = JSON.parse(Cookies.get("like"));
        liked.value = cookieValue;
      } else {
        liked.value = [];
      }
    };

    const getMonthYear = () => {
      const monthFR = {1: "Janvier", 2: "Février", 3: "Mars", 4: "Avril", 5: "Mai", 6: "Juin", 7: "Juillet", 8: "Août", 9: "Septembre", 10: "Octobre", 11: "Novembre", 12: "Décembre" }
      const date = new Date;
      const month = monthFR[date.getMonth() + 1];
      const year = " " + date.getFullYear();
      return month + year
    }

     onBeforeMount(() => {

      getNewMovies();
      getLikeCookie();
    })

    const scrollBackUp = () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
});    }


    return {
      search,
      movies,
      SearchMovies,
      liked,
      getLikeCookie,
      setLikeCookie,
      getNewMovies,
      newMoviesFull,
      getMonthYear,
      scrollBackUp

    };
  },
};
</script>


<style lang="scss">
@import "./scss/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Eczar:wght@500&display=swap");

.home {
  margin: 0;
  position: relative;

  .scroll-back-up {
    position: fixed;
    right: 30px;
    font-size: 50px;
    bottom: 30px;
    color: $darker;
    border-radius: 50% 50%;
    border: none;
    cursor: pointer;

  }

  @include sm {
    margin: 30px 0 0;
  }
  .main {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    @include lg {
      display: flex;
      justify-content: space-between;
 
    }

    .left {
      width: 100%;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      @include lg {
       width: 30%;       
      }

      .slogan {
        font-size: 55px;
        color: $darker;
        font-weight: initial;
      }

      .search-box {
        display: flex;
        align-items: center;
        position: relative;

        input {
          display: block;
          appearance: none;
          border: none;
          outline: none;
          background: none;

          &[type="text"] {
            width: 100%;
            height: 100%;
            color: $darker;
            background-color: $input;
            font-size: 20px;
            padding: 27px 20px;
            transition: 0.4s;

            &:hover {
              opacity: 0.7;
            }

            &::placeholder {
              color: $dark;
            }
          }
          &[type="submit"] {
            background-color: $dark;
            padding: 20px 25px;
            font-family: "Eczar", serif;
            color: $lighter;
            font-size: 20px;
            text-transform: uppercase;
            transition: 0.3s;

            &:hover {
              background-color: $darker;
            }

            &:active {
              opacity: 0.8;
            }
          }
        }
      }  
    }
  }

  .right {
    display: none;
    @include lg{
    height: 400px;
    width: 70%;
    margin-left: 60px ;
    border: 2px solid $lighter;
    display: flex;
    justify-content: center;
    position: relative;      
    }


    .new-movie-item {
        height: 100%;
        width: 150px;
        margin: 0 10px;
        border-radius: 5px;
        transition: ease .4s;
        background-position: center top;
        position: relative;

        &:hover {
          width: 350px;
        }

        &::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%);          
          border-radius: 5px;
        }

        p {
          width: 150px;
          padding: 40px 0 10px 20px;
          font-size: 20px;
          color: $lighter;
          position: absolute;
          bottom: 0;
          z-index: 1;
          transform: rotate(-90deg) translateY(45px);
          transform-origin: bottom left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          transition: ease .4s;
        }

        &:hover p{
          transform: rotate(0deg) translateY(0px);
          width: 100%;
      
        }
      }

      h3 {
        position: absolute;
        bottom: -50px;
        font-size: 20px;
        border-bottom: solid 3px $black;
      }
  }

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 70px 8px 0px;
    justify-content: center;

    .movie {
      width: 300px;
      border-radius: 10px;
      margin: 16px 8px;
      transition: 0.2s;
      position: relative;

      &:hover {
        box-shadow: 6px 2px 6px 2px rgba(0, 0, 0, 0.7);
      }

        .movie-image {
            display: block;
            width: 100%;
            height: 500px;
            border-radius: 5px;
            background-size: cover;
            position: relative;
            color: $lighter;
            text-decoration: none;
            
            &::after {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%);          
              border-radius: 5px;
        }

          .year {
            font-size: 20px;
            position: absolute;
            bottom: 15px;
            left: 20px;
            z-index: 1;

          }

          .title {
            font-weight: 600;
            font-size: 24px;
            position: absolute;
            bottom: 50px;
            left: 20px;
            z-index: 1;
          }
        }
          .save {
            position: absolute;
            bottom: 10px;
            right: 20px;

            input[type="checkbox"] {
              display: none;
            }

            input[type="checkbox"] + label {
              color: $lighter;
              cursor: pointer;
              font-size: 30px;
              transition: 0.2s ease-in-out;
            }

            input[type="checkbox"]:hover + label {
              color: $dark;
            }

            input[type="checkbox"]:checked + label {
              color: $light;
            }

            input[type="checkbox"]:checked:hover + label {
              color: $dark;
            }
          
        }
      }
    }
}
</style>

