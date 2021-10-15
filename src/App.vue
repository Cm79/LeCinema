<template>
  <header>
    <router-link to="/">
      <h1>Le<span>Cinéma</span></h1>
    </router-link>
  </header>

  <main>
    <router-view />
  </main>

  <footer></footer>
</template>

<style lang="scss">
@import "./scss/variables.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Verdana", sans-serif;
}

body {
  background-color: $lighter;
}

a {
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background-color: $lighter;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);

  h1 {
    color: $light;
    font-size: 28px;

    span {
      color: $darker;
    }
  }
}
</style>
