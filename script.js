// script.js

import { db } from './database.js';

// Guardar dato
function guardarDato(dato) {
    db.ref("coleccion").push(dato); 
  }
  
  // Leer datos
  db.ref("coleccion").on("value", snapshot => {
    // obtener datos de snapshot
  });
  
// Array para almacenar los registros
const registros = []; 

// Función para agregar un registro
function agregarRegistro() {

  // Obtener datos del formulario
  const fecha = document.getElementById('fecha').value;
  const concepto = document.getElementById('concepto').value;
  const monto = document.getElementById('monto').value;
  const categoria = document.getElementById('categoria').value;

  // Crear objeto registro
  const registro = {
    fecha: fecha,
    concepto: concepto,
    monto: monto,
    categoria: categoria
  }

  // Agregar registro al array
  registros.push(registro);

  // Mostrar registros en la tabla
  mostrarRegistros();
}

// Función para mostrar registros en la tabla
function mostrarRegistros() {

  // Obtener referencia a la tabla
  const tablaRegistros = document.getElementById('registros');

  // Recorrer array de registros
  registros.forEach(registro => {

    // Crear fila 
    const row = tablaRegistros.insertRow();

    // Insertar datos en celdas
    row.insertCell().textContent = registro.fecha;
    row.insertCell().textContent = registro.concepto;
    row.insertCell().textContent = registro.monto;
    row.insertCell().textContent = registro.categoria;

  });

}