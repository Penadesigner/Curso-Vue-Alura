import { INotificacao, TipoNotificacao } from '@/interfaces/INotificacao'
import IProjeto from '@/interfaces/IProjetos'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { CADASTRAR_PROJETOS, OBTER_PROJETOS } from './acoes'
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from './mutations'
import Http from '@/http'

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
    [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
      state.projetos = projetos
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
    [OBTER_PROJETOS] ({ commit }) {
      Http.get("projetos")
      .then(res =>
        commit(DEFINIR_PROJETO, res.data))
      .catch(err => 
        console.log(err))
    },
    [CADASTRAR_PROJETOS] ( contexto, nomeDoProjeto: String ) {
      return Http.post("projetos", {
        nome: nomeDoProjeto
      })
    }
  },
  modules: {
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}