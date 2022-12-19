import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue' 
import Formulario from '../views/projetos/Formulario.vue' 
import Lista from '../views/projetos/Lista.vue' 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Tarefas
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'projetos',
        component: Lista
      },
      {
        path: 'novo',
        name: 'Novo Projetos',
        component: Formulario
      },
      {
        path: ':id',
        name: 'Editar Projeto',
        component: Formulario,
        // isto diz que o :id, é uma prop do componente
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
