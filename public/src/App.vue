<template>
  <div class="container-fluid">
    <Header />
 <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./componentes/Header.vue";
import Footer from "./componentes/Footer.vue";

export default {
  name: "App",
  components: {
    Header,

    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container-fluid {
  padding-right: 0px !important ;
  padding-left: 0px !important;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.bg-tag {
  background: darkcyan;
}

.cajaCurso {
  background: black;
  height: 320px;
  color: white;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
