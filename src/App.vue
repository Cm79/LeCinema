<template>
  <header>
    <div class="logo">
      <router-link to="/">
        <h1>Le Cinéma</h1>
      </router-link>
      <div class="links">
        <a href="https://github.com/Cm79/LeCinema"><i class="fab fa-github-square"></i></a>
        <p class="api">API from <br/><a href="https://www.omdbapi.com/">omdbapi.com</a></p>        
      </div>
    </div>
    <router-link to="/saved">
      <div class="saved">
        <i class="fas fa-heart"></i>
        <p>Ma Liste</p>
      </div>
    </router-link>
  </header>

  <main>
    <router-view />
  </main>

  <footer></footer>
</template>

<style lang="scss">
@import "./scss/variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Eczar:wght@500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Verdana", sans-serif;
  background-color: $lighter;
}

a {
  text-decoration: none;
}

header {
  font-family: "Eczar", serif;
  padding: 30px 30px 15px;
  background-color: $lighter;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;

  .logo {

    h1 {
      color: $darker;
      font-size: 32px;
      line-height: .7;
      text-shadow: 0 .8px 0 #ccc,
      0 1.6px 0 #c9c9c9,
      0 2.4px 0 #bbb,
      0 3.2px 0 #b9b9b9,
      0 4px 0 #aaa,
      }

      .links {

        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 10px;

        p { 
          font-size: 14px;
          line-height: 1.2;

          a {
            color: $darker;
            text-shadow: 0 .8px 0 #ccc,
              0 1.6px 0 #c9c9c9,
              0 2.4px 0 #bbb,      
          }
        }

        .fa-github-square {
          font-size: 30px;
          color: $darker;
        }
      }

  }

  .saved {
    font-size: 20px;
    color: $dark;
    text-align: center;
    transition: .3s ease-in-out;

  // min-width: Large smartphones (576px)
    @include sm {
      display: flex;   
      justify-content: space-between;
      align-items: center;
      }  

      &:hover {
        color: $darker;
      }

     .fa-heart {
      margin: 0 10px;
      font-size: 30px;


    }
  }
}
</style>
