export default {
  props: ['dialog', 'crear', 'editedItem'],
  name: "dialog_direcciones",
  data: () => ({
    tiposMedida: [],
    loadingAutoComplete: true,
    nameRules: [
      v => !!v || 'Nombre obligatorio',
    ],
    abreRules: [
      v => !!v || 'Abreviatura obligatoria',
    ],
    campoRules: [
      v => !!v || 'Campo obligatorio',
    ],

  }),

  computed: {
    formTitle() {
      return this.crear === true ? 'Nuevo Producto' : 'Editar Producto'
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
    this.getMedidas();
    this.$emit('reloadTable');
  },

  
  methods: {
    getMedidas(){
      this.$store.state.services.tipomedidaService.getAllTipoMedida()
      .then((r) => {
        try {
          let data = r.data.data;
          console.log('data');
          this.tiposMedida = [];
          this.tiposMedida = Object.assign(this.tiposMedida, data)
          this.loadingAutoComplete = false;
          this.loading = false;
        } catch (error) {
          this.$toast.error('Error en la solicitud');
        }
      });
    },

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
    
        // obtenemos el dato mediante el nombre de la direccion
        let dataTipoMedida = this.tiposMedida.filter(x => x.descripcion === this.editedItem.tipo_medida);
       
        this.editedItem.tipo_medida_id = dataTipoMedida[0].id;
        console.log("encontrado",dataTipoMedida[0].id);

        this.$store.state.services.productosService.updateProducto(this.editedItem).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Producto modificado exitosamente');
              this.$emit('reloadTable');
              this.close();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }
          

        });
      } else {

        this.loading = true;
        // obtenemos el dato mediante el nombre de la direccion
        let dataTipoMedida = this.tiposMedida.filter(x => x.descripcion === this.editedItem.tipo_medida);
       
        //console.log("data",this.editedItem);
        this.editedItem.tipo_medida_id = dataTipoMedida[0].id;
        console.log("encontrado",dataTipoMedida[0].id);

        this.$store.state.services.productosService.insertProducto(this.editedItem).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Producto registrado exitosamente');
            this.$emit('reloadTable');
            this.close();
          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });
      }
    },
  },

}