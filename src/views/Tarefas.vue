<template>
    <Formulario @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
            <p class="texto-inicio">Vamos começar o dia de hoje?</p>
        </Box>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Box from '../components/Box.vue'
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue'
import ITarefa from '../interfaces/ITarefa'

export default defineComponent({
  name: 'Tarefas',
  data(){
    return {
      // tarefa lista, rerebe uma interface 
      tarefas: [] as ITarefa [],
    }
  } ,
  components: {
    Formulario,
    Tarefa,
    Box
  },
  computed:{
    // Inclui um box de Iniciar atividades, quando listaEstaVazia for igual a 0
    listaEstaVazia () : boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    // salvarTarefa recebe uma tarefa que é = Itarefa
    salvarTarefa(tarefa:ITarefa){
      this.tarefas.push(tarefa)
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
