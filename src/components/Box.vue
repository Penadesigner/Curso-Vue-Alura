<template>
    <div class="box has-text-weight-bold box-padrao">
        <slot></slot>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Box',
})
</script>

<style>
body .box-padrao {
    background: var(--botao-ativar-fundo);
}
</style>
