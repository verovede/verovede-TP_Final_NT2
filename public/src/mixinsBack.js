export const mixinsBack = {

    methods: {
        async login() {
            console.log("ENTRO AL METODO LOGIN DEL BACKOFFICE");
            let usuario = {
                email: this.formData.email,
                password: this.formData.password,
            };

            let resu = await this.$store.dispatch("loguearUsuario", usuario);

            if (resu) {
                this.visible = true
                this.$router.push({
                    path: "/usuarios",


                });
                console.log("Que esta mandando?", this.formData.email);
            } else {
                console.log("ERROR DE REGISTRO!");
                this.modalShow = true;
            }
        },

       
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
           
            console.log("usuarios" , usuarios)
            return usuarios;
          },

          mostrarCurso() {
            let curso = this.$store.state.examen;           
            return curso;
          },
    }
}