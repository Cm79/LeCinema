<template>
  <header>
    <div class="menu">
      <router-link to="/">
        <h1 class="logo">Le Cinéma</h1>
      </router-link>
        <p class= "links github"><a href="https://github.com/Cm79/LeCinema" target="_blank" rel="noopener noreferrer">Code sur github.com</a></p>
        <p class= "links api"><a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">API de omdbapi.com</a></p>        
    </div>
    <router-link to="/saved">
      <div class="saved">
        <i class="fas fa-heart"></i>
        <p>Mes favoris</p>
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
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

body {
    background-color: $lighter;
    font-family: "Oswald", sans-serif;
    letter-spacing: 1.5px;
    margin: 0 10px;
    @include md{
    margin: 0 30px;
    }
    @include lg {
    margin: 0 100px;      
    }
    


}

header {
  padding: 30px 0 15px;
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: $black;
  }

  .menu {
    @include lg { 
      display: flex;
      align-items: center;
    }

    .logo {
      margin-right: 30px; 
      font-size: 25px;
      text-transform: uppercase;
      text-shadow: 0 .8px 0 #ccc,
      0 1.6px 0 #c9c9c9,
      0 2.4px 0 #bbb,
      0 3.2px 0 #b9b9b9,
      0 4px 0 #aaa;

    }

    .links {
      display: none;
      // min-width: small tablets (768px)
    @include lg {
      display: block;
      font-size: 18px;
      margin: 15px 0 0 20px; 
      padding-bottom: 5px;
      transition: .3s ease; 
      border-bottom: solid 3px $lighter;
    }

      &:hover {
        border-color: $black;

      }
    }
  }


  .saved {
    font-size: 18px;
    padding: 12px 20px 14px 18px;
    border-radius: 10px;
    color: $lighter;
    background-color: $darker;
    transition: 200ms ease 0s;
    display: flex;   
    justify-content: space-between;
    align-items: center;

    p {
      display: none;

      @include sm {
        display: block;
        margin-left: 15px;
      }
    }

     .fa-heart {
      font-size: 20px;
    }

      &:hover {
        transform: translateY(-4px);
      }
  }
}

/***   // min-width: Large smartphones (576px)
    @include sm {
      display: flex;   
      justify-content: space-between;
      align-items: center;
      }  
**/



</style>
