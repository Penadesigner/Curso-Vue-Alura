<template>
  <div class="notificacoes">
    <article class="message" :class="contexto[noti.tipo]" v-for="noti in notificacoes" :key="noti.id">
        <div class="message-header">{{noti.titulo}}</div>
        <div class="message-body">{{noti.texto}}</div>
    </article>
  </div>
  
</template>

<script>
import { useStore } from '@/store'
import { computed } from '@vue/runtime-core'
import { TipoNotificacao } from '@/interfaces/INotificacao'

export default {
    name: 'Noitificacoes',
    data(){
        return {
            contexto: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.ATENCAO]: 'is-warning',
                [TipoNotificacao.FALHA]: 'is-danger'
            }
        }
    },
    setup(){
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
}
</script>

<style scoped>
    .notificacoes {
        position: absolute;
        top: 0;
        right: 0;
        width: 200px;
        padding: 0.6em;
        z-index: 105;
    }
</style>>