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
      return this.crear === true ? 'Nuevo Puesto' : 'Editar Puesto'
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
        let body =//se arma el cuerpo de los datos de la actualización
        {
          id: this.editedItem.id,
          descripcion: this.editedItem.descripcion,
        }
        this.$store.state.services.mantenimientosService.updatePuesto(body).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Puesto modificado exitosamente');
              // this.reload();
              this.$emit('reloadTable');
              this.close();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }

        });
      } else {

        this.loading = true;
        let body =//se arma el cuerpo de los datos de la actualización
        {
          descripcion: this.editedItem.descripcion,
        }
        this.$store.state.services.mantenimientosService.insertPuesto(body).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Puesto registrada exitosamente');
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