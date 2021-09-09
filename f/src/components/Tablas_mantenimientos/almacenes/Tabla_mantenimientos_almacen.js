export default {

  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    loading: false,
    loadingAutoComplete: false,
    search: '',
    editedItem: {
      id: 0,
      descripcion: '',
      direccion_id: 0,
      direccion: '',
      encargado_id: 0,
      encargado: '',
    },

    defaultItem: {
      id: 0,
      descripcion: '',
      direccion_id: 0,
      direccion: '',
      encargado_id: 0,
      encargado: ''
    },
    selecionarUsuario: false,
    idDireccion: -1,
    idUser: -1,
    direcciones: [],
    usuarios: [],
    nombre_tabla: "Administración de Almacenes",
    columnas: [
      { text: 'Descripción', value: 'descripcion' },
      { text: 'Direccion', value: 'direccion' },
      { text: 'Encargado', value: 'encargado' },
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
      return this.editedIndex === -1 ? 'Nueva Dirección' : 'Editar Dirección'
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
      if (this.editedIndex > 1) {
        this.selecionarUsuarioCarga()
      }
    },

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
      this.idDireccion = -1;//se limpia la variable auxiiar
      this.idUser = -1
      this.selecionarUsuario = false;
      this.usuario = [];
    },

    closeDelete() {
      this.dialogDelete = false
      this.editedItem = this.defaultItem
      this.editedIndex = -1

    },

    reload() {

      this.$store.state.services.almacenService.getAllAlmacenes().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.filas = [];
        this.filas = Object.assign(this.filas, data)
      });

      this.$store.state.services.mantenimientosService.getAllDirecciones().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.direcciones = [];
        this.direcciones = Object.assign(this.direcciones, data)
        this.loading = false;
      });
    },

    save() {

      if (this.editedIndex > -1) {
        this.loading = true;
        // obtenemos el dato mediante el nombre de la direccion
        let dataDireccionSelect = this.direcciones.filter(x => x.nombre === this.editedItem.direccion);
        // obtenemos el dato mediante el nombre completo
        let dataUsuarioSelect = this.usuarios.filter(x => x.nombre_completo === this.editedItem.encargado);

        this.idDireccion = dataDireccionSelect[0].id;
        this.idUser = dataUsuarioSelect[0].id;

        let body =//se arma el cuerpo de los datos de la actualización     
        {
          id: this.editedItem.id,
          descripcion: this.editedItem.descripcion,
          direccion_id: this.idDireccion,
          encargado_id: this.idUser
        }
        console.log("data", body)

        this.$store.state.services.almacenService.updateAlmacen(body).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Alamacén modificado exitosamente');
              this.reload();
              this.close();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }

        });
      } else {

        this.loading = true;
        // obtenemos el dato mediante el nombre de la direccion
        let dataDireccionSelect = this.direcciones.filter(x => x.nombre === this.editedItem.direccion);
        // obtenemos el dato mediante el nombre completo
        let dataUsuarioSelect = this.usuarios.filter(x => x.nombre_completo === this.editedItem.encargado);

        this.idDireccion = dataDireccionSelect[0].id;
        this.idUser = dataUsuarioSelect[0].id;

        let body =//se arma el cuerpo de los datos de la insercción        
        {
          descripcion: this.editedItem.descripcion,
          direccion_id: this.idDireccion,
          encargado_id: this.idUser
        }

        this.$store.state.services.almacenService.insertAlmacen(body).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Almacén registrado exitosamente');
            this.reload();
            this.close();
          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });
      }
    },
    uppercase() {
      this.editedItem.abreviatura = this.editedItem.abreviatura.toUpperCase();
    },
    selecionarUsuarioCarga() {
      this.loadingAutoComplete = true;
      this.selecionarUsuario = true;
      let dataDireccionSelect = this.direcciones.filter(x => x.nombre === this.editedItem.direccion);
      // obtenemos el dato mediante el nombre completo
      this.idDireccion = dataDireccionSelect[0].id;

      this.$store.state.services.mantenimientosService.getUsuariosDireccion(this.idDireccion).then((respuesta) => {
        let r = respuesta;
        var data = r.data.data.usuario;
        if (data !== null) {
          this.usuarios = [];
          this.usuarios = Object.assign(this.usuarios, data)
          this.loadingAutoComplete = false;
        }
      })
      //this.selecionarUsuario = this.selecionarUsuario === true ? false : true;
    }

  },

}