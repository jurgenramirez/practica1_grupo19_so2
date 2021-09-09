import CryptoJS from "crypto-js";

export default {
  created() {
    //console.log("des encriptacion");
    //Desincriptacion de datos del usuario (valor, clave)
    var informacion_incriptada = sessionStorage.getItem('#$%ffsdf.fDSD-32*');
    var key_pass = atob(sessionStorage.getItem('$DSDdse3423..32')) + "m3m@21"
    var bytes = CryptoJS.AES.decrypt(informacion_incriptada, key_pass);
    //Casteo de información a estring
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    //Casteo de JSON String a Object json
    var r = JSON.parse(originalText)
    //console.log(r); // 'data'

    let usuario = r.usuario[0];
    usuario.primer_nombre = usuario.nombre.split(' ')[0];
    usuario.segundo_nombre = usuario.nombre.split(' ')[1];
    usuario.primer_apellido = usuario.apellido.split(' ')[0];
    usuario.segundo_apellido = usuario.apellido.split(' ')[1];
    usuario.foto = r.foto;
    this.user = usuario;


  },
  props: ["cargarmenu"],
  data() {

    return {
      fijarmenu: false,
      mostrarfijar: false,
      mantener_menu: true,
      verInfoUsuario: false,
      verInfo: false,
      user: null,
      drawer: true,
      mini: true,
      selectedItem: 0,
      sistema_id: 0,
      items: [
        { text: 'Sistemas', icon: 'mdi-view-dashboard', path: "/dash", submenu: [] },
        // { text: 'Compras o entradas', icon: 'mdi-home-plus', path:"/compras"},
        // { text: 'Despachos o Salidas', icon: 'mdi-home-remove', path:"/settings" },
        // { text: 'Reportes', icon: 'mdi-text-box-multiple', path:"/reportes" },
        // { text: 'Tarjetas de inventario', icon: 'mdi-tablet-dashboard', path:"/settings" },
      ],

      mantenimientos: [
        { text: 'Usuarios', icon: 'mdi-account-settings', path: "/mantenimientos_usuarios" },
        { text: 'Direcciones', icon: 'mdi-google-circles-communities', path: "/mantenimientos_direcciones" },
        { text: 'Unidades', icon: 'mdi-gamepad-circle', path: "/mantenimientos_unidades" },
        { text: 'Secciones', icon: 'mdi-drawing', path: "/mantenimientos_secciones" },
        { text: 'Puestos', icon: 'mdi-account-network-outline', path: "/mantenimiento_puestos" },
        { text: 'Sistemas', icon: 'mdi-desktop-mac-dashboard', path: "/mantenimientos_menu_sistemas" },
        { text: 'Menu lateral', icon: 'mdi-format-list-bulleted-type', path: "/mantenimientos_menu_lateral" }
      ],
    }
  },
  watch: {
    cargarmenu() {//al recibir la llamada ejecuta la transacción 
      this.reload();
    },
    fijarmenu() {//al recibir la llamada ejecuta la transacción      
      this.mostrarfijar = true;
      this.verInfoUsuario = false;
      if (this.fijarmenu) {
        this.mini = false;
      } else {
        this.mini = true;
      }
    }
  },
  computed: {
    foto() {
      try {
        return atob(this.user.foto);
      } catch (error) {
        return '';
      }
    },
  },
  methods: {
    cerrarSesion() {
      let url = "/"
      const clave_token = "$DSDdse3423..32"
      const clave_data = "#$%ffsdf.fDSD-32*"
      const clave_sistema = "000"
      sessionStorage.removeItem(clave_token)
      sessionStorage.removeItem(clave_data)
      sessionStorage.removeItem(clave_sistema)
      this.$router.push({ path: url });
    },
    select_item(numero, ruta) {
      try {

        if (this.$route.path === ruta) {
          console.log("")
        } else {
          this.$router.push({ path: ruta }).catch(error => {
            if (
              error.name !== 'NavigationDuplicated' &&
              !error.message.includes('Avoided redundant navigation to current location')
            ) {
              console.log(error)
            }
          })
        }
      } catch (error) {
        console.log("")
      }
    },
    reload() {
      this.items = [];
      this.sistema_id = sessionStorage.getItem("000");
      let data = { text: 'Sistemas', icon: 'mdi-view-dashboard', path: "/dash", submenu: [] };
      this.items.push(data);

      if (this.sistema_id != null) {
        this.$store.state.services.mantenimientosService.findOneLeftMenu(this.sistema_id).then((respuesta) => {
          let r = respuesta;

          var data = r.data.data;
          data.forEach(element => {
            var submenu = element.submenu;
            if (submenu.length === 0) {//Si no tiene submenus no pasa nada
              var datos = { text: element.nombre, icon: element.icon, path: element.path, orden: element.orden, submenu: element.submenu }
              this.items.push(datos);
            } else {//De tener sub menus debemos recorrer el array para luego ordenar por orden
              var subaux = [];//array auxiliar
              submenu.forEach(element => {
                var subdatos = { text: element.nombre, icon: element.icon, path: element.path, orden: element.orden }
                subaux.push(subdatos);
              });
              //una vez mapeado los datos de los submenus, se ordenan segun el "orden"
              subaux.sort((a, b) => (a.orden > b.orden) ? 1 : ((b.orden > a.orden) ? -1 : 0))
              var datos1 = { text: element.nombre, icon: element.icon, path: element.path, orden: element.orden, submenu: subaux }
              this.items.push(datos1);
            }

          });
          this.items.sort((a, b) => (a.orden > b.orden) ? 1 : ((b.orden > a.orden) ? -1 : 0))
          //console.log(this.items);
          this.loading = false;
        });
      }
    },
  },


}