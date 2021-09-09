export default {
  props: ['sistema_id', 'nombre_sistema'],
  data: () => ({
    menu_id_actual: 0,
    dialog: false,
    dialogsub: false,
    mostrar_tabla_submenus: false,
    activar_agregar_menu: true,
    dialogDelete: false,
    editedIndex: -1,
    editedIndexSub: -1,
    loading: false,
    search: '',

    editedItem: {//edicion de menus
      id: '',
      nombre: '',
      path: '',
      icon: '',
      orden: 0,
      sistema_id: 0,
      submenu: [],
      deleted_at :''
    },

    editedItemSub: {//edicion de sub menus
      id: '',
      nombre: '',
      path: '',
      icon: '',
      orden: 0,
      menu_id: 0,
      deleted_at :''
    },

    defaultItemSub: {//limpiar los submenus
      id: '',
      nombre: '',
      path: '',
      icon: '',
      orden: 0,
      menu_id: 0,
      deleted_at :''
    },

    defaultItem: {//limpiar los menus
      id: '',
      nombre: '',
      path: '',
      icon: '',
      orden: 0,
      sistema_id: 0,
      submenu: [],
      deleted_at :''
    },

    nombre_tabla: '',
    columnas: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Path', value: 'path' },
      { text: 'Icono', value: 'icon' },
      { text: 'Orden', value: 'orden' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    filas: [],
    filas_submenu: [],
    nameRules: [
      v => !!v || 'Nombre obligatorio',
    ],
    abreRules: [
      v => !!v || 'Abreviatura obligatoria',
    ],
    puestoActuales: [],
    isUpdating: false,
    autoUpdate: true,
    puestos: [],
    editedPuesto: false,
  }),

  computed: {//titulo de los dialog o modales
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo menú' : 'Editar menú'
    },
    formTitleSubMenu() {
      return this.editedIndexSub === -1 ? 'Nuevo sub Item' : 'Editar sub items'
    },
  },

  watch: {
    dialog(val) {//cierra el dialog de menú
      val || this.close()
    },
    dialogsub(val) {
      val || this.closedialogsub()// cierra el dialog de submenú
    },
    dialogDelete(val) {// para eliminar el dialog de delte
      val || this.closeDelete()
    },
  },

  created() { //carga los menús segun el sistema
    this.loading = true;
    this.nombre_tabla = "Menú " + this.nombre_sistema,
      this.reload(); //carga toda la informacion
  },

  methods: {

    editItemRoles(item) {//edición de los roles
      this.editedIndex = this.filas_submenu.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedPuesto = true

      this.$store.state.services.mantenimientosService.getAllPuesto().then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.puestos = [];
        data.forEach(element => {
          this.puestos.push(element);
        });
        this.loading = false;
      });


      this.$store.state.services.mantenimientosService.findRolsMenu(this.editedItem.id).then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.puestoActuales = [];
        data.forEach(element => {
          this.puestoActuales.push(element.puesto);
        });
        this.loading = false;
      });

    },
    remove(item) {// remueve roles
      this.puestoActuales = this.puestoActuales.filter(x => x.descripcion !== item);
    },
    registrarPuesto() {// actualiza los registros

      let body = [];
      this.puestoActuales.forEach(element => {
        let item = { puesto_id: element.id, menu_id: this.editedItem.id }

        body.push(item);
      });

      console.log(body);
      // var body = {  puesto};
      this.$store.state.services.mantenimientosService.insertPuestos(body)
        .then((respuesta) => {
          let r = respuesta;
          console.log(r)
          this.$toast.success("Puestos actualizados exitosamente")
        });
    },
    editItem(item) {//abre el modal de edición de los menus
      this.editedIndex = this.filas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    editItemSubMenu(item) {//abre la tabla de sub menus
      this.editedIndex = this.filas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.mostrar_tabla_submenus = true
      this.activar_agregar_menu = false
      this.$store.state.services.mantenimientosService.findOneLeftMenu(this.sistema_id).then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.filas_submenu = [];
        this.menu_id_actual = item.id;
        data.forEach(element => {
          if (item.id === element.id) {
            element.submenu.forEach(element => {
              this.filas_submenu.push(element)
            });
            return;// si lo encuentra sale
          }
        });
        this.loading = false;
      });
    },

    editItemAux(item) { //abre el dialog o modal de edición de sub menus
      //aux porque es parte de la edición de submeú y no se mezcle con editItemSubMenu 
      this.editedIndexSub = this.filas_submenu.indexOf(item)
      this.editedItemSub = Object.assign({}, item)
      this.dialogsub = true
    },

    deleteItem(item) {//Este metodo no se utiliza dado que no esta permitido la elminacion
      this.editedIndexSub = this.filas_submenu.indexOf(item)
      this.editedItemSub = Object.assign({}, item)
      this.$swal.fire({
        title: '¿Está seguro de desactivar el sub menú?',
        text: "Eliminando sub menú del sistema",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.state.services.mantenimientosService.deleteSubMenu(this.editedItemSub.id).then(() => {
            this.$swal.fire(
              'Sub menú borrado',
              'Ha eliminado el sub mnú',
              'success'
            )
            this.reloadsubitems();
          });
          this.$emit('carga');// emiter que envua una acción a otro componente
  
        }
      });
    },
    close() {//cierra la ventana emergente (dialog/modal) de la edición de menu
      this.dialog = false;
      this.mostrar_tabla_submenus = false;
      this.loading = false;
      this.editedItem = Object.assign(this.editedItem, this.defaultItemSub)
      this.editedIndex = -1;
      this.idDireccion = null;//se limpia la variable auxiiar
      this.editedIndexSub = -1;
      this.editedItemSub = Object.assign(this.editedItemSub, this.defaultItemSub)
    },
    cierra_tabla_sub() {//cierra la tabla de edición de sub menus
      this.dialog = false;
      this.mostrar_tabla_submenus = false;
      this.activar_agregar_menu = true;
      this.loading = false;
      this.editedItem = this.defaultItem;
      this.editedIndex = -1;
      this.idDireccion = null;//se limpia la variable auxiiar
      this.editedIndexSub = -1;
      this.editedItemSub = this.defaultItemSub;
      this.menu_id_actual = 0;
    },

    closedialogsub() {//ciera la ventana (modal o dialog) de la edición de sub menus
      this.dialogsub = false;
      this.editedIndexSub = -1;
      this.editedItemSub = Object.assign(this.editedItemSub, this.defaultItemSub)//limpia variables
    },
    closePuesto() {//cierra la edición de los puestos
      this.dialog = false;
      this.mostrar_tabla_submenus = false;
      this.loading = false;
      this.editedItem = Object.assign(this.editedItem, this.defaultItem);
      this.editedIndex = -1;
      this.idDireccion = null;//se limpia la variable auxiiar
      this.editedIndexSub = -1;
      this.editedItemSub = this.defaultItemSub;
      this.menu_id_actual = 0;
      this.editedPuesto = false;
    },
    closeDelete() {//fuera de uso temporalmente
      this.dialogDelete = false
      this.editedItem = Object.assign(this.editedItem, this.defaultItem);
      this.loading = false
      this.editedItem = ''
      this.editedIndex = -1
      this.idDireccion = null;//se limpia la variable auxiiar
    },

    reload() {//recarga los datos inciales de la tabla los menus del sistema

      this.$store.state.services.mantenimientosService.findOneLeftMenu(this.sistema_id).then((respuesta) => {
        let r = respuesta;
        //console.log(r)
        var data = r.data.data;
        this.filas = [];
        data.forEach(element => {
          this.filas.push(element);
        });
        //se ordenan las filas comparando el actual con el siguiente
        this.filas.sort((a, b) => (a.orden > b.orden) ? 1 : ((b.orden > a.orden) ? -1 : 0))
        this.loading = false;
      });
    },
    reloadsubitems() {// recarga los datos de la tabla de subitems del menu actual que se este editando
      this.$store.state.services.mantenimientosService.findOneLeftMenu(this.sistema_id).then((respuesta) => {
        let r = respuesta;
        //console.log(r)
        var data = r.data.data;
        this.filas_submenu = [];
        //console.log(data);
        this.menu_id_actual = this.editedItem.id;
        data.forEach(element => {
          if (this.menu_id_actual === element.id) {
            element.submenu.forEach(element => {
              this.filas_submenu.push(element)
            });
            return;// si lo encuentra sale
          }
        });
        this.loading = false;
      });
    },
    save() {//guarda los cambios en la edición o creación de un menú
      if (this.editedIndex > -1) {
        this.loading = true;
        let body =//se arma el cuerpo de los datos de la actualización
        {
          id: this.editedItem.id,
          nombre: this.editedItem.nombre,
          path: this.editedItem.path,
          icon: this.editedItem.icon,
          orden: this.editedItem.orden,
          sistema_id: this.sistema_id
        }

        this.$store.state.services.mantenimientosService.updateMenu(body).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Menú modificado exitosamente');
              this.close();
              this.reload();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }
          this.$emit('carga');
        });
      } else {
        this.loading = true;
        let body =//se arma el cuerpo de los datos del insert
        {
          nombre: this.editedItem.nombre,
          path: this.editedItem.path,
          icon: this.editedItem.icon,
          orden: this.editedItem.orden,
          sistema_id: this.sistema_id
        }
        this.$store.state.services.mantenimientosService.insertMenu(body).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Sistema registrado exitosamente');
            this.close();
            this.reload();
          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });
        this.$emit('carga');// emiter que envua una acción a otro componente
      }

    },
    saveSub() {//guarda los cambios en la edición o cración de sub menú
      if (this.editedIndexSub > -1) {
        this.loading = true;
        let body =//se arma el cuerpo de los datos de la actualización
        {
          id: this.editedItemSub.id,
          nombre: this.editedItemSub.nombre,
          path: this.editedItemSub.path,
          icon: this.editedItemSub.icon,
          orden: this.editedItemSub.orden,
          menu_id: this.editedItemSub.menu_id
        }
        this.$store.state.services.mantenimientosService.updateSubMenu(body).then((r) => {
          try {
            if (r.data != null) {
              this.$toast.success('Sub menú modificado exitosamente');
              this.closedialogsub();
              this.reloadsubitems();
            }
          } catch (error) {
            this.$toast.error('Error en la solicitud de modificación', r);
          }
          this.$emit('carga');
        });
      } else {
        this.loading = true;
        let body =//se arma el cuerpo de los datos del insert
        {
          nombre: this.editedItemSub.nombre,
          path: this.editedItemSub.path,
          icon: this.editedItemSub.icon,
          orden: this.editedItemSub.orden,
          menu_id: this.menu_id_actual
        }
        this.$store.state.services.mantenimientosService.insertSubMenu(body).then((r) => {
          try {
            if (r.data.data != null)
              this.$toast.success('Sub menú registrado exitosamente');
            this.closedialogsub();
            this.reloadsubitems();
          } catch (error) {
            this.$toast.error('Error en la solicitud');
          }
        });
        this.$emit('carga');// emiter que envua una acción a otro componente
      }

    },

  },
}