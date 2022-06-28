<template>
  <section class="container-fluid">
    <NavBar />
    <Login />

    <div class="container-fluid bg-dark">
      <div class="container">
        <h1 class="pt-5 text-light">Nuestras Certificaciones On Line</h1>

        <div v-if="mostrarExamenes.length">
          <div class="row">
            
              <Curso
                v-for="(curso, index) in mostrarExamenes"
                :key="index"
                :curso="curso"
                :click="botAccion"
                :botonStyle="botonStyle"
                class="col-6 col-md-4 "
              />
            
          </div>
        </div>
        <h4 v-else class="alert alert-danger text-center">
          No se encontraron Cursos
        </h4>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from "./NavBar.vue";
import Login from "./Login.vue";
import Curso from "./Curso.vue";

export default {
  name: "src-componentes-inicio",

  components: {
    NavBar,
    Login,
    Curso,
  },

  props: [],

  mounted() {
    console.log("GET EXAMENES");
    this.$store.dispatch("getCursos");
  },
  data() {
    return {
      botAccion: "Más Info",
      botonStyle: "btn bg-warning  visible ",
    };
  },
  methods: {},
  computed: {
    mostrarExamenes() {
      let examenes = this.$store.state.examenes;
      return examenes;
    },
  },
};
</script>

<style scoped lang="css">
</style>
