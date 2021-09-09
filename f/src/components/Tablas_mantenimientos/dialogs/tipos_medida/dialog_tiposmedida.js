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
      return this.crear === true ? 'Nuevo Tipo Medida' : 'Editar Tipo de medida'
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
      console.log(this.editedItem)
    },

    close() {
      this.$emit('closeModal');
    },

    save() {
      if (this.crear === false) {
        this.loading = true;

        this.$store.state.services.tipomedidaService.updateTipoMedida(this.editedItem).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Tipo de medida modificado exitosamente');
              // this.reload();
              this.$emit('reloadTable');
              this.close();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }

        });
      } else {

        this.$store.state.services.tipomedidaService.insertTipoMedida(this.editedItem).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Tipo de medida registrado exitosamente');
            // this.reload();
            this.$emit('reloadTable');
            this.close();
          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });
      }
    },
    // uppercase() {
    //   this.editedItem.abreviatura =  this.editedItem.abreviatura.toUpperCase();
    // },
  },

}