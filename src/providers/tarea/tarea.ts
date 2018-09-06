import { Injectable } from '@angular/core';

/*
  Generated class for the TareaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TareaProvider {

  tareas = [];
  tareasArchivadas = [];
  constructor() {
    console.log('Hello TareaProvider Provider');
  }

  obtenerTareas(){
    return this.tareas;
  }

  obtenerTareasArchivadas(){
    return this.tareasArchivadas;
  }
  agregarTarea(tarea){
    this.tareas.push(tarea);
  }

  archivarTarea(indice){
    this.tareasArchivadas.push(this.tareas[indice]);
    console.log(this.tareasArchivadas);
    this.tareas.splice(indice,1);
  }

  editarTarea(tarea, indice){
    this.tareas[indice] = tarea;
  }

}
