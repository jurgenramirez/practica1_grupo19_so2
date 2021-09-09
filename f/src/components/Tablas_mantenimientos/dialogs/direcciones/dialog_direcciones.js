export default {
  props: ['dialog', 'crear', 'editedItem'],
  name: "dialog_direcciones",
  data: () => ({
    nameRules: [
      v => !!v || 'Nombre obligatorio',
    ],
    abreRules: [
      v => !!v || 'Abreviatura obligatoria',
    ],

  }),

  computed: {
    formTitle() {
      return this.crear === true ? 'Nueva Dirección' : 'Editar Dirección'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    // dialogDelete(val) {
    //   val || this.closeDelete()
    // },
  },

  created() {
    this.$emit('reloadTable');
  },

  methods: {
    editItem() {
      this.dialog = true
    },

    close() {
      this.$emit('closeModal');
    },

    save() {
      if (this.crear === false) {
        this.$store.state.services.mantenimientosService.updateDirecciones(this.editedItem).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Dirección modificada exitosamente');
              this.$emit('reloadTable');
              this.close();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }

        });
      } else {
        this.$store.state.services.mantenimientosService.insertDirecciones(this.editedItem).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Dirección registrada exitosamente');
              this.$emit('reloadTable');
            this.close();
          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });
      }
    },
    uppercase() {
      this.editedItem.abreviatura =  this.editedItem.abreviatura.toUpperCase();
    },
  },

}