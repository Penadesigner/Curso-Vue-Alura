<template>
    <Formulario @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa"/>
        <Box v-if="listaEstaVazia">
            <p class="texto-inicio">Vamos começar o dia de hoje?</p>
        </Box>
        <Modal :mostrar="tarefaSelecionada != null">
            <template v-slot:cabecalho>
              <p class="modal-card-title">Editando Tarefa</p>
              <button class="delete" aria-label="close" @click="fecharModal"></button>
            </template>
            <template v-slot:corpo>
              <div class="field">
                <label for="DescriçãoDaTarefa" class="label">
                  Nome Da Tarefa
                </label>
                <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="DescriçãoDaTarefa">
              </div>
            </template>
            <template v-slot:rodape>
              <button class="button is-success" @click="alterarTarefa">Salvar</button>
              <button class="button" @click="fecharModal">Cancelar</button>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import Modal from '@/components/Modal.vue'
import ITarefa from '@/interfaces/ITarefa'
import { useStore } from '@/store'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/acoes'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import Box from '../components/Box.vue'
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue'


export default defineComponent({
  name: 'Tarefas',
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal
  },
  data(){
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  setup(){
    const store = useStore()
    const filtro = ref("")
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      tarefas: computed(() => store.state.tarefas),
      store,
      filtro
    }
  },
  computed:{
    // Inclui um box de Iniciar atividades, quando listaEstaVazia for igual a 0
    listaEstaVazia () : boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    //salvarTarefa recebe uma tarefa que é = Itarefa
    salvarTarefa(tarefa:ITarefa){
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa:ITarefa){
      this.tarefaSelecionada = tarefa
    },
    fecharModal(){
      this.tarefaSelecionada = null
    },
    alterarTarefa(){
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
      .then(() => this.fecharModal())
    }
  }

  })
</script>

<style>
.lista {
  padding: 1em;
}
main {
  --bg-primario: #f2f2f2;
  --texto-primario: #000;
  --botao-ativar-texto: black;
  --input-fundo:  #e3d1d1;
  --botao-ativar-fundo: #e3d1d1;
}
main.modo-escuro {
  --bg-primario: #000;
  --texto-primario: #fff;
  --input-fundo:  rgb(118, 165, 235);
  --botao-ativar-texto: #fff !important;
  --botao-ativar-fundo: rgb(118, 165, 235);
}
.conteudo {
  background-color: var(--bg-primario);
}
.texto-inicio {
  color: var(--texto-primario);
}
</style>
