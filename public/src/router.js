//importar la dependecia de vue
import Vue from 'vue'

//importar la dependecia de vue router
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* componentes publicos */

import Inicio from './componentes/Inicio.vue'
import PerfilAlumno from './componentes/PerfilAlumno.vue'
import CursoDetalle from './componentes/CursoDetalle.vue'

/* componentes backOffice */
import BackOffice from './componentesBackOffice/BackOffice.vue'
import FormularioAltaUsuario from './componentesBackOffice/FormularioAltaUsuario.vue'
import FormularioAltaCurso from './componentesBackOffice/FormularioAltaCurso.vue'

import FormularioEditarUsuario from './componentesBackOffice/FormularioEditarUsuario.vue'
import FormularioEditarCurso from './componentesBackOffice/FormularioEditarCurso.vue'
import Usuarios from './componentesBackOffice/Usuarios.vue'
import Cursos from './componentesBackOffice/Cursos.vue'




export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '*', redirect: '/' },
        { path: '/', redirect: '/inicio' },
        { path: '/inicio', component: Inicio },
        
        { path: '/formularioAltaUsuario', component: FormularioAltaUsuario },
        { path: '/editarUsuario/:id', name: 'editarUsuario', component: FormularioEditarUsuario, props: true },
       

        { path: '/editarCurso/:id', name: 'editarCurso', component: FormularioEditarCurso, props: true },
        { path: '/usuarios', component: Usuarios },
        { path: '/cursos', component: Cursos },
        { path: '/perfilAlumno/:email', name: 'perfilAlumno', component: PerfilAlumno, props: true },
        { path: '/backOffice/', component: BackOffice },
        { path: '/formularioAltaCurso', component: FormularioAltaCurso },
        { path: '/cursoDetalle/:id', name: 'cursoDetalle', component: CursoDetalle, props: true },
    ]
})

