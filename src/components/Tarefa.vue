<template>
    <Box>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4 descricao">
                {{tarefa.descricao  || 'sem descricao'}}
            </div>
            <div class="column is-4 nome-projeto">
                {{tarefa.projeto?.nome  || 'sem descricao'}}
            </div>
            <div class="column">
                <Cronometro :TempoemSegundos="tarefa.duracaoEmSegundos"/>
            </div> 
        </div>
    </Box>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, PropType } from 'vue'
import Cronometro from './Cronometro.vue'
import ITarefa from '../interfaces/ITarefa'
import Box from './Box.vue'

export default defineComponent({
  name: 'Tarefa',  
  components: { Cronometro, Box },
  emits: ['aoTarefaClicada'],
  props: {
    tarefa: {
        // define o tipo da propriedade, e diz que e obrigatorio
        type: Object as PropType<ITarefa>,
        required: true
    }
  },
  methods: {
    tarefaClicada(): void {
        this.$emit('aoTarefaClicada', this.tarefa)
    }
  }
})
</script>

<style scoped>
.descricao {
    color: var(--texto-primario)
}
.nome-projeto{
    background: var(--texto-projeto) !important;
    color: var(--texto-primario)
}
.clicavel {
    cursor: pointer;
}
</style>
