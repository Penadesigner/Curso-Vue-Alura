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
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { notificacaoMixin } from '@/mixins/notificar'
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from '@/store/acoes'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Formulario',
  props: {
    id: {
      type: String
    }
  },
  mixins: [notificacaoMixin],
  methods: {
    
  },
  setup(props){
    const store = useStore()
    const router = useRouter()
    const nomeDoProjeto = ref("")

    // Faz com que o nome do projeto, venha na hora da edição, para ser alterado.
    if(props.id){
      const projeto = store.state.projeto.projetos.find(p => p.id == props.id)
      nomeDoProjeto.value = `${projeto?.nome}` || ''
    }

    const salvar = () => {
      if(props.id){
        // Chama a mutation ALTERA_PROJETO atraves do commit e passa um projeto = IProjeto
        store.dispatch(ALTERAR_PROJETOS, {
          id: props.id,
          nome: nomeDoProjeto.value,
        }).then(() => {
          //this.notificar(TipoNotificacao.ATENCAO, "Alterado", 'Projeto Alterado')
        }) 
      } else {
        store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value).then(() => {
          //this.notificar(TipoNotificacao.SUCESSO, "Excelente", 'Projeto cadastrado')
        })
      }
      nomeDoProjeto.value = ''
      router.push('/projetos')
    }

    return {
      nomeDoProjeto,
      salvar
    }
  }
  })
</script>
