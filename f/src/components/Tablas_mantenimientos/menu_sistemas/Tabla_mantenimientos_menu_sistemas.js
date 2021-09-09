export default {

  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    loading: false,
    search: '',
    editedItem: {
      id: '',
      nombre: '',
      path: '',
      icon: '',
      detalle: ''
    },

    defaultItem: {
      id: '',
      nombre: '',
      path: '',
      icon: '',
      detalle: ''
    },

    nombre_tabla: "Administración de Sistemas",
    columnas: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Path', value: 'path' },
      { text: 'Icono', value: 'icon' },
      { text: 'Detalle', value: 'detalle' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    filas: [],
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
      return this.editedIndex === -1 ? 'Nuevo sistema' : 'Editar sistema'
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
    this.reload(); //carga toda la informacion
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.filas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      console.log(this.editedItem)
    },
    //Este metodo no se utiliza dado que no esta permitido la elminacion
    deleteItem(item) {
      this.editedIndex = this.filas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$swal.fire({
        title: '¿Está seguro de eliminar la Dirección?',
        text: "Eliminando dirección del sistema",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.state.services.mantenimientosService.deleteDirecciones(this.editedItem.id).then(() => {
            this.$swal.fire(
              'Dirección borrada',
              'Ha eliminado la Dirección',
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
      this.editedItem = Object.assign(this.editedItem, this.defaultItem)
      this.editedIndex = -1
      this.idDireccion = null;//se limpia la variable auxiiar
    },

    closeDelete() {
      this.dialogDelete = false
      this.editedItem = this.defaultItem;
      this.loading = false
      this.editedItem = ''
      this.editedIndex = -1
      this.idDireccion = null;//se limpia la variable auxiiar

    },

    reload() {

      this.$store.state.services.mantenimientosService.getAllSistemas().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.filas = [];
        data.forEach(element => {
          this.filas.push(element);
        });
        this.loading = false;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        this.loading = true;
        let body =//se arma el cuerpo de los datos de la actualización
        {
          id: this.editedItem.id,
          nombre: this.editedItem.nombre,
          path: this.editedItem.path,
          icon : this.editedItem.icon,
          detalle: this.editedItem.detalle
        }

        this.$store.state.services.mantenimientosService.updateSistema(body).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Sistema modificado exitosamente');
              this.reload();
              this.close();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }

        });
      } else {

        this.loading = true;
        let body =//se arma el cuerpo de los datos del insert
        {
          nombre: this.editedItem.nombre,
          path: this.editedItem.path,
          icon : this.editedItem.icon,
          detalle: this.editedItem.detalle
        }
        this.$store.state.services.mantenimientosService.insertSistema(body).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Sistema registrado exitosamente');
            this.reload();
            this.close();
          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });
      }

    },

  },
}