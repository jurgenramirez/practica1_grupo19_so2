<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      class="bottom "
      :expand-on-hover="!fijarmenu"
      app
    >

      <div>
        <v-checkbox
          v-model="fijarmenu"
          class="position-absolute top-0 end-0"
          off-icon="mdi-menu"
          on-icon="mdi-backburger"
          dense
        >
        </v-checkbox>
        <v-img
          @click.stop="
            mini = !mini;
            verInfoUsuario = false;
          "
          :src="foto"
          class="rounded-pill mt-2 "
          style="margin: 0 auto; border: 1px solid white"
          width="60%"
          height="50%"
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
          <v-divider v-if="mini === false"></v-divider>
          <div  v-if="mini === false">
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
        <v-list-item-group v-model="selectedItem" color="primary">
          <!--Menu del sistema-->
          <div v-for="(item, i) in items" :key="i" >
            <v-list-item
              class="animated fadeInLeft zoomMenu"
              v-if="item.submenu && item.submenu.length === 0"
              :key="i"
              @click="
                select_item(i, item.path);
                verInfoUsuario = false;
              "
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
            <v-list-group
              :value="true"
              no-action
              v-if="item.submenu && item.submenu.length > 0"
              :key="i"
             
            >
              <template v-slot:activator>
                <v-list-item-content class="animated fadeInLeft ">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-icon>
                </v-list-item-content>
              </template>

              <v-list-item
                class="animated fadeInLeft submenu" 
                v-for="(itemsub, i) in item.submenu"
                :key="i"
                @click="
                  select_item(i, itemsub.path);
                  verInfoUsuario = false;
                "
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
          </div>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-list>
          <v-list-item @click="cerrarSesion()">
            <v-list-item-icon
              ><v-icon>mdi-account-arrow-left</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="'Cerrar sesión'"
                active-class="active"
                tag="button"
                exact
                class="side-btn"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

  </v-card>
  
</template>

<script src="./SideNav.js"></script>
<style src="./SideNav.css"></style>
