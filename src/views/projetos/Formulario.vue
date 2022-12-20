<template>
  <div>
    <section>
      <form @submit.prevent="salvar">
        <div class="field">
          <label for="nomeDoProjeto" class="label">
            Nome Do Projeto
          </label>
          <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjet">
        </div>
        <div class="field">
          <button class="button verde-btn" type="submit">
            Salvar
          </button>         
        </div>
      </form>

    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { ALTERA_PROJETO } from '@/store/mutations'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { notificacaoMixin } from '@/mixins/notificar'
import { CADASTRAR_PROJETOS } from '@/store/acoes'

export default defineComponent({
  name: 'Formulario',
  props: {
    id: {
      type: String
    }
  },
  mixins: [notificacaoMixin],
  data(){
    return {
      nomeDoProjeto: '',
    }
  },
  setup(){
    const store = useStore()
    return {
      store
    }
  },
  mounted(){
    if(this.id){
      const projeto = this.store.state.projetos.find(p => p.id == this.id)
      this.nomeDoProjeto = `${projeto?.nome}` || ''
    }
  },
  methods: {
    salvar(){
      if(this.id){
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        })
        this.notificar(TipoNotificacao.ATENCAO, "Alterado", 'Projeto Alterado')
      } else {
        this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
        this.notificar(TipoNotificacao.SUCESSO, "Excelente", 'Projeto cadastrado')
      }
      this.nomeDoProjeto = ''
      this.$router.push('/projetos')
    }
  }
  })
</script>
