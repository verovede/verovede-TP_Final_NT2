<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Formulario de Modificación de Usuarios</h1>

      <vue-form :state="formState" @submit.prevent="enviar()">
        <!-- CAMPO name  -->

        <validate tag="div">
          <span style="font-weight: bold">Nombre y apellido</span>
          <input
            v-model.trim="formData.name"
            id="name"
            name="name"
            type="text"
            class="form-control mb-3"
            autocomplete="off"
            required
            :minlength="nameMinLength"
          />

          <field-messages name="name" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
            <div class="alert alert-danger mt-1" slot="minlength">
              El nombre debe tener al menos {{ nameMinLength }} caracteres.
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO name  -->

        <!-- CAMPO EDAD  -->
        <validate tag="div">
          <span style="font-weight: bold">Edad</span>
          <input
            v-model.trim="formData.edad"
            id="edad"
            name="edad"
            type="number"
            class="form-control mb-3"
            autocomplete="off"
            required
            :min="edadMin"
            :max="edadMax"
          />

          <field-messages name="edad" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
            <div class="alert alert-danger mt-1" slot="min">
              La edad debe ser entre {{ edadMin }} y {{ edadMax }} años.
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO EDAD  -->

        <!-- CAMPO TELEFONO  -->

        <validate tag="div">
          <span style="font-weight: bold">Teléfono</span>
          <input
            :placeholder="mostrarUsuario.phone"
            v-model.trim="formData.phone"
            id="phone"
            name="phone"
            type="text"
            class="form-control mb-3"
            autocomplete="off"
            required
          />

          <field-messages name="phone" show="$dirty">
            <div class="alert alert-success mt-1">Perfecto!</div>
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO TELEFONO  -->

        <!-- CAMPO CORREO  -->

        <validate tag="div">
          <span style="font-weight: bold">Correo Eléctronico</span>
          <input
            :placeholder="mostrarUsuario.email"
            v-model.trim="formData.email"
            id="email"
            name="email"
            type="email"
            class="form-control mb-3"
            autocomplete="off"
            required
          />

          <field-messages name="email" show="$dirty">
            <div class="alert alert-success mt-1">Perfecto!</div>
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
            <div class="alert alert-danger mt-1" slot="email">
              El correo ingresado es inválido.
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO CORREO  -->

        <!-- ENVIO -->
        <button class="btn btn-info my-3" :disabled="formState.$invalid">
          Enviar
        </button>
      </vue-form>
    </div>

    <div class="container">
      <h1 class="mt-5">Listado de Cursos Realizados</h1>

      <div v-if="mostrarUsuario.results" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Nombre:</th>
            <th class="text-center">Pago</th>
            <th class="text-center">Nota</th>

            <th class="text-center">Borrar Usuario</th>
            <th class="text-center">Editar Usuario</th>
          </tr>

          <tr v-for="(curso, index) in mostrarUsuario.results" :key="index">
            <td>
              {{ traerInfoCurso(curso.examen_id).name }}
            </td>
            <td class="text-center">
              {{ curso.payment ? "Si" : "No" }}
            </td>
            <td class="text-center">
              {{ curso.number }}
            </td>

            <td class="text-center">
              <button class="btn btn-danger" @click="borrarCurso(curso.examen_id)">
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
        No se encontraron cursos para este Usuario
      </h4>
    </div>
  </section>
</template>

<script>
import NavBarBack from "./NavBarBack.vue";
export default {
  name: "src-componentes-formulario-editar-usuario",
  props: ["id"],
  components: {
    NavBarBack,
  },

  mounted() {
    console.log("MOUNTED BUSCAR USUARIO");
    this.$store.dispatch("buscarUsuarioPorId", this.id);
    console.log("GET EXAMENES");
    this.$store.dispatch("getCursos");
  },

  updated() {},

  data() {
    return {
      formState: {},
      formData: this.getInicialData(),
      nameMinLength: 3,
      edadMin: 18,
      edadMax: 120,
    };
  },

  methods: {
    borrarCurso(id) {
       let datos = {
        usuario: this.id,
        curso: id,
      };
     
      console.log("borrarCursoAlumno", datos)
      this.$store.dispatch("borrarCursoAlumno", datos);
    },

    enviar() {
      console.log({ ...this.formData });
      let usuario = {
        name: this.formData.name,
        phone: this.formData.phone,
        email: this.formData.email,
        password: this.formData.password,
        edad: this.formData.edad,
        id: this.id,
      };

      this.$store.dispatch("actualizarUsuario", usuario);
      this.getInicialData();
      this.formState._reset();

      this.$router.push({
        path: "/usuarios",
      });
    },

    getInicialData() {
      return {
        name: "",
        phone: "",
        email: "",
        password: "",
        edad: "",
        results: "",
      };
    },

    cargarForm(usuario) {
      this.formData.name = usuario.name;
      this.formData.phone = usuario.phone;
      this.formData.email = usuario.email;
      this.formData.password = usuario.password;
      this.formData.edad = usuario.edad;
      this.formData.results = usuario.results;
    },

    traerInfoCurso(id) {
      const found = this.mostrarExamenes.find((curso) => curso._id === id);
      console.log("trae algo?", found, id);
      return found;
    },
  },
  computed: {
    mostrarUsuario() {
      let usuario = this.$store.state.usuario;
      this.cargarForm(usuario);

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
