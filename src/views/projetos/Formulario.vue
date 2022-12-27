<template>
  <div>
    <section>
      <!-- Ouve o evento de submit, com o comportamento padrao de recarregar a pagina -->
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
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { notificacaoMixin } from '@/mixins/notificar'
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from '@/store/acoes'

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
    // iMPORT DA STORE, USANDO A CHAVE KEY
    const store = useStore()
    return {
      store
    }
  },
  mounted(){
    // Verifica se foi passado um id, caso sim, ele busca um projeto com este id, 
    // e substitui o nome do projeto com o nome que foi passado no Input nomeDoProjeto
    if(this.id){
      const projeto = this.store.state.projeto.projetos.find(p => p.id == this.id)
      this.nomeDoProjeto = `${projeto?.nome}` || ''
    }
  },
  methods: {
    salvar(){
      if(this.id){
        // Chama a mutation ALTERA_PROJETO atraves do commit e passa um projeto = IProjeto
        this.store.dispatch(ALTERAR_PROJETOS, {
          id: this.id,
          nome: this.nomeDoProjeto,
        }).then(() => {
          this.notificar(TipoNotificacao.ATENCAO, "Alterado", 'Projeto Alterado')
        }) 
      } else {
        this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto).then(() => {
          this.notificar(TipoNotificacao.SUCESSO, "Excelente", 'Projeto cadastrado')
        })
      }
      this.nomeDoProjeto = ''
      this.$router.push('/projetos')
    }
  }
  })
</script>
