<template>
  <v-card>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <div style="background-image: url('../../assets/fondo_foto.png')">
        <br />
        <v-img
          @click.stop="
            mini = !mini;
            verInfoUsuario = false;
          "
          :src="foto"
          class="rounded-pill mt-2"
          style="margin: 0 auto; border: 1px solid white"
          width="60%"
          height="auto"
        ></v-img>
        <v-list-item v-if="mini === false" class="px-2">
          <v-list-item-title
            @click="verInfoUsuario = !verInfoUsuario"
            class="mt-2"
          >
            <div>
              <span class="d-block text-center"
                ><strong>{{ user.primer_nombre + " " }}</strong></span
              >
              <span class="d-block text-center"
                ><strong>{{ user.primer_apellido }}</strong></span
              >
              <small class="d-block text-center mt-2"
                ><strong>{{ user.dpi }}</strong></small
              >
            </div>
          </v-list-item-title>
        </v-list-item>
        <div
          v-if="verInfoUsuario === true"
          class="text-center mt-5 animated zoomIn"
        >
          <div>
            <small class="d-block mx-2"
              >{{ user.direccion }} ({{ user.abreviatura_direccion }})</small
            >
            <small class="d-block mx-2">{{ user.puesto }}</small>
            <small class="d-block mx-2">{{ user.email }}</small>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-model="selectedItem" 
         v-for="(item, i) in items"
         v-bind:key="i">
          <!--Menu del sistema-->

          <v-list-item
            v-if="item.submenu && item.submenu.length === 0"
            v-bind:key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         
          <!--Sub Menus-->
          <v-list-group :value="true" no-action v-if="item.submenu && item.submenu.length > 0"
            v-bind:key="i">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-icon>
                  <v-icon>{{item.icon}}</v-icon>
                  <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item-icon>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(itemsub, i) in item.submenu"
              :key="i"
            >
              <v-list-item-title
                v-text="itemsub.text"
                active-class="active"
                tag="button"
                exact
                class="side-btn"
              />
              <v-list-item-icon>
                <v-icon v-text="itemsub.icon" />
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

        </v-list-item-group>
    

      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>


<script src="./mantenimiento_SideNav.js"></script>