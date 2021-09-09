<template>
  <v-app
    id="inspire"
    :style="{ height: '100%', 'background-image': 'url(' + logo_back + ')' }"
  >
    <template>
      <v-container fluid>
        <template>
          <v-card class="mx-auto my-12" max-width="374">
            <v-divider class="mx-4"></v-divider>

            <v-card-title>MONITOR DE RAM</v-card-title>

            <v-card-text>
              <v-chip-group
               
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>{{ "RAM : " + consola_ram.ram }}</v-chip>

                <v-chip>{{ "RAM EN USO : " + consola_ram.ram_usage }}</v-chip>

                <v-chip>{{
                  "PORCENTAJE DE RAM : " + consola_ram.ram_percent
                }}</v-chip>

                <v-chip>{{ "MEMORIA LIBRE :" + consola_ram.ram_free }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </template>
        <v-sparkline
          :fill="fill"
          :gradient="selectedGradient"
          :line-width="width"
          :padding="padding"
          :smooth="radius || false"
          :value="value"
          auto-draw
        >
        </v-sparkline>
        <v-divider></v-divider>

        <v-row>
          <v-col cols="12" md="6">
            <v-row class="fill-height" align="center">
              <v-item-group v-model="selectedGradient" mandatory>
                <v-row>
                  <v-item
                    v-for="(gradient, i) in gradients"
                    :key="i"
                    v-slot="{ active, toggle }"
                    :value="gradient"
                  >
                    <v-card
                      :style="{
                        background:
                          gradient.length > 1
                            ? `linear-gradient(0deg, ${gradient})`
                            : gradient[0],
                        border: '2px solid',
                        borderColor: active ? '#222' : 'white',
                      }"
                      width="30"
                      height="30"
                      class="mr-2"
                      @click.native="toggle"
                    ></v-card>
                  </v-item>
                </v-row>
              </v-item-group>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-slider
              v-model="width"
              label="Width"
              min="0.1"
              max="10"
              step="0.1"
              thumb-label
            ></v-slider>
          </v-col>

          <v-col cols="6">
            <v-row class="fill-height" align="center">
              <v-switch v-model="fill" label="Filled"></v-switch>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-slider
              v-model="radius"
              label="Radius"
              min="0"
              max="25"
              thumb-label
            ></v-slider>
          </v-col>

          <v-col cols="12" md="6" offset-md="6">
            <v-slider
              v-model="padding"
              label="Padding"
              min="0"
              max="25"
              thumb-label
            ></v-slider>
          </v-col>
        </v-row>
        <v-row class="fill-height" align="center">
          <v-col cols="12" lg="12" md="12">
          <v-card class="mx-auto my-12" max-width="374">
      

            <v-card-title>MONITOR DE PROCESOS</v-card-title>

            <v-card-text>
              <v-chip-group
               
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>{{ "Cantidad de procesos : " +cantidad_procesos }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
          <v-btn v-on:click="recargar_arbol">Recargar arbol</v-btn>
            <tree
              v-bind:data="tree"
              node-text="nombre"
              layoutType="horizontal"
              style="height:5000px"
            >
            </tree>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app>
</template>

<script src="./Login.js"></script>
<style src="./Login.css"></style>
