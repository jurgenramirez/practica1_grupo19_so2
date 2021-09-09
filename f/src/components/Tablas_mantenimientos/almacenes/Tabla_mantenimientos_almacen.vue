<template>
  <v-data-table
    :headers="columnas"
    :items="filas"
    :search="search"
    :loading="loading"
    class="elevation-1 container"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ nombre_tabla }}</v-toolbar-title>
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
            >
              Crear Almacén
            </v-btn>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar almacén"
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
                  <v-col cols="12" sm="6" md="12" lg="12">
                    <v-text-field
                      v-model="editedItem.descripcion"
                      label="Nombre de Almacen"
                      :rules="nameRules"
                      v-on:keyup.enter.native="save"
                      required
                    ></v-text-field>
                    <v-col cols="12" sm="6" md="12" lg="12">
                      <v-autocomplete
                        :items="direcciones"
                        v-model="editedItem.direccion"
                        @change="selecionarUsuarioCarga"
                        @keypress:enter="selecionarUsuarioCarga"
                        label="Dirección"
                        :rules="campoRules"
                        color="warning"
                        required
                        item-value="nombre"
                        item-text="nombre"
                      ></v-autocomplete>
                    </v-col>
                    <div v-if="selecionarUsuario && editedIndex <= -1">
                      <v-col cols="12" sm="6" md="12" lg="12">
                        <v-autocomplete
                          :loading="loadingAutoComplete"
                          :items="usuarios"
                          v-model="editedItem.encargado"
                          label="Usuario encargado del almacén"
                          :rules="campoRules"
                          color="warning"
                          required
                          item-value="nombre_completo"
                          item-text="nombre_completo"
                        ></v-autocomplete>
                      </v-col>
                    </div>
                    <div v-if="editedIndex > -1">
                      <v-col cols="12" sm="6" md="12" lg="12">
                        <v-autocomplete
                          :loading="loadingAutoComplete"
                          :items="usuarios"
                          v-model="editedItem.encargado"
                          label="Usuario encargado del almacén"
                          :rules="campoRules"
                          color="warning"
                          required
                          item-value="nombre_completo"
                          item-text="nombre_completo"
                        ></v-autocomplete>
                      </v-col>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="close"> Cancelar </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="rounded p-2 bg-warning m-1 text-white rounded-pill"
        data-toggle="tooltip"
        title="Editar almacén"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <!--
      <v-icon
        small
        class="rounded p-2 bg-danger m-1 text-white m-1 text-white rounded-pill"
        data-toggle="tooltip" title="Desactivar Almacen"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      <v-icon
        
        small
        class="rounded p-2 bg-success m-1 text-white rounded-pill"
        data-toggle="tooltip" title="Activar Almacen"
        @click="deleteItem(item)"
      >
        mdi-account-reactivate
      </v-icon>
      -->
    </template>
    <template v-slot:no-data>
      <v-btn color="primary"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script src="./Tabla_mantenimientos_almacen.js"></script>