<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  > 
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
                v-model="editedItem.descripcion"
                label="Descripción"
                :rules="nameRules"
                required
              ></v-text-field>
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
</template>


<script src="./dialog_tiposmedida.js"></script>