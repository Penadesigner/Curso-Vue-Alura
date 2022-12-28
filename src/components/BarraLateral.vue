<template>
    <header :class="{'header-blue': modoEscuroAtivo, 'header-red': !modoEscuroAtivo}">
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <div class="has text-certered">
          <button class="button has-text-weight-medium is-rounded" @click="alterarTema">{{textoBotao}}</button>
        </div>
        <nav class="panel mt5">
          <ul>
            <li>
              <router-link to="/" class="link">
                <i class="fas fa-tasks">
                </i>Tarefas
                </router-link>
            </li>
            <li>
              <router-link to="/projetos" class="link">
                <i class="fas fa-tasks">
                </i>Projetos
                </router-link>
            </li>
          </ul>
        </nav>
    </header>
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent } from 'vue'
export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoTemaAlterado'],
    data(){
      return {
        modoEscuroAtivo: false
      }
    },
    computed: {
      // Responsavel por incluir o texto no botao MODO ESCURO.
      textoBotao () {
        if(this.modoEscuroAtivo){
          return 'Desativar Modo Escuro'
        } else {
          return 'Ativar Modo Escuro'
        }
      }
    },
    methods: {
      alterarTema(){
        // ao clicar no botao, this.modoEscuroAtivo, recebe o contrario dele
        this.modoEscuroAtivo = !this.modoEscuroAtivo
        // emit um evento que passa estado atual do this.modoEscuroAtivo
        this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
      }
    }
})
</script>

<style scoped>

img {
  margin-bottom: 1em;
}
button {
  background: var(--botao-ativar-fundo) !important;
  color: var(--botao-ativar-texto) !important;
}

header {
  padding: 1rem;
  width: 100%;
  min-height: 100vh;
  height: 100%; 
  text-align: center;
}
.header-blue {
  background: #071a2c;
}
.header-red {
  background: rgb(225 95 95);
}

.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
img {
  max-width: 150px;
}
</style>

