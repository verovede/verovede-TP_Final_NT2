<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Formulario de Ingreso de Usuarios</h1>

      <vue-form :state="formState" @submit.prevent="enviar()">
        <!-- CAMPO name  -->
        <validate tag="div">
          <input
            placeholder="Nombre y Apellido"
            v-model.trim="formData.name"
            id="name"
            name="name"
            type="text"
            class="form-control mt-3"
            autocomplete="off"
            required
            :minlength="nameMinLength"
          />

          <field-messages name="name" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
            <div class="alert alert-danger mt-1" slot="minlength">
              El name debe tener entre al menos {{ nameMinLength }} caracteres.
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO name  -->

        <!-- CAMPO EDAD  -->
        <validate tag="div">
          <input
            placeholder="Edad"
            v-model.trim="formData.edad"
            id="edad"
            name="edad"
            type="number"
            class="form-control mt-3"
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
          <input
            placeholder="Teléfono"
            v-model.trim="formData.phone"
            id="phone"
            name="phone"
            type="text"
            class="form-control mt-3"
            autocomplete="off"
            required
          />

          <field-messages name="phone" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO TELEFONO  -->

        <!-- CAMPO CORREO  -->
        <validate tag="div">
          <input
            placeholder="Correo Eléctronico"
            v-model.trim="formData.email"
            id="email"
            name="email"
            type="email"
            class="form-control mt-3"
            autocomplete="off"
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

        <!-- CAMPO PASS  -->
        <validate tag="div">
          <input
            placeholder="Contraseña"
            v-model.trim="formData.password"
            id="password"
            name="password"
            type="text"
            class="form-control mt-3"
            autocomplete="off"
            required
          />

          <field-messages name="password" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO PASS  -->

        <!-- ENVIO -->
        <button class="btn btn-info my-3" :disabled="formState.$invalid">
          Enviar
        </button>
      </vue-form>

      <div
        class="modal"
        tabindex="-1"
        role="dialog"
        :style="{ display: mostrarDisplay() }"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">ERROR!</h5>
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
              <p>Usuario ya registrado con ese Correo Electronico!</p>
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
  </section>
</template>

<script>
import NavBarBack from "../componentesBackOffice/NavBarBack.vue";
export default {
  name: "src-componentes-formulario",
  props: [],
  components: {
    NavBarBack,
  },
  mounted() {},
  data() {
    return {
      formState: {},
      formData: this.getInicialData(),
      nameMinLength: 3,
      edadMin: 18,
      edadMax: 120,
      checkPass: "",
      modalShow: false,
    };
  },
  methods: {
    async enviar() {
      console.log({ ...this.formData });
      const usuario = {
        name: this.formData.name,
        edad: this.formData.edad,
        email: this.formData.email,
        phone: this.formData.phone,
        password: this.formData.password,
      };
      console.log("POST USUARIOS");
      const resu = await this.$store.dispatch("agregarUsuario", usuario);

      if (resu) {
        this.formData = this.getInicialData();
        this.formState._reset();
        this.$router.push({
          path: "/usuarios",
        });
      } else {
        console.log("ERROR DE REGISTRO!");
        this.modalShow = true;
      }
    },

    getInicialData() {
      return {
        name: "",
        edad: "",
        email: "",
        phone: "",
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
  },
  computed: {},
};
</script>

<style scoped lang="css">

</style>