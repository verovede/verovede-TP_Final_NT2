<template>
  <section class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-8 pt-3 pl-5 pr-5 pb-3">
          <p class="h4 pt-5">Una amplia selección de cursos</p>
          <p class="h5">Crea sitios web y aplicaciones con el desarrollo web</p>
          <p class="">
            El mundo del desarrollo web es tan amplio como la propia Internet.
            Gran parte de nuestra vida social y profesional se desarrolla en
            Internet, lo que ha fomentado la creación de nuevas industrias
            encaminadas a crear, administrar y depurar los sitios web y las
            aplicaciones de los que dependemos en cada vez mayor medida..
          </p>
        </div>
        <div class="col-4 pt-3 pl-5 pr-5 pb-3 bg-warning">
          <vue-form :state="formState" @submit.prevent="login()">
            <h4 class="pt-5">Ingreso a Usuarios Registrados</h4>
            <!-- CAMPO CORREO  -->
            <validate tag="div">
              <input
                placeholder="Correo Eléctronico"
                v-model.trim="formData.email"
                id="email"
                name="email"
                type="email"
                class="form-control mt-3"
                autocomplete="on"
                required
              />

              <field-messages name="email" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
                <div class="alert alert-danger mt-1" slot="email">
                  El correo ingresado es inválido.
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO CORREO  -->

            <!-- CAMPO CORREO  -->
            <validate tag="div">
              <input
                placeholder="Contraseña"
                v-model.trim="formData.password"
                id="password"
                name="password"
                type="password"
                class="form-control mt-3"
                autocomplete="off"
                required
              />

              <field-messages name="password" show="$dirty">
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
            <button
              class="btn btn-info my-3 float-right"
              :disabled="formState.$invalid"
            >
              Enviar
            </button>
          </vue-form>
        </div>

        <!-- MODAL -->
        <div
          class="modal"
          tabindex="-1"
          role="dialog"
          :style="{ display: mostrarDisplay() }"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Mail o Contraseña Incorrecta!</p>
              </div>
              <div class="modal-footer">
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="modalShow = false"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-login",
  props: [],
  mounted() {},
  data() {
    return {
      formState: {},
      formData: this.getInicialData(),
      email: "",
      password: "",
      modalShow: false,
    };
  },
  methods: {
    getInicialData() {
      return {
        email: "",
        password: "",
      };
    },

    mostrarDisplay() {
      let estilo = "none";

      if (this.modalShow) {
        estilo = "inline";
        console.log("entre por true");
      }
      return estilo;
    },

    async login() {
      console.log("ENTRO AL METODO LOGIN");
      let usuario = {
        email: this.formData.email,
        password: this.formData.password,
      };

      let resu = await this.$store.dispatch("loguearUsuario", usuario);

      if (resu) {
        this.$router.push({
          path: "/perfilAlumno",
          name: "perfilAlumno",
          params: { email: this.formData.email },
        });
        console.log("Que esta mandando?", this.formData.email);
      } else {
        console.log("ERROR DE REGISTRO!");
        this.modalShow = true;
      }
    },
  },

  computed: {},
};
</script>

<style scoped lang="css">
</style>
