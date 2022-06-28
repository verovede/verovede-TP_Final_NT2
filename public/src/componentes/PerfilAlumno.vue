<template>
  <section class="container-fluid">
    <NavBar />
    <div class="container">
      <p class="h3 mt-5">{{ mostrarUsuario.name }}, Bienvenid@!</p>
      
    </div>

    <div class="container-fluid bg-dark">
      <div class="container">
        <h1 class="pt-2 text-white">Anotate!</h1>

        <div v-if="mostrarExamenes.length">
          <div class="row">
            <Curso
              v-for="(curso, index) in mostrarExamenes"
              :key="index"
              :curso="curso"
              :click="botAccion"
              :usuario="mostrarUsuario"
              :botonStyle="compararExamen(curso._id)"
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
import Curso from "./Curso.vue";
import NavBar from "./NavBar.vue";

export default {
  name: "src-componentes-perfil-alumno",
  components: { NavBar, Curso },
  props: ["email"],
  mounted() {
    console.log("MOUNTED BUSCAR USUARIO");
    this.$store.dispatch("buscarUsuarioPorMail", this.email);

    console.log("GET EXAMENES");
    this.$store.dispatch("getCursos");
  },
  data() {
    return {
      botAccion: "Inscribir",
    };
  },
  methods: {
    compararExamen(id) {
      const found = this.mostrarUsuario.results.find(
        (resultado) => resultado.examen_id == id
      );

      console.log("funciona al menos?", found, id);

      if (found !== undefined) {
        console.log("lo tiene", found);
        return "btn bg-warning  invisible ";
      } else {
        console.log("no lo tiene");
        return " btn bg-warning  visible ";
      }
    },
  },
  computed: {
    mostrarUsuario() {
      let usuario = this.$store.state.usuario;
      console.log("usuario", usuario);
      return usuario;
    },

    mostrarExamenes() {
      let examenes = this.$store.state.examenes;
      return examenes;
    },
  },
};
</script>

<style scoped lang="css">
</style>
