<template>
  <section class="container-fluid">
    <NavBarBack />
    <div class="container">
      <h1 class="mt-5">Formulario de Modificación de Cursos</h1>

      <vue-form :state="formState" @submit.prevent="enviar()">
        <!-- CAMPO NOMBRE CURSO  -->
        <validate tag="div">
          <span style="font-weight: bold">Nombre del Curso</span>
          <input
          :placeholder="mostrarCurso.name"
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
              El name debe tener entre al menos {{ nameMinLength }} caracteres.
            </div>
          </field-messages>
        </validate>
        <!-- FIN CAMPO NOMBRE CURSO  -->

        <!-- CAMPO INTRO PORTADA  -->
        <validate tag="div">
          <span style="font-weight: bold">Intro Portada</span>
          <textarea
            v-model.trim="formData.intro"
            id="intro"
            name="intro"
            type="text"
            class="form-control mb-3"
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
              <span style="font-weight: bold">Director</span>
              <input
                v-model.trim="formData.direccion"
                id="direccion"
                name="direccion"
                type="text"
                class="form-control mb-3"
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
              <span style="font-weight: bold">Duración</span>
              <input
                v-model.trim="formData.duracion"
                id="duracion"
                name="duracion"
                type="text"
                class="form-control mb-3"
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
              <span style="font-weight: bold">Url Video</span>
              <input
                v-model.trim="formData.video"
                id="video"
                name="video"
                type="text"
                class="form-control mb-3"
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
              <span style="font-weight: bold">Valor Curso</span>
              <input
                v-model.trim="formData.valor"
                id="valor"
                name="valor"
                type="number"
                class="form-control mb-3"
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
              <span style="font-weight: bold">Fecha de Inicio</span>
              <input
                v-model.trim="formData.inicio"
                id="inicio"
                name="inicio"
                type="text"
                class="form-control mb-3"
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
              <span style="font-weight: bold">URL Imagen</span>
              <input
               
                v-model.trim="formData.img"
                id="img"
                name="img"
                type="text"
                class="form-control mb-3"
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
          <span style="font-weight: bold">Información del Curso</span>
          <textarea
            v-model.trim="formData.descripcion"
            id="descripcion"
            name="descripcion"
            type="descripcion"
            class="form-control mb-3"
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

      <pre>{{formData}}</pre>
    </div>

   
  </section>
</template>

<script>
import NavBarBack from "./NavBarBack.vue";
export default {
  name: "src-componentes-formulario-editar-curso",
  props: ["id"],
  components: {
    NavBarBack,
  },

  mounted() {
   this.$store.dispatch("buscarCurso", this.id);
  },

  updated() {},

  data() {
    return {
      formState: {},
      formData: this.getInicialData(),
      nameMinLength: 3,
      edadMin: 18,
      edadMax: 120,
      introMaxLength: 100,
    };
  },

  methods: {
    enviar() {
      console.log({ ...this.formData });
      let curso = {
        name: this.formData.name,
        duracion: this.formData.duracion,
        direccion: this.formData.direccion,
        descripcion: this.formData.descripcion,
        valor: this.formData.valor,
        video: this.formData.video,
        inicio: this.formData.inicio,
        intro: this.formData.intro,
        img: this.formData.img,
        id: this.id,
      };

      this.$store.dispatch("actualizarCurso", curso);     
      this.$store.dispatch("getCursos");     
     
      this.getInicialData();
      this.formState._reset();
      
      this.$router.push({
        path: "/cursos",
      });
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

    cargarForm(curso) {
      this.formData.name = curso.name;
      this.formData.duracion = curso.duracion;
      this.formData.direccion = curso.direccion;
      this.formData.descripcion = curso.descripcion;
      this.formData.valor = curso.valor;
      this.formData.video = curso.video;
      this.formData.inicio = curso.inicio;
      this.formData.img = curso.img;
      this.formData.intro = curso.intro;
    },
  },
  computed: {
    mostrarCurso() {
      let curso = this.$store.state.examen;
      this.cargarForm(curso);
      return curso;
    },
  },
};
</script>

<style scoped lang="css">
</style>
