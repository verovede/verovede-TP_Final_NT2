<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Listado de Usuarios</h1>

      <div v-if="mostrarUsuarios.length" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Nombre:</th>
            <th class="text-center">Teléfono</th>
            <th>Correo Electronico</th>

            <th class="text-center">Borrar Usuario</th>
            <th class="text-center">Editar Usuario</th>
          </tr>

          <tr v-for="(usuario, index) in mostrarUsuarios" :key="index">
            <td>
              {{ usuario.name }}
            </td>
            <td class="text-center">
              {{ usuario.phone }}
            </td>
            <td>
              {{ usuario.email }}
            </td>

            <td class="text-center">
              <button
                class="btn btn-danger"
                @click="borrarUsuario(usuario._id)"
              >
                Borrar
              </button>
            </td>

            <td class="text-center">
              <button
                class="btn btn-success"
                @click="editarUsuario(usuario._id)"
              >
                Editar
              </button>
            </td>
          </tr>
        </table>
      </div>

      <h4 v-else class="alert alert-danger text-center">
        No se encontraron usuarios
      </h4>
    </div>
  </section>
</template>

<script>
import NavBarBack from "../componentesBackOffice/NavBarBack.vue";
import { mixinsBack } from "../mixinsBack";

export default {
  mixins: [mixinsBack],
  name: "src-componentes-usuario",
  props: [],
  components: {
    NavBarBack,
  },
  mounted() {
    this.$store.dispatch("getUsuarios");
  },
 
  data() {
    return {
    
    };
  },
  methods: {
    borrarUsuario(id) {
      this.$store.dispatch("eliminarUsuario", id);
    },

    editarUsuario(id) {
      this.$router.push({
        path: "/editarUsuario",
        name: "editarUsuario",
        params: { id: id },
      });
    },

 
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
