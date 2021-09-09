import CryptoJS from "crypto-js";

export default {
  props : ['sistema_id','refresh'],
  created() {
    //Desincriptacion de datos del usuario (valor, clave)
    var informacion_incriptada = sessionStorage.getItem('#$%ffsdf.fDSD-32*');
    var key_pass = atob(sessionStorage.getItem('$DSDdse3423..32')) + "m3m@21"
    var bytes = CryptoJS.AES.decrypt(informacion_incriptada, key_pass);
    //Casteo de información a estring
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    //Casteo de JSON String a Object json
    var r = JSON.parse(originalText)

    let usuario = r.usuario[0];
    usuario.primer_nombre = usuario.nombre.split(' ')[0];
    usuario.segundo_nombre = usuario.nombre.split(' ')[1];
    usuario.primer_apellido = usuario.apellido.split(' ')[0];
    usuario.segundo_apellido = usuario.apellido.split(' ')[1];
    usuario.foto = r.foto;
    this.user = usuario;

    //consumo de los datos del menu , según el sistema seleccionado
    this.reload();

  },
  data() {
    return {
      verInfoUsuario: false,
      verInfo: false,
      user: null,
      drawer: true,
      mini: false,
      selectedItem: 0,
      items: [
        { text: 'Sistemas', icon: 'mdi-view-dashboard', path: "/dash" },
        // { text: 'Compras o entradas', icon: 'mdi-home-plus', path:"/compras"},
        // { text: 'Despachos o Salidas', icon: 'mdi-home-remove', path:"/settings" },
        // { text: 'Reportes', icon: 'mdi-text-box-multiple', path:"/reportes" },
        // { text: 'Tarjetas de inventario', icon: 'mdi-tablet-dashboard', path:"/settings" },
      ],

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
  watch:{
    refresh(){//al recibir la llamada ejecuta la transacción 
      this.reload();
    }
  },
  methods: {
    cerrarSesion() {
      let url = "/"
      const clave_token = "$DSDdse3423..32"
      const clave_data = "#$%ffsdf.fDSD-32*"
      sessionStorage.removeItem(clave_token)
      sessionStorage.removeItem(clave_data)
      this.$router.push({ path: url });
    },
    select_item(numero, ruta) {
      try {
        if (this.$route.path !== ruta) this.$router.push({ path: ruta })
        this.mini = true;
      } catch (error) {
        console.log("")
      }
    },
    reload() {
  
      this.$store.state.services.mantenimientosService.findOneLeftMenu(this.sistema_id).then((respuesta) => {
        let r = respuesta;
        var data = r.data.data;
        this.items = [];

        data.forEach(element => {
          var submenu = element.submenu;
          if(submenu.length ===0){//Si no tiene submenus no pasa nada
            var datos = { text:element.nombre,icon:element.icon, path:element.path, orden:element.orden, submenu:element.submenu}
            this.items.push(datos);
          }else{//De tener sub menus debemos recorrer el array para luego ordenar por orden
            var subaux = [];//array auxiliar
            submenu.forEach(element => {
              var subdatos = { text:element.nombre,icon:element.icon, path:element.path, orden:element.orden}
              subaux.push(subdatos);
            });
            //una vez mapeado los datos de los submenus, se ordenan segun el "orden"
            subaux.sort((a,b) => (a.orden > b.orden) ? 1 : ((b.orden > a.orden) ? -1 : 0))
            var datos1 = { text:element.nombre,icon:element.icon, path:element.path, orden:element.orden, submenu:subaux}
            this.items.push(datos1);
          }

        });
        this.items.sort((a,b) => (a.orden > b.orden) ? 1 : ((b.orden > a.orden) ? -1 : 0))

        this.loading = false;
      });
    },
  },

}