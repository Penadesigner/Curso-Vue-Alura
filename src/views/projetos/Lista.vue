<template>
  <div>
    <section>
      <router-link to="/projetos/novo" class="button is-primary">
      <span class="icon is-small">
        <i class="fas fa-tasks">
        </i>
      </span>
      <span>Novo Projeto</span>
      </router-link>

      <table class="table is-fullwidth">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody v-for="projeto in projetos" :key="projeto.id">
          <tr>
            <td>{{ projeto.id }}</td>
            <td>{{ projeto.nome }}</td>
            <td>
                <router-link :to="`/projetos/${projeto.id}`" class="button is-link">
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
import { EXCLUIR_PROJETO } from '@/store/mutations'
export default defineComponent({
  name: 'Lista',
  methods: {
    excluir(id: String){
        this.store.commit(EXCLUIR_PROJETO, id)
    }
  },
  setup(){
    const store = useStore()
    return {
      projetos: computed(() => store.state.projetos),
      store
    }
  },
  })
</script>

<style scoped>

</style>
