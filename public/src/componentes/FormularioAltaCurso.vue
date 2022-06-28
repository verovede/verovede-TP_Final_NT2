<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Formulario de Ingreso de Cursos</h1>

      <vue-form :state="formState" @submit.prevent="enviar()">
        <!-- CAMPO NOMBRE CURSO  -->
        <validate tag="div">
          <input
            placeholder="Nombre del Curso"
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
        <!-- FIN CAMPO NOMBRE CURSO  -->

        <!-- CAMPO INTRO PORTADA  -->
        <validate tag="div">
          <textarea
            placeholder="Intro Portada"
            v-model.trim="formData.intro"
            id="intro"
            name="intro"
            type="text"
            class="form-control mt-3"
            autocomplete="off"
            required
            :maxlength="introMaxLength"
          />

          <field-messages name="intro" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
            <div class="alert alert-danger mt-1" slot="minlength">
              Llego al máximo de caracteres permitidos:{{ introMaxLength }}.
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO INTRO -->
        <div class="row">
          <div class="col-6">
            <!-- CAMPO DIRECCION  -->
            <validate tag="div">
              <input
                placeholder="Dirección"
                v-model.trim="formData.direccion"
                id="direccion"
                name="direccion"
                type="text"
                class="form-control mt-3"
                autocomplete="off"
                required
              />

              <field-messages name="direccion" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO DIRECCION  -->

            <!-- CAMPO DURACION  -->
            <validate tag="div">
              <input
                placeholder="Duración"
                v-model.trim="formData.duracion"
                id="duracion"
                name="duracion"
                type="text"
                class="form-control mt-3"
                autocomplete="off"
                required
              />

              <field-messages name="duracion" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO DURACION  -->
            <!-- CAMPO LINK VIDEO  -->
            <validate tag="div">
              <input
                placeholder="URL video"
                v-model.trim="formData.video"
                id="video"
                name="video"
                type="text"
                class="form-control mt-3"
                autocomplete="off"
                required
              />

              <field-messages name="video" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO LINK VIDEO  -->
          </div>
          <div class="col-6">
            <!-- CAMPO VALOR  -->
            <validate tag="div">
              <input
                placeholder="Valor del Curso"
                v-model.trim="formData.valor"
                id="valor"
                name="valor"
                type="number"
                class="form-control mt-3"
                autocomplete="off"
                required
              />

              <field-messages name="valor" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO VALOR  -->

            <!-- CAMPO INICIO  -->
            <validate tag="div">
              <input
                placeholder="Fecha de Inicio"
                v-model.trim="formData.inicio"
                id="inicio"
                name="inicio"
                type="text"
                class="form-control mt-3"
                autocomplete="off"
                required
              />

              <field-messages name="inicio" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO INICIO -->
            <!-- CAMPO LINK IMG  -->
            <validate tag="div">
              <input
                placeholder="URL Imagen"
                v-model.trim="formData.img"
                id="img"
                name="img"
                type="text"
                class="form-control mt-3"
                autocomplete="off"
                required
              />

              <field-messages name="img" show="$dirty">
                <div class="alert alert-danger mt-1" slot="required">
                  Campo obligatorio
                </div>
              </field-messages>
            </validate>
            <!-- FIN CAMPO LINK IMG  -->
          </div>
        </div>

        <!-- CAMPO DESCRIPCION  -->
        <validate tag="div">
          <textarea
            placeholder="Descripción del Curso"
            v-model.trim="formData.descripcion"
            id="descripcion"
            name="descripcion"
            type="descripcion"
            class="form-control mt-3"
            autocomplete="off"
            required
          ></textarea>

          <field-messages name="descripcion" show="$dirty">
            <div class="alert alert-danger mt-1" slot="required">
              Campo obligatorio
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO DESCRIPCION  -->

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
              <p>Usuario ya registrado!</p>
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
import NavBarBack from "./NavBarBack.vue";
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
      introMaxLength: 100,
    };
  },
  methods: {
    async enviar() {
      console.log({ ...this.formData });
      const curso = {
        name: this.formData.name,
        duracion: this.formData.duracion,
        direccion: this.formData.direccion,
        descripcion: this.formData.descripcion,
        valor: this.formData.valor,
        video: this.formData.video,
        inicio: this.formData.inicio,
        intro: this.formData.intro,
        img: this.formData.img,
      };
      console.log("POST USUARIOS");
      const resu = await this.$store.dispatch("agregarCurso", curso);

      if (resu) {
        this.formData = this.getInicialData();
        this.formState._reset();
        this.$router.push({
          path: "/cursos",
        });
      } else {
        console.log("ERROR DE REGISTRO!");
        this.modalShow = true;
      }
    },

    getInicialData() {
      return {
        name: "",
        duracion: "",
        direccion: "",
        descripcion: "",
        valor: "",
        video: "",
        inicio: "",
        intro: "",
        img: "",
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
</style>