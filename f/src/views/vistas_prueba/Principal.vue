<template>
    <v-parallax height="100%" src="../../../src/assets/fondo2.jpg">
        <div class="overflow-hidden">
                <div class="container">
                    <div class="row justify-content-lg-center justify-content-md-center justify-content-sm-center">
                        <div class="col col-lg-16 col-md-16 col-sm-12">
                            <Tabla 
                            :nombre_tabla="nombre_tabla"></Tabla>
                        </div>               
                    </div>
                </div>
                
        <div class="container">
            <div class="row justify-content-lg-center justify-content-md-center justify-content-sm-center">
                <div class="col col-lg-16 col-md-16 col-sm-8">       
                    <div class="text-center mb-8">
                        <v-btn
                            color="success"
                            outlined
                            @click="active = !active"
                        >
                            Dato global actualizado 
                        </v-btn>
                    </div>

                    <v-bottom-navigation
                    v-model="value"
                    :input-value="active"
                    color="indigo"
                    >
                        <v-btn>
                            <span>{{"Saldo Final: " + "900" + " unidades"}}</span>
                            <v-icon>mdi-google-circles-communities</v-icon>
                        </v-btn>
                        <v-btn>
                            <span></span>
                            <v-icon></v-icon>
                        </v-btn>
                        <v-btn>
                            <span>{{"Valor total: " + new Intl.NumberFormat("en-US", {style: "currency", currency: "GTQ"}).format(1234.60)}}</span>
                            <v-icon>mdi-cash</v-icon>
                        </v-btn>
                    </v-bottom-navigation>
                    </div>
                </div>
            </div>
        </div>
    </v-parallax>
</template>

<script>
  import Tabla from '../../../src/components/Tabla_información/Tabla_informacion.vue'  
  export default {
      components: {
          Tabla
      } ,  
        data: () => ({
        items: [
            {
            color: 'green lighten-1',
            icon: 'mdi-airballoon',
            },
        ],
        mostrar:false,
        sheet: false,
        value: 1,
        active: true,
        nombre_tabla: "todo ok",
        }),
        methods :{

        }
  }
</script>

<style scoped>
.overview {
    display: grid;
    height: 100%;
    width: 100%;
    font-size: 20px;
    color: rgb(167, 167, 167);
    font-weight: 600;
}
</style>