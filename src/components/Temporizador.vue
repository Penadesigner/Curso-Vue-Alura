<template>
    <div class="is-flex is-align-items-center is-justify-content-space-around">
        <Cronometro :TempoemSegundos="TempoemSegundos"/>
        <button class="button" @click="iniciar()" :disabled="CronometroRodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar()" :disabled="!CronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>                                   
    </div>
</template>
<script lang="ts">
/* eslint-disable */
// Este component recebe o Cronometro.vue, e ao lado inclui dois botões, de Iniciar e Finalizar o cronometro
import { defineComponent } from 'vue'
import Cronometro from './Cronometro.vue'
export default defineComponent({
    components: { Cronometro },
    name: 'Temporizador',
    emits: ['aoTemporizadorFinalizado'],
    data(){
        return {
            TempoemSegundos: 0,
            cronometro: 0,
            CronometroRodando: false // desabilita os botoes de iniciar e pausar
                }
    },
    methods: {
        iniciar(){
            // Ao clicar no botao ele transforma this.cronometroRodando em true e desabilita o botao de Play
            this.CronometroRodando = true
            // começa a contagem 1 + 1 e salva o valor final em This.Cronometro
            this.cronometro = setInterval(()=>{
                this.TempoemSegundos += 1
            },1000)
        },
        finalizar(){
            // Ao clicar no botao ele transforma this.cronometroRodando em false e desabilita o botao de Pause
            this.CronometroRodando = false
            // limpa a contagem
            clearInterval(this.cronometro)
            // emitir um ( evento, com sua carga de payload)
            this.$emit('aoTemporizadorFinalizado',this.TempoemSegundos)
            // Zera o temporizador para a proxima tarefa
            this.TempoemSegundos = 0
        }
        
    }
})
</script>
