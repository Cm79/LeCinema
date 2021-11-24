<template>
  <header>
    <router-link to="/">
      <h1>Le Cinéma</h1>
    </router-link>
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
  padding: 10px 25px;
  background-color: $lighter;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;


  h1 {
    color: $darker;
    font-size: 32px;
    text-shadow: 0 .8px 0 #ccc,
    0 1.6px 0 #c9c9c9,
    0 2.4px 0 #bbb,
    0 3.2px 0 #b9b9b9,
    0 4px 0 #aaa,
    }

  .saved {
    padding: 10px;
    font-size: 20px;
    color: $dark;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: .3s ease-in-out;

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
