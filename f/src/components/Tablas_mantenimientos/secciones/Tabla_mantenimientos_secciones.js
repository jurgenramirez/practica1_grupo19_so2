export default {

  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    loading: false,
    search: '',
    editedItem: {
      seccion_id: 0,
      seccion: '',
      abreviatura: '',
      unidad: '',
      deleted_at: ''
    },
    defaultdItem: {
      seccion_id: 0,
      seccion: '',
      abreviatura: '',
      unidad: '',
      deleted_at: ''
    },

    nombre_tabla: "Administración de Sección",
    columnas: [
      { text: 'Sección', value: 'seccion' },
      { text: 'Abreviatura', value: 'abreviatura' },
      { text: 'Unidad', value: 'unidad' },
      { text: 'Dirección', value: 'direccion' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    filas: [],
    unidades: [],
    unidades_nombre: [],
    idUnidad: -1,
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
      return this.editedIndex === -1 ? 'Nueva sección' : 'Editar sección'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.loading = true;
    this.reload(); //carga toda la información
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.filas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    
    deleteItem(item) {
      this.editedIndex = this.filas.indexOf(item)
      this.editedItem = Object.assign({}, item)

      if (this.editedItem.deleted_at != null) {
        this.$swal.fire({
          title: '¿Está seguro de activar la sección?',
          text: "Activación de sección",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.state.services.mantenimientosService.deleteSeccion(this.editedItem.seccion_id).then(() => {
              this.$swal.fire(
                'Sección Activada',
                'Has activado la sección',
                'success'
              )
              this.reload();
              this.closeDelete();
            });

          }
        });

      } else {
        this.$swal.fire({
          title: '¿Está seguro de inactivar la sección?',
          text: "Inactivación de sección",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.state.services.mantenimientosService.deleteSeccion(this.editedItem.seccion_id).then(() => {
              this.$swal.fire(
                'Sección inactivada',
                'Has desactivado la ',
                'success'
              )
              this.reload();
              this.closeDelete();
            });
          }
        });
      }
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.loading = false
      this.idSeccion = null;//se limpia la variable auxiiar
      this.editedItem = Object.assign(this.editedItem, this.defaultItem)
      this.editedIndex = -1
      this.idSeccion = -1;//se limpia la variable auxiiar
    },

    closeDelete() {
      this.dialogDelete = false
      this.editedItem = this.defaultdItem
      this.editedIndex = -1
    },
    reload() {
      this.$store.state.services.mantenimientosService.getAllSecciones().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.filas = [];
        data.forEach(element => {
          this.filas.push(element);
        });
      });
      this.$store.state.services.mantenimientosService.getAllUnidades().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        data.forEach(element => {
          this.unidades_nombre.push(element.unidad); //obtenemos solo el nombre    
          this.unidades.push(element);  //obtenemos todos los datos de las secciones        
        });
        this.loading = false;
      })

    },
    save() {
      if (this.editedIndex > -1) {
        this.loading = true;
        this.obtenerIdSeccion();
        let body =//se arma el cuerpo de los datos de la actualización
        {
          id: this.editedItem.seccion_id,
          nombre: this.editedItem.seccion,
          abreviatura: this.editedItem.abreviatura,
          unidad_id: this.idUnidad,
        }
        this.$store.state.services.mantenimientosService.updateSeccion(body).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Sección modificada exitosamente');
              this.reload();
              this.close();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }

        });


      } else {

        this.loading = true;
        this.obtenerIdSeccion();
        let body =//se arma el cuerpo de los datos de la actualización
        {
          nombre: this.editedItem.seccion,
          abreviatura: this.editedItem.abreviatura,
          unidad_id: this.idUnidad,
        }
        this.$store.state.services.mantenimientosService.insertSeccion(body).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Sección registrada exitosamente');
              this.reload();
              this.close();
          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });
   
  
      }
    
    },
    obtenerIdSeccion() {
      this.unidades.forEach(element => {
        if (this.editedItem.unidad === element.unidad) {
          this.idUnidad = element.unidad_id;
        }
      });
    },
    uppercase() {
      this.editedItem.abreviatura =  this.editedItem.abreviatura.toUpperCase();
    },
  },
}