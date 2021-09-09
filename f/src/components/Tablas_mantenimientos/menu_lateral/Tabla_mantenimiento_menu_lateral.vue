<template>
  <div>
    <v-data-table
      :headers="columnas"
      :items="filas"
      :search="search"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="">{{ nombre_tabla }}</v-toolbar-title>
          <v-divider class="mx-auto" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2 m-3 rounded-pill"
                v-bind="attrs"
                v-on="on"
                @click="cierra_tabla_sub"
              >
                Agregar menú
              </v-btn>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar sistema"
                single-line
                hide-details
              ></v-text-field>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="12">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre del sistema"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="12">
                      <v-text-field
                        v-model="editedItem.path"
                        label="Ruta del sistema"
                        :rules="abreRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="12">
                      <v-text-field
                        v-model="editedItem.icon"
                        label="Icono"
                        :rules="abreRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="12">
                      <v-text-field
                        v-model="editedItem.orden"
                        label="Orden"
                        :rules="abreRules"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="rounded p-2 bg-warning m-1 text-white rounded-pill"
          data-animation="tooltip"
          title="Editar Menu"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="rounded p-2 bg-info m-1 text-white rounded-pill"
          data-animation="tooltip"
          title="Agregar Subitems"
          @click="editItemSubMenu(item)"
        >
          mdi-plus-box-multiple-outline
        </v-icon>
        <v-icon
          small
          class="rounded p-2 teal m-1 text-white rounded-pill"
          data-animation="tooltip"
          title="Agregar roles"
          @click="editItemRoles(item)"
        >
          mdi-account-switch
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
    <br />
    <!-- Tabla de sub menus-->
    <v-data-table
      v-if="mostrar_tabla_submenus"
      :headers="columnas"
      :items="filas_submenu"
      :search="search"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="p-6 col-5">{{
            "SubMenú de " + editedItem.nombre
          }}</v-toolbar-title>
          <v-divider class="mx-auto" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogsub" max-width="600px">
            <template class="row" v-slot:activator="{ on, attrs }">
              <v-btn
                color="red"
                dark
                class="mb-xs-2 m-xs-3 rounded-pill"
                @click="cierra_tabla_sub()"
                v-on="on"
              >
                X
              </v-btn>
              <v-btn
                color="primary"
                dark
                class="mb-2 m-3 rounded-pill"
                v-bind="attrs"
                v-on="on"
              >
                Agregar sub menú
              </v-btn>

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar sub menú"
                single-line
                hide-details
              ></v-text-field>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitleSubMenu }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="12">
                      <v-text-field
                        v-model="editedItemSub.nombre"
                        label="Nombre del sistema"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="12">
                      <v-text-field
                        v-model="editedItemSub.path"
                        label="Ruta del sistema"
                        :rules="abreRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="12">
                      <v-text-field
                        v-model="editedItemSub.icon"
                        label="Icono"
                        :rules="abreRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="12">
                      <v-text-field
                        v-model="editedItemSub.orden"
                        label="Orden"
                        :rules="abreRules"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="closedialogsub">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveSub">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="rounded p-2 bg-warning m-1 text-white rounded-pill"
          data-animation="tooltip"
          title="Editar Sub Menú"
          @click="editItemAux(item)"
        >
          mdi-pencil
        </v-icon>

        <v-icon
          v-if="item.deleted_at == null"
          small
          class="rounded p-2 bg-danger m-1 text-white m-1 text-white rounded-pill"
          data-toggle="tooltip"
          title="Desactivar Sub item"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
        <v-icon
          v-if="item.deleted_at != null"
          small
          class="rounded p-2 bg-success m-1 text-white rounded-pill"
          data-toggle="tooltip"
          title="Activar Sub item"
          @click="deleteItem(item)"
        >
          mdi-account-reactivate
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>

    <!--construccion de roles-->
    <div v-if="editedPuesto">
      <div class="row container">
        <span class="col col-lg-10 col-md-10 col-xs-10 fs-4">{{
          "Puestos asignados en " + editedItem.nombre
        }}</span>

        <div class="col justify-content-end">
          <v-btn
            color="red"
            dark
            class="mb-xs-2 m-xs-3 rounded-pill"
            @click="closePuesto()"
          >
            X
          </v-btn>
        </div>
      </div>
      <v-col cols="12">
        <v-autocomplete
          v-model="puestoActuales"
          :disabled="isUpdating"
          :items="puestos"
          filled
          chips
          color="blue-grey lighten-2"
          label="Puestos asignados"
          item-text="descripcion"
          item-value="descripcion"
          multiple
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              close
              @click="data.select"
              @click:close="remove(data.item)"
            >
              <v-avatar left>
                <v-icon>{{ data.item.icon }}</v-icon>
              </v-avatar>
              {{ data.item.descripcion }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template>
              <v-list-item-avatar>
                <v-icon>{{ data.item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  v-html="data.item.descripcion"
                ></v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-col>
      <v-btn
        color="success"
        dark
        class="mb-xs-2 m-xs-3 rounded-pill"
        @click="registrarPuesto()"
      >
        Registrar puestos
      </v-btn>
    </div>
  </div>
</template>

<script src="./Tabla_mantenimiento_menu_lateral.js"></script>
