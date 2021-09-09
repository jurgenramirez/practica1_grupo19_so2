export default {

  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    loading: false,
    search: '',
    editedItem: {
      unidad_id: 0,
      unidad: '',
      abreviatura: '',
      direccion: '',
      deleted_at: ''
    },

    defaultItem: {
      unidad_id: 0,
      unidad: '',
      abreviatura: '',
      direccion: '',
      deleted_at: ''
    },

    nombre_tabla: "Administración de Unidad",
    columnas: [
      { text: 'Nombre', value: 'unidad' },
      { text: 'Abreviatura', value: 'abreviatura' },
      { text: 'Direccion', value: 'direccion' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    filas: [],
    direcciones: [],
    direcciones_nombre: [],
    idDireccion: -1,
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
      return this.editedIndex === -1 ? 'Nueva unidad' : 'Editar unidad'
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
      console.log(this.editedItem)
    },

    deleteItem(item) {
      this.editedIndex = this.filas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$swal.fire({
        title: '¿Está seguro de eliminar la unidad?',
        text: "Eliminando unidad del sistema",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.state.services.mantenimientosService.deleteUnidades(this.editedItem.unidad_id).then(() => {
            this.$swal.fire(
              'Unidad borrada',
              'Ha eliminado la unidad',
              'success'
            )
            this.reload();
          });

        }
      });
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
    },

    closeDelete() {
      this.dialogDelete = false
      this.loading = false
      this.editedItem = this.defaultItem
      this.editedIndex = -1
    },

    reload() {

      this.$store.state.services.mantenimientosService.getAllUnidades().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.filas = [];
        data.forEach(element => {
          this.filas.push(element);
        });
      });

      this.$store.state.services.mantenimientosService.getAllDirecciones().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        data.forEach(element => {
          this.direcciones_nombre.push(element.nombre); //obtenemos solo el nombre    
          this.direcciones.push(element);  //obtenemos todos los datos de las secciones        
        });
        this.loading = false;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        this.loading = true;
        this.obtenerIdSeccion();
        let body =//se arma el cuerpo de los datos de la actualización
        {
          id: this.editedItem.unidad_id,
          nombre: this.editedItem.unidad,
          abreviatura: this.editedItem.abreviatura,
          direccion_id: this.idDireccion
        }
        //console.log(body)
        this.$store.state.services.mantenimientosService.updateUnidades(body).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Unidad modificada exitosamente');
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
          nombre: this.editedItem.unidad,
          abreviatura: this.editedItem.abreviatura,
          direccion_id: this.idDireccion,
        }
        //console.log(body)
        this.$store.state.services.mantenimientosService.insertUnidades(body).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Unidad registrada exitosamente');
            this.dialog = false;
            this.reload();
            this.close();
          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });
      }
    },
    obtenerIdSeccion() {
      this.direcciones.forEach(element => {
        if (this.editedItem.direccion === element.nombre) {
          this.idDireccion = element.id;
        }
      });
    },
    uppercase() {
      this.editedItem.abreviatura = this.editedItem.abreviatura.toUpperCase();
    },
  },
}