<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Listado de Cursos</h1>

      <div v-if="mostrarCursos.length" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Nombre:</th>
            <th>Dirección</th>
            <th>Duración</th>
            <th>Fecha</th>
            <th>Precio</th>

            <th class="text-center">Borrar Curso</th>
            <th class="text-center">Editar Curso</th>
          </tr>

          <tr v-for="(curso, index) in mostrarCursos" :key="index">
            <td>
              {{ curso.name }}
            </td>
            <td class="text-center">
              {{ curso.direccion }}
            </td>
            <td>
              {{ curso.duracion }}
            </td>
            <td>
              {{ curso.inicio }}
            </td>
            <td>
              {{ curso.valor }}
            </td>

            <td class="text-center">
              <button class="btn btn-danger" @click="borrarCurso(curso._id)">
                Borrar
              </button>
            </td>

            <td class="text-center">
              <button class="btn btn-success" @click="editarCurso(curso._id)">
                Editar
              </button>
            </td>
          </tr>
        </table>
      </div>

      <h4 v-else class="alert alert-danger text-center">
        No se encontraron cursos
      </h4>
    </div>
  </section>
</template>

<script>
import NavBarBack from "./NavBarBack.vue";

export default {
  name: "src-componentes-curso",
  props: [],
  components: {
    NavBarBack,
  },

  mounted() {
    this.$store.dispatch("getCursos");
  },

  data() {
    return {
     
    };
  },
  methods: {
    borrarCurso(id) {
      this.$store.dispatch("borrarCurso", id);
    },

    editarCurso(id) {
      this.$router.push({
        path: "/editarCurso",
        name: "editarCurso",
        params: { id: id },
      });
    },

    
  },
  computed: {
    

    mostrarCursos() {
      let examenes = this.$store.state.examenes;
    
      return examenes;
    },
  },
};
</script>

<style scoped lang="css">
</style>
