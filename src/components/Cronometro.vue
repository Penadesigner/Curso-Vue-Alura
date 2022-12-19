<template>
    <section class="display">
        <strong>{{tempoDuracao}}</strong>
    </section>
</template>

<script lang="ts">
/* eslint-disable */
// Este component esta recebendo TempoemSegundos do Temporizador.vue, e esta transformando o resultado via computed: em um valor de Hora
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Cronometro',
    props: {
        TempoemSegundos: {
            type: Number,
            default: 0
        }
    },
    computed: {
        tempoDuracao() : string {
            return new Date(this.TempoemSegundos * 1000).toISOString().substring(11,19)
        }
            },
})
</script>
<style>
.display strong {
    color: var(--texto-primario)
}
</style>