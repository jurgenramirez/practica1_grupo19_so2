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
                <v-icon>mdi-all-inclusive</v-icon>
                Movimiento o Saldo de insumos generales
            </v-tab>
            <v-tab ripple href="#tab-2">
                <v-icon>mdi-shopping</v-icon>
                Saldo de Existencia de insumos 
            </v-tab>
            <v-tab ripple href="#tab-3">
                <v-icon>mdi-axis-arrow-info</v-icon>
                Maximos y minimos
            </v-tab>
            <v-tab ripple href="#tab-4">
                <v-icon>mdi-clock</v-icon>
                Vencimientos
            </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
          <div class="container">
            <div class="row justify-content-lg-center justify-content-md-center justify-content-sm-center">
                <div class="col col-lg-6 col-md-6 col-sm-6">
                    <Tabla_General style="width:100%;"></Tabla_General>
                </div>               
            </div>
        </div>    
      </v-tab-item>
      <v-tab-item value="tab-2">
          <div class="container">
            <div class="row justify-content-lg-center justify-md-center justify-content-sm-center">
                <div class="col col-lg-6 col-md-6 col-sm-6">
                    <Tabla_Saldos style="width:100%;"></Tabla_Saldos>
                </div>
            </div>
          </div>
      </v-tab-item>
            <v-tab-item value="tab-3">
          <div class="container">
            <div class="row justify-content-lg-center justify-md-center justify-content-sm-center">
                <div class="col col-lg-6 col-md-6 col-sm-6">
                    <Tabla_MinMax style="width:100%;"></Tabla_MinMax>
                </div>
            </div>
          </div>
      </v-tab-item>
            <v-tab-item value="tab-4">
          <div class="container">
            <div class="row justify-content-lg-center justify-md-center justify-content-sm-center">
                <div class="col col-lg-6 col-md-6 col-sm-6">
                    <Tabla_Vencimiento style="width:100%;"></Tabla_Vencimiento>
                </div>
            </div>
          </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import Tabla_General from '../../../src/components/Reportes/reporte_general.vue'
import Tabla_Saldos from '../../../src/components/Reportes/reporte_saldos.vue'
import Tabla_MinMax from '../../../src/components/Reportes/reporte_min_max.vue'
import Tabla_Vencimiento from '../../../src/components/Reportes/reporte_vencimiento.vue'

    export default {
        components:{
            Tabla_General,
            Tabla_Saldos,
            Tabla_MinMax,
            Tabla_Vencimiento
        },
        data:() => ({
           tab: 'tab-1'
        }),
        methods: {
        },
    }
</script>

<style></style>