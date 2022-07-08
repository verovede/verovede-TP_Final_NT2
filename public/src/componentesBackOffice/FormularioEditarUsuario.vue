<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Formulario de Modificación de Usuarios</h1>
      <div class="row">
        <div class="col-9">
          <p class="h5 mt-5">Listado de Cursos Realizados</p>
          <div
            class="media alert alert-info"
            v-for="(curso, index) in this.results"
            :key="index"
          >
            <div class="media-body">
              <div class="col-5 float-left p-2">
                {{ traerInfoCurso(curso.examen_id).name }}
              </div>
              <div class="col-3 float-left text-center p-2">
                NOTA:
                <input
                  type="text"
                  style="width: 50%"
                  class="text-center"
                  v-model="curso.number"
                />
              </div>
              <div class="col-3 float-left text-center p-2">
                Curso Pago: <input type="checkbox" v-model="curso.payment" />
              </div>
              <div class="col-1 float-left text-center p-2">
                <button
                  class="btn btn-danger"
                  @click="borrarCurso(curso.examen_id)"
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 bg-warning">
          <p class="h5 mt-5">Datos Personales</p>
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
            <button class="btn btn-info my-3 float-right" :disabled="formState.$invalid">
              Guardar
            </button>
          </vue-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBarBack from "../componentesBackOffice/NavBarBack.vue";

import { mixinsBack } from "../mixinsBack";

export default {
  mixins: [mixinsBack],
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
      let index = this.results.findIndex((curso) => curso.examen_id == id);

      this.results.splice(index, 1);
    },

    editarCurso(id, pago, nota) {
      let index = this.results.findIndex((curso) => curso.examen_id == id);
      let resultado = {
        examen_id: id,
        number: nota,
        payment: pago,
      };
      this.results.splice(index, 1, resultado);
      this.enviar();
    },

    enviar() {
      console.log({ ...this.formData });
      let usuario = {
        name: this.formData.name,
        phone: this.formData.phone,
        email: this.formData.email,
        password: this.formData.password,
        edad: this.formData.edad,
        _id: this.id,
        results: this.results,
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
        results: [],
      };
    },

    cargarForm(usuario) {
      this.formData.name = usuario.name;
      this.formData.phone = usuario.phone;
      this.formData.email = usuario.email;
      this.formData.password = usuario.password;
      this.formData.edad = usuario.edad;
      this.results = usuario.results;
      
    },

    traerInfoCurso(id) {
      const found = this.mostrarExamenes.find((curso) => curso._id === id);
      return found;
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
