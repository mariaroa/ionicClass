import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TareaProvider } from '../../providers/tarea/tarea';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tareas = [];
  ordenHabilitado = false;

  constructor(
    public navCtrl: NavController,
    private alerta: AlertController,
    private servicioTareas: TareaProvider,
    private toast: ToastController
  ) {
    this.tareas = servicioTareas.obtenerTareas();
  }

  agregarTarea() {
    let alert = this.alerta.create({
      title: "Agregar tarea",
      inputs: [{
        name: "textoTarea",
        type: "text"
      }],
      buttons: [
        {
          text: "Cancelar"
        },
        {
          text: "Agregar",
          handler: (datos) => {
            console.log(datos);
            // this.tareas.push(datos.textoTarea);
            this.servicioTareas.agregarTarea(datos.textoTarea);
            let toast = this.toast.create({
              message: "La tarea fue agregada",
              duration: 2000
            });
            toast.present();
          }
        }
      ]
    });
    alert.present();

  }
  toogleOrdenHabilitado() {
    this.ordenHabilitado = !this.ordenHabilitado;
  }
  ordenarLista(evento) {
    console.log(evento);
    reorderArray(this.tareas, evento);
  }
  archivarTarea(tareaIndex) {
    this.servicioTareas.archivarTarea(tareaIndex);
  }

  editarTarea(tareaIndex) {
    let alert = this.alerta.create({
      title: "Editar tarea",
      inputs: [{
        name: "tareaEditada",
        type: "text",
        value: this.tareas[tareaIndex]
      }],
      buttons: [{
        text: "Cancelar"
      },
      {
        text: "Listo",
        handler: (datos) => {
          this.servicioTareas.editarTarea(datos.tareaEditada, tareaIndex );
        }
      }]
    });
    alert.present();
  }
}
