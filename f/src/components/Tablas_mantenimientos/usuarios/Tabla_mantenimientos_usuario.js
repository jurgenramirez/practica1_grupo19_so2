export default {

  data: () => ({
    searchInput: "",
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    loading: false,
    search: '',
    editedItem: {
      id: 0,
      dpi: 0,
      nombre: '',
      apellido: '',
      seccion: '',
      abreviatura_seccion: ''  ,
      unidad: '',
      abreviatura_unidad: '',
      direccion: '',
      abreviatura_direccion: '',
      email: '',
      puesto: '',
      admin: '',
      deleted_at: ''
    },
    defaultItem: {
      id: 0,
      dpi: 0,
      nombre: '',
      apellido: '',
      seccion: '',
      abreviatura_seccion: '',
      unidad: '',
      abreviatura_unidad: '',
      direccion: '',
      abreviatura_direccion: '',
      email: '',
      puesto: '',
      admin : '',
      deleted_at: ''

    },
    nombre_tabla: "Administración de Usuarios",
    columnas: [
      { text: 'dpi', value: 'dpi' },
      { text: 'Nombres', value: 'nombre' },
      { text: 'Apellidos', value: 'apellido' },
      { text: 'Sección', value: 'seccion' },
      { text: 'Abreviatura Sección', value: 'abreviatura_seccion' },
      { text: 'Unidad', value: 'unidad' },
      { text: 'Abreviatura Unidad', value: 'abreviatura_unidad' },
      { text: 'Dirección', value: 'direccion' },
      { text: 'Abreviatura Dirección', value: 'abreviatura_direccion' },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Puesto', value: 'puesto' },
      { text: 'Admin', value: 'admin' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    filas: [],
    secciones: [],
    secciones_nombre: [],
    puestos: [],
    isAdmin: [true,false],
    puestos_nombre: [],
    idSeccion: -1,
    idPuesto: -1,
    cuiRules: [
      v => !!v || 'CUI obligatorio',
      v => v.length <= 13 || 'El CUI debe contener 13 números' || '',
    ],
    nameRules: [
      v => !!v || 'Nombre obligatorio',
    ],
    emailRules: [
      v => !!v || 'E-mail obligatorio',
      v => /.+@.+/.test(v) || 'E-mail desconocido',
    ],
    apellidoRules: [
      v => !!v || 'Apellido obligatorio',
    ],
    campoRules:[
      v => !!v || 'Campo obligatorio',
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
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
    this.reload(); //carga los datos
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

      if(this.editedItem.deleted_at != null){
        this.$swal.fire({
          title: '¿Está seguro de activar al usuario?',
          text: "Activación de usuario",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.state.services.mantenimientosService.deleteUser(this.editedItem.id).then(() => {
              this.$swal.fire(
                'Usuario Activado',
                'Has activado al usuario',
                'success'
              )
              this.reload();
              this.closeDelete();
            });
  
          }
        });

      }else{
        this.$swal.fire({
          title: '¿Está seguro de inactivar al usuario?',
          text: "Inactivación de usuario",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.state.services.mantenimientosService.deleteUser(this.editedItem.id).then(() => {
              this.$swal.fire(
                'Usuario inactivado',
                'Has desactivado al usuario',
                'success'
              )
              this.reload();
              this.closeDelete();
            });

          }
        });
      }
    },

    close() {
      this.dialog = false
      this.editedItem = Object.assign(this.editedItem, this.defaultItem)
      this.loading = false;
      this.editedIndex = -1
      this.idSeccion = -1;//se limpia la variable auxiiar  
      this.idPuesto = -1;
    },

    closeDelete() {
      this.dialogDelete = false
      this.editedItem = this.defaultItem
      this.editedIndex = -1
      this.loading = false;
      this.editedIndex = -1
      this.idSeccion = -1;//se limpia la variable auxiiar  
      this.idPuesto = -1;
    },

    reload() {

      this.$store.state.services.mantenimientosService.getAllUsuarios().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data.usuario;
        this.filas = [];
        data.forEach(element => {
          this.filas.push(element);
        });
      });

      this.$store.state.services.mantenimientosService.getAllSecciones().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.secciones = [];
        this.secciones_nombre = [];
        data.forEach(element => {
          this.secciones_nombre.push(element.seccion); //obtenemos solo el nombre    
          this.secciones.push(element);  //obtenemos todos los datos de las secciones        
        });
      })

      this.$store.state.services.mantenimientosService.getAllPuesto().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.puestos;
        this.puestos_nombre = [];
        data.forEach(element => {
          this.puestos_nombre.push(element.descripcion); //obtenemos solo el nombre    
          this.puestos.push(element);  //obtenemos todos los datos de las secciones        
        });
        this.loading = false;
      })
    },
    save() {
      if (this.editedIndex > -1) {
        this.loading = true;
        this.obtenerIdSeccion();
        this.obtenerIdPuesto();
        let body =//se arma el cuerpo de los datos de la actualización
        {
          id: this.editedItem.id,
          nombre: this.editedItem.nombre,
          apellido: this.editedItem.apellido,
          email: this.editedItem.email,
          seccion_id: this.idSeccion,
          puesto_id: this.idPuesto,
          admin: this.editedItem.admin
        }
        this.$store.state.services.mantenimientosService.updateUser(body).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Usuario modificado exitosamente');
              this.reload();
              this.close();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }

        })
      } else {

        this.loading = true;
        this.obtenerIdSeccion();
        this.obtenerIdPuesto();
        let body =//se arma el cuerpo de los datos del registro
        {
          dpi: this.editedItem.dpi,
          nombre: this.editedItem.nombre,
          apellido: this.editedItem.apellido,
          email: this.editedItem.email,
          seccion_id: this.idSeccion,
          puesto_id: this.idPuesto,
          admin: this.editedItem.admin
        }
        this.$store.state.services.mantenimientosService.insertUser(body).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Usuario registrado exitosamente');
            this.dialog = false;
            this.reload();
            this.close();

          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });

      }

    },
    obtenerIdSeccion() {//Obtiene el id del nombre de seccion 
      this.secciones.forEach(element => {
        if (this.editedItem.seccion === element.seccion) {
          this.idSeccion = element.seccion_id;
        }
      });
    },
    obtenerIdPuesto() {//Obtiene el id del nombre del puesto
      this.puestos.forEach(element => {
        if (this.editedItem.puesto === element.descripcion) {
          this.idPuesto = element.id;
        }
      });
    }
  },
}