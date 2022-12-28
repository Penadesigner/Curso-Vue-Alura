<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="form para criação de nova tarefa">
                <input type="text" name="" id="" class="input registrar-tarefa" placeholder="Qual tarefa deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o Projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { key } from '@/store'
import { computed, defineComponent, ref } from 'vue'   
import { useStore } from 'vuex'
import Temporizador from './Temporizador.vue'
export default defineComponent({
    components: { Temporizador },
    name: 'Formulario',
    emits: ['aoSalvarTarefa'],
    setup(props, {emit}){
        const store = useStore(key)
        const descricao = ref("")
        const idProjeto = ref("")
        const projetos = computed (() => store.state.projeto.projetos)

        // Monta a tarefa com a Descrição o tempo decorido recebido do temporizador via Emit    
        const finalizarTarefa = (TempoemSegundosDecorido: number) : void => {
            // Emite o tempo decorido que recebeu do temporizador via Emit e a descrição do input do formulario
            emit('aoSalvarTarefa',{
                duracaoEmSegundos: TempoemSegundosDecorido,
                descricao: descricao.value,
                projeto: projetos.value.find(p => p.id == idProjeto.value)
            })
            // Limpa o campo descrição
            descricao.value = ''
            
        }

        return {
            descricao,
            idProjeto,
            projetos,
            finalizarTarefa
        }
    }
})
</script>

<style>
body .formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
body .registrar-tarefa {
    background-color: var(--input-fundo);
}
input::placeholder {
  color: var(--texto-primario) !important;
}

input {
  color: var(--texto-primario) !important;
}
</style>