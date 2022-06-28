//importar la dependecia de vue
import Vue from 'vue'

//importar la dependecia de Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'



console.log("process.env.NODE_ENV " + process.env.NODE_ENV)

const url = (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080') + '' // desarrollo + producción

/* 
const url = 'https://627bf2b3b54fe6ee00919ac6.mockapi.io/usuario/'

const url = 'http://localhost:8080/usuarios/' */



export default new Vuex.Store({
    state: {
        usuarios: [],
        examenes: [],
        usuario: '',
        examen: '',


    },

    getters: {
        cursos: state => state.examenes

    },

    actions: {
        //APIS USUARIOS//
        async getUsuarios({ commit }) {
            try {
                const usuarios = await axios.get(url + "/api/usuarios")
                commit('GET_Usuarios', usuarios.data)

            }
            catch (error) {
                alert(error)

            }
        },

        async eliminarUsuario({ commit }, id) {
            try {
                const { data: usuario } = await axios.delete(url + "/api/usuarios/" + id)
                console.log(usuario)
                commit('DELETE_Usuario', usuario)
                return true

            }
            catch (error) {
                alert(error)
                console.log('ENTRA ACA', error)
            }
        },

        async agregarUsuario({ commit }, usuarioNuevo) {
            try {
                const { data: usuario } = await axios.post(url + "/api/usuarios", usuarioNuevo, { 'content-type': 'application/json' })
                commit('POST_Usuario', usuario)
                return true

            }
            catch (error) {
                //alert(error)                
                return false
            }
        },

        async actualizarUsuario({ commit }, usuarioAModificar) {

            try {
                const { data: usuario } = await axios.put(url + "/api/usuarios/" + usuarioAModificar.id,
                    usuarioAModificar,
                    { 'content-type': 'application/json' }
                )
                commit('PUT_Usuario', usuario)

            }
            catch (error) {
                alert(error)
                console.log('Error en putUsuario ', error)
            }
        },

        async buscarUsuarioPorId({ commit }, id) {
            try {
                const { data: usuario } = await axios.get(url + "/api/usuarios/consultarUsuario/" + id)
                commit('SET_USUARIO', usuario)

            }
            catch (error) {
                alert(error)
            }
        },

        async loguearUsuario({ commit }, credenciales) {
            try {
                const { data: usuario } = await axios.post(url + "/api/usuarios/login", credenciales, { 'content-type': 'application/json' })
                commit('SET_USUARIO', usuario)
                return true
            }
            catch (error) {
                return false
            }
        },

        async buscarUsuarioPorMail({ commit }, mail) {
            try {
                const { data: usuario } = await axios.get(url + "/api/usuarios/consultarUsuarioPorMail/" + mail)
                commit('SET_USUARIO', usuario)
                console.log('usuaruo en el store por buscar mail', usuario)

            }
            catch (error) {
                alert(error)
            }
        },

        async inscribirACurso({ commit }, datos) {
            const body = {
                examen_id: datos.examen_id,
                payment: datos.payment,
                number: datos.number
            }
            try {
                const { data: usuario } = await axios.put(url + "/api/usuarios/agregarCursoAlumno/" + datos.idUsuario,
                    body,
                    { 'content-type': 'application/json' }
                )

                commit('PUT_Usuario', usuario)

            }
            catch (error) {
                alert(error)
                console.log('Error en inscribirACurso ', error)
            }
        },

        async borrarCursoAlumno({ commit }, data) {


            console.log("acaaaa pekerman", data.usuario, data.curso)
            try {
                const { data: usuario } = await axios.delete(url + "/api/usuarios/borrarCursoAlumno/" + data.usuario, 
                data.curso, 
                { 'content-type': 'application/json' })
                console.log(usuario)
                commit('PUT_Usuario', usuario)
                return true

            }
            catch (error) {
                alert(error)
                console.log('ENTRA ACA', error)
            }
        },




        //APIS EXAMENES//
        async getCursos({ commit }) {
            try {
                const { data: curso } = await axios.get(url + "/api/examenes")
                commit('GET_Examenes', curso)

            }
            catch (error) {
                alert(error)

            }
        },

        async agregarCurso({ commit }, cursoNuevo) {
            try {
                const { data: curso } = await axios.post(url + "/api/examenes", cursoNuevo, { 'content-type': 'application/json' })
                commit('POST_Curso', curso)

                return true

            }
            catch (error) {
                //alert(error)
                console.log('ENTRA ACA--->', error)
                return false
            }
        },

        async buscarCurso({ commit }, id) {
            try {
                const { data: curso } = await axios.get(url + "/api/examenes/buscarCurso/" + id)
                commit('BUSCAR_Curso', curso)

            }
            catch (error) {
                alert(error)
                console.log('ENTRA ACA', error)
            }
        },

        async actualizarCurso({ commit }, cursoAModificar) {

            try {
                const { data: curso } = await axios.put(url + "/api/examenes/" + cursoAModificar.id,
                    cursoAModificar,
                    { 'content-type': 'application/json' }
                )

                commit('PUT_Curso', curso)

            }
            catch (error) {
                alert(error)
                console.log('Error en PUT_Curso ', error)
            }
        },


        async borrarCurso({ commit }, id) {
            try {
                const { data: curso } = await axios.delete(url + "/api/examenes/" + id)
                console.log(curso)
                commit('DELETE_Curso', curso)
                return true

            }
            catch (error) {
                alert(error)
                console.log('ENTRA ACA', error)
            }
        },





    },
    mutations: {

        //USUARIOS//
        GET_Usuarios(state, data) {
            state.usuarios = data
        },

        DELETE_Usuario(state, data) {
            let index = state.usuarios.findIndex(usuario => usuario.id == data.id)
            if (index == -1) throw new Error('usuario no encontrado')
            state.usuarios.splice(index, 1)
        },

        POST_Usuario(state, data) {
            state.usuarios.push(data)
        },

        PUT_Usuario(state, data) {
            console.log("ACTUALIZAR ", data)
            let index = state.usuarios.findIndex(usuario => usuario.id == data.id)
            state.usuarios.splice(index, 1, data)
            console.log("state usuario --> ", state.usuario)
            state.usuario = data
        },

        SET_USUARIO(state, data) {
            state.usuario = data
        },

        //EXAMENES//
        GET_Examenes(state, data) {
            state.examenes = data
        },

        POST_Curso(state, data) {
            state.examenes.push(data)
        },

        BUSCAR_Curso(state, data) {
            console.log("buscar curso", data)
            state.examen = data
        },

        PUT_Curso(state, data) {
            let index = state.examenes.findIndex(curso => curso.id == data.id)
            state.examenes.splice(index, 1, data)

            state.examen = data

        },

        DELETE_Curso(state, data) {
            let index = state.examenes.findIndex(curso => curso.id == data.id)
            if (index == -1) throw new Error('curso no encontrado')
            state.examenes.splice(index, 1)
        },
    }

})



