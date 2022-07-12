export const mixinsBack = {

  methods: {

  },

  computed: {
    mostrarExamen() {
      console.log("MIXIN BACKOFFICE MOSTRAR EXAMEN")
      let curso = this.$store.state.examen;
      this.cargarForm(curso);
      return curso;
    },

    mostrarUsuario() {
      console.log("MIXIN BACKOFFICE MOSTRAR USUARIO")
      let usuario = this.$store.state.usuario;
      this.cargarForm(usuario);
      return usuario;
    },

    mostrarExamenes() {
      console.log("MIXIN BACKOFFICE MOSTRAR EXAMENES")
      let examenes = this.$store.state.examenes;
      return examenes;
    },
    mostrarUsuarios() {
      console.log("MIXIN BACKOFFICE MOSTRAR USUARIOS")
      let usuarios = this.$store.state.usuarios;
      return usuarios;
    },

    mostrarCurso() {
      let curso = this.$store.state.examen;
      return curso;
    },
  }
}