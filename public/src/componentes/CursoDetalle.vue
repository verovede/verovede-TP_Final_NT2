<template>
  <section class="container-fluid">
    <NavBar />
    <div class="container">
      <h1>{{ mostrarCurso.name }}</h1>

      <div class="row">
        <div class="col-8">
          <p class="h5 pt-2">{{ mostrarCurso.descripcion }}</p>

          <div class="pt-2">
            <iframe
              width="100%"
              height="400"
              :src="mostrarCurso.video"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div class="col-4 bg-warning">
          <p class="h4 pt-2">Dirección: {{ mostrarCurso.direccion }}</p>

          <p class="w-100 pt-1">Fecha de Inicio: {{ mostrarCurso.inicio }}</p>

          <p class="w-100">Duración: {{ mostrarCurso.duracion }}</p>

          <p class="w-100">Valor: {{ mostrarCurso.valor }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from "./NavBar.vue";
export default {
  name: "src-componentes-curso-detalle",
  components: { NavBar },
  props: ["id"],
  mounted() {
    console.log("MOUNTED BUSCAR USUARIO");
    this.$store.dispatch("buscarCurso", this.id);
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    mostrarCurso() {
      let curso = this.$store.state.examen;
      console.log("examen", curso);
      return curso;
    },
  },
};
</script>

<style scoped lang="css">
</style>
