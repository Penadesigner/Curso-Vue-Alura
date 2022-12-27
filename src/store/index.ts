import { INotificacao } from '@/interfaces/INotificacao'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from './acoes'
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFA, NOTIFICAR } from './mutations'
import Http from '@/http'
import ITarefa from '@/interfaces/ITarefa'
import { EstadoProjeto, projeto } from './modulos/projeto'

export interface Estado {
  notificacoes: INotificacao[],
  tarefas: ITarefa[],
  projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    tarefas: [],
    notificacoes: [],
    projeto: {
      projetos: []
    }
  },
  getters: {
  },
  mutations: {
      // TAREFAS //
    [DEFINIR_TAREFA](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },

    [ADICIONA_TAREFA](state, tarefa: ITarefa){
        state.tarefas.push(tarefa)
    },

    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => t.id == tarefa.id)
      state.tarefas[index] = tarefa
    },

    // NOTIFICAÇÂO //
    [NOTIFICAR](state, novaNotificacao: INotificacao){
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id)
      }, 4000);
    }
  },
  actions: {
    // Quando receber a requisicao eu quero alterar o estado

    // TAREFAS //
    [OBTER_TAREFAS] ({ commit }) {
      Http.get("tarefas")
      .then(res =>
        commit(DEFINIR_TAREFA, res.data))
      .catch(err => 
        console.log(err))
    },

    [CADASTRAR_TAREFA] ( {commit}, tarefa: ITarefa ) {
      return Http.post("tarefas", tarefa).then(res => commit(ADICIONA_TAREFA, res.data))
    },

    [ALTERAR_TAREFA] ( {commit}, tarefa: ITarefa ) {
      return Http.put(`tarefas/${tarefa.id}`, tarefa)
      .then(() => commit(ALTERA_TAREFA, tarefa))
    }
  },
  modules: {
    projeto
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}