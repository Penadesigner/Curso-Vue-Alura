<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
      <div class="column is-three-quarter conteudo">
        <Notificacoes/>
          <router-view></router-view>
      </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarraLateral from './components/BarraLateral.vue'
import Notificacoes from './components/Notificacoes.vue'

export default defineComponent({
  name: 'App',
  data(){
    return {
      modoEscuroAtivo: false,
    }
  } ,
  components: {
    BarraLateral,
    Notificacoes
  },
  methods: {
    trocarTema(RecebendoEstadoBotaoModoEscuro:boolean){
      // Inclui no Estado this.modoEscuroAtivo, o valor recebido do BarraLateral.vue, passado via EMIT
      this.modoEscuroAtivo = RecebendoEstadoBotaoModoEscuro
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
