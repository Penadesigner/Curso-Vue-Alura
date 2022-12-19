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
import { computed, defineComponent } from 'vue'   
import { useStore } from 'vuex'
import Temporizador from './Temporizador.vue'
export default defineComponent({
    components: { Temporizador },
    name: 'Formulario',
    emits: ['aoSalvarTarefa'],
    data(){
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    setup(){
        const store = useStore(key)
        return {
            projetos: computed (() => store.state.projetos)
        }
    },
    methods: {
        // Monta a tarefa com a Descrição o tempo decorido recebido do temporizador via Emit    
        finalizarTarefa(TempoemSegundosDecorido: number) : void {
            // Emite o tempo decorido que recebeu do temporizador via Emit e a descrição do input do formulario
            this.$emit('aoSalvarTarefa',{
                duracaoEmSegundos: TempoemSegundosDecorido,
                descricao: this.descricao,
                projeto: this.projetos.find(p => p.id == this.idProjeto)
            })
            // Limpa o campo descrição
            this.descricao = ''
            
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