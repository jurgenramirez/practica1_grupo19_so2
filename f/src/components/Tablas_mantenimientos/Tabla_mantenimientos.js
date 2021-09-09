import dialog_direcciones from "../Tablas_mantenimientos/dialogs/direcciones/dialog_direcciones.vue";
import dialog_puestos from "../Tablas_mantenimientos/dialogs/puestos/dialog_puestos.vue";
import dialog_productos from "../Tablas_mantenimientos/dialogs/productos/dialog_productos.vue";
import dialog_tiposmedida from "../Tablas_mantenimientos/dialogs/tipos_medida/dialog_tiposmedida.vue";
export default {
  props: ['nombre_tabla', 'columnas', 'filas', 'boton', 'direccion', 'puesto', 'producto','tipo_medida' ,'editedItem', 'defaultItem'],
  components: {
    dialog_puestos,
    dialog_direcciones,
    dialog_productos,
    dialog_tiposmedida
  },
  data: () => ({
    crear: null,
    dialogDireccion: false,
    dialogPuesto: false,
    dialogProducto: false,
    dialogTipoMedida: false,

    loading: false,
    search: '',
    edit: null,
  }),

  created() {
    this.loading = true;
    this.edit = this.editedItem;
  },

  watch:{
    filas(){
      if (this.filas !== undefined || this.filas !== null || this.filas.length !== 0) {
        this.loading = false;
      }
    }
  },

  methods: {

    // DIRECCION
    crearDireccion(){
      this.crear = true;
      this.dialogDireccion = true
    },

    editItemDireccion(item) {
      this.edit = Object.assign({}, item)
      this.dialogDireccion = true
      this.crear = false;
    },

    closeDireccion() {
      this.dialogDireccion = false;
      this.loading = false
      this.edit = Object.assign(this.editedItem, this.defaultItem)
      this.idDireccion = null;//se limpia la variable auxiiar
    },

    reloadDirecciones() {
      this.$emit('reloadDirecciones');
    },

    // PUESTO
    crearPuesto(){
      this.crear = true;
      this.dialogPuesto = true
    },

    editItemPuesto(item) {
      this.edit = Object.assign({}, item)
      this.dialogPuesto = true
      this.crear = false;
    },

    closePuesto() {
      this.dialogPuesto = false;
      this.loading = false
      this.edit = Object.assign(this.editedItem, this.defaultItem);
    },

    reloadPuesto() {
      this.$emit('reloadPuesto');
    },

    // PRODUCTO
    crearProducto(){
      this.crear = true;
      this.dialogProducto = true
    },

    editItemProducto(item) {
      this.edit = Object.assign({}, item)
      this.dialogProducto = true
      this.crear = false;
    },

    closeProducto() {
      this.dialogProducto = false;
      this.loading = false
      this.edit = Object.assign(this.editedItem, this.defaultItem);
    },

    reloadProducto() {
      this.$emit('reloadProducto');
    },

    // TIPO MEDIDA
    crearTiposMedida(){
      this.crear = true;
      this.dialogTipoMedida = true
    },

    editItemTiposMedida(item) {
      this.edit = Object.assign({}, item)
      this.dialogTipoMedida = true
      this.crear = false;
    },

    closeTiposMedida() {
      this.dialogTipoMedida = false;
      this.loading = false
      this.edit = Object.assign(this.editedItem, this.defaultItem);
    },


    reloadTiposMedida(){
      this.$emit('reloadTiposMedida');
    }
  },

}