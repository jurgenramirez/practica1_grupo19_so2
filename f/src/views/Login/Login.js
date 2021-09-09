import logo_back from "@/assets/fondo_foto.png";
//import store from '../../store/index'
//import Axios from "axios";
//import CryptoJS from "crypto-js";
import { tree } from 'vued3tree'

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {

  created() {
    console.log("url usada", process.env.VUE_APP_SERVICE_URL)
   // this.reload();
  this.ejecutar()
  this.$store.state.services.loginService.getCpu()
  .then((respuesta) => {
    this.tree = {};
    let body = { 
      nombre: "Raiz",
      children: []
    };
      let data = respuesta.data
      let procesos = data.process;
      procesos.forEach(element => {
          let hijos = element.hijos;
          let hijosaux = [];
          hijos.forEach(element => {
            let nieto = {
              nombre: element.nombre + " Ram:" + element.ram + " Pid:"+element.pid+ " usuario:" + element.usuario + " Estado: "+element.estado,
            }
            
            hijosaux.push(nieto);
          });

          let hijo = { 
            nombre: element.nombre + " Ram:" + element.ram + " Pid:"+element.pid+ " usuario:" + element.usuario + " Estado: "+element.estado,
            children: hijosaux,
            }

        body.children.push(hijo)
      });
        this.cantidad_procesos = data.process_total
        this.tree =body
        console.log(data.process);
      console.log("data tree",this.tree)
  })
  },
  components: {
    tree
  },

  data: () => ({
    cantidad_running : [],
    cantidad_ejecucion : [],
    cantidad_sleeping : [],
    cantidad_detenidos : [],
    cantidad_zombies :[],
    cantidad_procesos: 0,
    datatimer : '',
    consola_ram: '',
    fill: false,
    selectedGradient: gradients[5],
    gradients,
    padding: 15,
    radius: 15,
    value: [],
    width: 1,
    reveal: false,
    step: 1,
    logo_back,
    isUpper: false,
    acceso: {
      cui: null,
      pass: null,
    },
    loading: false,
    tree : null,
  
  }),
  props: {
    source: String
  },
  methods: {
    ejecutar(){
      this.datatimer =window.setInterval(this.reload, 3000);
    },
  
    reload(){
      this.$store.state.services.loginService.getRam()
      .then((respuesta) => {
          let data = respuesta.data
          this.consola_ram = data;
          this.value.push(data.ram_usage)
          console.log("Memoria usada",data.ram_usage);
      })
  
    
  
    },
    recargar_arbol(){
     
    },
    tipo_proceso(tipo){
      
    }    //mas metodos
  }
};