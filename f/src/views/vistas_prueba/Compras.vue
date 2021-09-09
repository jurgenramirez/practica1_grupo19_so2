<template>
  <v-card>
    <v-toolbar
      color="blue"
      dark
    >
      <template>
        <v-tabs
          v-model="tab"
          centered
        >
            <v-tab ripple href="#tab-1">
                Paso 1
            </v-tab>
            <v-tab ripple href="#tab-2">
                Paso 2
            </v-tab>
            <v-tab ripple href="#tab-3">
                Paso 3
            </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
          <div class="container">
            <div class="row justify-content-lg-center justify-content-md-center justify-content-sm-center">
                <div class="col col-lg-6 col-md-6 col-sm-6">
                    <Paso1 style="width:100%;"></Paso1>
                </div>               
            </div>
            <div class="row justify-content-lg-end justify-content-md-end justify-content-sm-end">
                 <div class="col col-lg-2 col-md-2 col-sm-2">
                    <v-btn @click="changeTab('tab-2')" v-text="'Siguiente'"></v-btn>
                </div>
            </div>
        </div>    
      </v-tab-item>
      <v-tab-item value="tab-2">
          <div class="container">
            <div class="row justify-content-lg-center justify-md-center justify-content-sm-center">
                <div class="col col-lg-6 col-md-6 col-sm-6">
                    <Paso2 style="width:100%;"></Paso2>
                </div>
            </div>
            <div class="row row-cols-auto">
                <div class="col col-lg-10 col-md-8 col-sm-8">
                    <v-btn @click="changeTab('tab-1')" v-text="'Anterior'"></v-btn>
                </div>
                <div class="col col-lg-2 col-md-1 col-sm-1">
                    <v-btn @click="changeTab('tab-3')" v-text="'Siguiente'"></v-btn>
                </div>
            </div>
          </div>
      </v-tab-item>
      <v-tab-item value="tab-3">
        <div class="container">
            <div class="row justify-content-lg-center justify-md-center justify-content-sm-center">
                <div class="col col-lg-6 col-md-6 col-sm-6">
                    <Paso3 style="width:100%;"></Paso3>
                </div>
            </div>
            <div class="row justify-content-lg-start justify-content-md-start justify-content-sm-start">
                <div class="col col-lg-2 col-md-2 col-sm-2">
                    <v-btn @click="changeTab('tab-2')" v-text="'Anterior'"></v-btn>
                </div>
            </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import Paso1 from '../../../src/components/Formularios_compras/Formulario_registro_facturas.vue'
import Paso2 from '../../../src/components/Formularios_compras/Formulario_registro_unidad.vue'
import Paso3 from '../../../src/components/Formularios_compras/Reporte_registro.vue'
    export default {
        components:{
            Paso1,
            Paso2,
            Paso3,
        },
        data:() => ({
           tab: 'tab-1'
        }),
        methods: {
        changeTab(tabir){
            this.tab=tabir;
        }

        }
    }
</script>
<style scoped>
.messages {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 40px;
    color: rgb(167, 167, 167);
    font-weight: 600;
}
</style>