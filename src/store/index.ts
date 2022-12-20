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
    [NOTIFICAR](state, novaNotificacao: INotificacao){
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id)
      }, 4000);
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