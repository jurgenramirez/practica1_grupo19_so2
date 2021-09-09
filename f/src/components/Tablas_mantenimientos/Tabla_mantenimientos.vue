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
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-btn
          v-if="direccion"
          color="primary"
          dark
          class="mb-2 m-3 rounded-pill"
          @click.stop="crearDireccion()"
        >
          {{ boton }}
        </v-btn>
        <v-btn
          v-if="puesto"
          color="primary"
          dark
          class="mb-2 m-3 rounded-pill"
          @click="crearPuesto()"
        >
          {{ boton }}
        </v-btn>
        <v-btn
          v-if="producto"
          color="primary"
          dark
          class="mb-2 m-3 rounded-pill"
          @click="crearProducto()"
        >
          {{ boton }}
        </v-btn>
        <v-btn
          v-if="tipo_medida"
          color="primary"
          dark
          class="mb-2 m-3 rounded-pill"
          @click="crearTiposMedida()"
        >
          {{ boton }}
        </v-btn>

        

        <dialog_direcciones
          :crear="crear"
          @closeModal="closeDireccion()"
          @reloadTable="reloadDirecciones()"
          :editedItem="edit"
          :dialog="dialogDireccion"
        />
        <dialog_puestos
          :crear="crear"
          @closeModal="closePuesto()"
          @reloadTable="reloadPuesto()"
          :editedItem="editedItem"
          :dialog="dialogPuesto"
        />
        <dialog_productos
          :crear="crear"
          @closeModal="closeProducto()"
          @reloadTable="reloadProducto()"
          :editedItem="edit"
          :dialog="dialogProducto"
        />
        <dialog_tiposmedida
          :crear="crear"
          @closeModal="closeTiposMedida()"
          @reloadTable="reloadTiposMedida()"
          :editedItem="edit"
          :dialog="dialogTipoMedida"
        />
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        v-if="direccion"
        small
        class="rounded p-2 bg-warning m-1 text-white rounded-pill"
        data-toggle="tooltip"
        title="Editar Usuario"
        @click="editItemDireccion(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        v-if="puesto"
        small
        class="rounded p-2 bg-warning m-1 text-white rounded-pill"
        data-toggle="tooltip"
        title="Editar Usuario"
        @click="editItemPuesto(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        v-if="producto"
        small
        class="rounded p-2 bg-warning m-1 text-white rounded-pill"
        data-toggle="tooltip"
        title="Editar Usuario"
        @click="editItemProducto(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        v-if="tipo_medida"
        small
        class="rounded p-2 bg-warning m-1 text-white rounded-pill"
        data-toggle="tooltip"
        title="Editar Usuario"
        @click="editItemTiposMedida(item)"
      >
        mdi-pencil
      </v-icon>
      <!-- No se pueden desactivar direcciones
      <v-icon
        small
        class="rounded p-2 bg-danger m-1 text-white m-1 text-white rounded-pill"
        data-toggle="tooltip" title="Desactivar Usuario"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      <v-icon
        
        small
        class="rounded p-2 bg-success m-1 text-white rounded-pill"
        data-toggle="tooltip" title="Activar Usuario"
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


<script src="./Tabla_mantenimientos.js"></script>