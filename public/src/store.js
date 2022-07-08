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

                commit('DELETE_Usuario', usuario)
                return true
            }
            catch (error) {
                alert(error)
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
                const { data: usuario } = await axios.put(url + "/api/usuarios/" + usuarioAModificar._id,
                    usuarioAModificar,
                    { 'content-type': 'application/json' }
                )
                commit('PUT_Usuario', usuario)
            }
            catch (error) {
                alert(error)
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
            }
        },

        async borrarCursoAlumno({ commit }, data) {

            try {
                const { data: results } = await axios.delete(url + "/api/usuarios/borrarCursoAlumno/" + data.usuario,
                    {
                        headers: { 'content-type': 'application/json' },
                        data: { data: data.curso }

                    })

                commit('PUT_results', results)

            }
            catch (error) {
                alert(error)
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
            }
        },


        async borrarCurso({ commit }, id) {
            try {
                const { data: curso } = await axios.delete(url + "/api/examenes/" + id)

                commit('DELETE_Curso', curso)
                return true

            }
            catch (error) {
                alert(error)
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
            let index = state.usuarios.findIndex(usuario => usuario.id == data.id)
            state.usuarios.splice(index, 1, data)
            state.usuario = data
        },

        SET_USUARIO(state, data) {
            state.usuario = data
        },

        PUT_results(state, data) {
            state.usuario.results = data
        },


        //EXAMENES//
        GET_Examenes(state, data) {
            state.examenes = data
        },

        POST_Curso(state, data) {
            state.examenes.push(data)
        },

        BUSCAR_Curso(state, data) {
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



