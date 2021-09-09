<template>
  <v-data-table
    :headers="columnas"
    :items="filas"
    :search="search"
    :loading="loading"
    class="elevation-1 container"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{nombre_tabla}}</v-toolbar-title>
        <v-divider
          class="mx-auto"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2 m-3 rounded-pill"
              v-bind="attrs"
              v-on="on"
            >
              Crear sección
            </v-btn>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar sección"
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    lg="12"
                  >
                    <v-text-field
                      v-model="editedItem.seccion"
                      label="Nombre de sección"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    lg="12"
                  >
                    <v-text-field
                      @keyup="uppercase"
                      v-model="editedItem.abreviatura"
                      label="Abreviatura"
                      :rules="abreRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                    lg="12"
                  >
                    <v-autocomplete
                      :items ="unidades_nombre"
                      v-model="editedItem.unidad"
                      label="Unidad"
                      :rules="campoRules"
                      required
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
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
        class="rounded-pill p-2 bg-warning m-1 text-white"
        data-toggle="tooltip" title="Editar Usuario"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <!-- No se pueden desactivar secciones"
      <v-icon
      v-if="item.deleted_at == null"
        small
        class="rounded-pill p-2 bg-danger m-1 text-white"
        data-toggle="tooltip" title="Desactivar Usuario"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      <v-icon
        v-if="item.deleted_at != null"
        small
        class="rounded-pill p-2 bg-success m-1 text-white"
        data-toggle="tooltip" title="Activar Usuario"
        @click="deleteItem(item)"
      >
        mdi-account-reactivate
      </v-icon>
      -->
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
       
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script src="./Tabla_mantenimientos_secciones.js"></script>