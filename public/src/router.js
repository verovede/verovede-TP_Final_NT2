//importar la dependecia de vue
import Vue from 'vue'

//importar la dependecia de vue router
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Inicio from './componentes/Inicio.vue'
import FormularioAltaUsuario from './componentes/FormularioAltaUsuario.vue'
import Usuarios from './componentes/Usuarios.vue'
import Cursos from './componentes/Cursos.vue'
import FormularioEditarUsuario from './componentes/FormularioEditarUsuario.vue'
import FormularioEditarCurso from './componentes/FormularioEditarCurso.vue'
import PerfilAlumno from './componentes/PerfilAlumno.vue'
import BackOffice from './componentes/BackOffice.vue'
import FormularioAltaCurso from './componentes/FormularioAltaCurso.vue'
import CursoDetalle from './componentes/CursoDetalle.vue'

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

