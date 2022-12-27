<template>
  <div>
    <section>
      <router-link to="/projetos/novo" class="button verde-btn">
      <span class="icon is-small">
        <i class="fas fa-tasks">
        </i>
      </span>
      <span>Novo Projeto</span>
      </router-link>

      <table class="table is-fullwidth tabela-projetos">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody v-for="projeto in projetos" :key="projeto.id">
          <tr>
            <td>{{ projeto.id }}</td>
            <td>{{ projeto.nome }}</td>
            <td>
                <router-link :to="`/projetos/${projeto.id}`" class="button verde-btn">
                  <span class="icon is-small">
                    <i class="fas fa-pencil-alt">
                    </i>
                  </span>
                </router-link>
                <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                    <span class="icon is-small">
                        <i class="fas fa-trash">
                        </i>
                    </span>
                </button>
            </td>
          </tr>
        </tbody>
      </table>

    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { notificacaoMixin } from '@/mixins/notificar'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { OBTER_PROJETOS, REMOVER_PROJETOS } from '@/store/acoes'

export default defineComponent({
  name: 'Lista',
  methods: {
    excluir(id: String){
        this.store.dispatch(REMOVER_PROJETOS, id)
        this.notificar(TipoNotificacao.FALHA, "Deletado", 'Projeto Excluido')
    }
  },
  mixins: [notificacaoMixin],
  setup(){
    const store = useStore()
    store.dispatch(OBTER_PROJETOS)
    return {
      projetos: computed(() => store.state.projeto.projetos),
      store
    }
  },
  })
</script>

<style>
.tabela-projetos, .tabela-projetos thead, .tabela-projetos tbody, .tabela-projetos thead td, .tabela-projetos tbody td{
  color: var(--texto-primario) !important;
  background: var(--botao-ativar-fundo) !important;
  font-weight: 700;
}

.tabela-projetos {
  margin-top: 2em;
}

.verde-btn {
  background: #3d7e42 !important;
  color: white !important;
  border: none !important;
}

.projetos h1, .projetos label, .projetos input {
  color: var(--texto-primario) !important;
}

.projetos input {
  background: var(--fundo-input);
}

</style>
