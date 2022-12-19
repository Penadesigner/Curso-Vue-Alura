import { INotificacao, TipoNotificacao } from '@/interfaces/INotificacao'
import IProjeto from '@/interfaces/IProjetos'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from './mutations'

interface Estado {
  projetos: IProjeto[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [
      {
        id: 1,
        texto: 'Concluido com sucesso',
        titulo: 'Sucesso',
        tipo: TipoNotificacao.SUCESSO
      },      {
        id: 2,
        texto: 'tivemos problemas',
        titulo: 'Atencao',
        tipo: TipoNotificacao.ATENCAO
      },
      {
        id: 3,
        texto: 'Erro ao tentar concluir',
        titulo: 'Erro',
        tipo: TipoNotificacao.FALHA
      }
    ]
  },
  getters: {
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: String){
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto
        state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex(p => p.id == projeto.id)
      state.projetos[index] = projeto
      console.log(index)
    },
    [EXCLUIR_PROJETO](state, id: String) {
      state.projetos = state.projetos.filter(p => p.id != id)
    },
    [NOTIFICAR](){
      
    }
  },
  actions: {
  },
  modules: {
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}