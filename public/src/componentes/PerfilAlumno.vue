<template>
  <section class="container-fluid">
    <NavBar />
    <div class="container">
      <p class="h3 mt-5">{{ mostrarUsuario.name }}, Bienvenid@!</p>
      <div class="row">
        <div class="col-8">
          <h1 class="pt-2">Inscribite en Nuestros Cursos!</h1>

          <div v-if="mostrarExamenes.length">
            <div class="row">
              <Curso
                v-for="(curso, index) in mostrarExamenes"
                :key="index"
                :curso="curso"
                :click="botAccion"
                :usuario="mostrarUsuario"
                :botonStyle="compararExamen(curso._id)"
                class="col-12"
              />
            </div>
          </div>
          <h4 v-else class="alert alert-danger text-center">
            No se encontraron Cursos
          </h4>
        </div>
        <div class="col-4">
          <h1 class="pt-2">Tus datos de Perfil</h1>

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
              Actualizar Datos
            </button>
          </vue-form>
        </div>
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
      formState: {},
      formData: this.getInicialData(),
      nameMinLength: 3,
      edadMin: 18,
      edadMax: 120,
      botAccion: "Inscribirme Ahora!",
    };
  },
  methods: {
    compararExamen(id) {
      const found = this.mostrarUsuario.results.find(
        (resultado) => resultado.examen_id == id
      );

      if (found !== undefined) {
        return "btn bg-warning  invisible ";
      } else {
        return " btn bg-warning  visible ";
      }
    },
    enviar() {
      console.log({ ...this.formData });
      let usuario = {
        _id: this.formData._id,
        name: this.formData.name,
        phone: this.formData.phone,
        email: this.formData.email,
        password: this.formData.password,
        edad: this.formData.edad,
        results: this.formData.results
      };

      this.$store.dispatch("actualizarUsuario", usuario);
     

      
    },

    getInicialData() {
      return {
        _id: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        edad: "",
        results: "",
      };
    },

    cargarForm(usuario) {
      this.formData._id = usuario._id;
      this.formData.name = usuario.name;
      this.formData.phone = usuario.phone;
      this.formData.email = usuario.email;
      this.formData.password = usuario.password;
      this.formData.edad = usuario.edad;
      this.formData.results = usuario.results;
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
