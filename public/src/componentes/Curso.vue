<template>
  <section class="container">
    <div class="w-100 p-3">
      <div class="cajaCurso rounded p-3" :style="getBg(curso.img)">
        <div class="bg-info p-2 text-center font-weight-bold">
          Certificación On Line
        </div>

        <p class="h5 pt-2"> {{ curso.name }}</p>

        <p class="h6 pt-1"> Dirección: {{ curso.direccion }}</p>
         
        <p class="w-100 pt-1">Fecha de Inicio: {{ curso.inicio }}</p>

        <p class="w-100">{{ curso.intro }}</p>
      
        <div class="text-center float left">
          <button :class="botonStyle" @click="accionBoton(curso._id)">
            {{ click }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-componentes-curso",
  props: ["curso", "click", "usuario", "botonStyle"],
  mounted() {},
  data() {
    return {};
  },
  methods: {
    getBg(img) {
      return `background-image: url("img/${img}")`;
    },

    accionBoton(id) {
      if (this.click === "Más Info") {
         console.log('Mas info', id);
         this.$router.push({
          path: "/cursoDetalle",
          name: "cursoDetalle",
          params: { id: id },          
        });

      }
      if(this.click === "Inscribir") {
        console.log('Inscribir', id);
      let datos = {
        idUsuario: this.usuario._id,
        examen_id: id,
        payment: true,
        number: 8,
      };
      console.log("datos", datos);
      this.$store.dispatch("inscribirACurso", datos);

      }
    },

    inscribir(id) {
      console.log(id);
      let datos = {
        idUsuario: this.usuario._id,
        examen_id: id,
        payment: true,
        number: 8,
      };
      console.log("datos", datos);
      this.$store.dispatch("inscribirACurso", datos);
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
