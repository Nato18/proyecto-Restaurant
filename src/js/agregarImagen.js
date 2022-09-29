import { Dropzone } from "dropzone";

const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

Dropzone.options.imagen = {
  dictDefaultMessage: "Sube una imagen aqui",
  acceptedFiles: ".png,.jpg,jpeg",
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictRemoveFile: "Borrar imagen",
  dictMaxFilesExceeded: "El Limite es 1 imagen",
  headers: {
    "CSRF-Token": token,
  },
  paramName: "imagen",
  init: function(){
    const dropzone = this
    const btnPublicar = document.querySelector('#publicar')
    
    btnPublicar.addEventListener('click', function(){
      dropzone.processQueue()
    })
    dropzone.on("queuecomplete", function(){
      if(dropzone.getActiveFiles().length == 0){
        window.location.href = '/menu/gestionar_menu'

      }
    })
  }
};
