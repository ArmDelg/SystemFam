const mesesTable = document.getElementById('meses-table');
const registroForm = document.getElementById('registro-form');
const fechaInput = document.getElementById('fecha');
const descripcionInput = document.getElementById('descripcion');
const categoriaInput = document.getElementById('categoria');
const tipoInput = document.getElementById('tipo');
const montoInput = document.getElementById('monto');
const agregarBtn = document.getElementById('agregar-btn');
const balanceTable = document.getElementById('balance-table');
const categoriasTable = document.getElementById('categorias-table');

const mesesData = {};

agregarBtn.addEventListener('click', () => {
  const fecha = fechaInput.value;
  const descripcion = descripcionInput.value;
  const categoria = categoriaInput.value;
  const tipo = tipoInput.value;
  const monto = parseFloat(montoInput.value);

  const fechaParts = fecha.split('-');
  const year = fechaParts[0];
  const month = fechaParts[1];

  if (!mesesData[year]) {
    mesesData[year] = {};
  }

  if (!mesesData[year][month]) {
    mesesData[year][month] = [];
  }

  mesesData[year][month].push({ fecha, descripcion, categoria, tipo, monto });
  actualizarTablaMensual(year, month);
  actualizarTablaCategorias();
  actualizarBalanceGeneral();
  limpiarFormulario();
});

function agregarFila(tabla, datos) {
  const fila = tabla.insertRow();
  for (const dato of datos) {
    const celda = fila.insertCell();
    celda.textContent = dato;
  }
}

function actualizarTablaMensual(year, month) {
  const mesActual = mesesData[year][month];
  const tableId = `mes-table-${year}-${month}`;
  const tableContainer = document.getElementById(`mes-table-container-${year}-${month}`);

  if (!tableContainer) {
    const section = document.getElementById('meses');
    const newTableContainer = document.createElement('div');
    newTableContainer.setAttribute('id', `mes-table-container-${year}-${month}`);
    newTableContainer.innerHTML = `
      <h3>${year}-${month}</h3>
      <table id="${tableId}">
        <tr>
          <th>Fecha</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Tipo</th>
          <th>Monto</th>
        </tr>
      </table>
    `;
    section.appendChild(newTableContainer);
  }

  const mesTable = document.getElementById(tableId);
  mesTable.innerHTML = '';

  const encabezados = ['Fecha', 'Descripción', 'Categoría', 'Tipo', 'Monto'];
  agregarFila(mesTable, encabezados);

  for (const registro of mesActual) {
    agregarFila(mesTable, [registro.fecha, registro.descripcion, registro.categoria, registro.tipo, `$${registro.monto}`]);
  }
}

function actualizarTablaCategorias() {
  categoriasTable.innerHTML = '';
  
  const encabezados = ['Categoría', 'Total Gastado'];
  agregarFila(categoriasTable, encabezados);
  
  const categoriasTotales = {};
  
  for (const year in mesesData) {
    for (const month in mesesData[year]) {
      for (const registro of mesesData[year][month]) {
        if (registro.tipo === 'Gasto') {
          if (!categoriasTotales[registro.categoria]) {
            categoriasTotales[registro.categoria] = 0;
          }
          categoriasTotales[registro.categoria] += registro.monto;
        }
      }
    }
  }
  
  for (const categoria in categoriasTotales) {
    agregarFila(categoriasTable, [categoria, `$${categoriasTotales[categoria].toFixed(2)}`]);
  }
}

function actualizarBalanceGeneral() {
  const balanceTable = document.getElementById('balance-table');
  balanceTable.innerHTML = '';

  const encabezados = ['Ingresos Totales', 'Gastos Totales', 'Ingreso - Gasto'];
  agregarFila(balanceTable, encabezados);

  let ingresosTotales = 0;
  let gastosTotales = 0;

  for (const year in mesesData) {
    for (const month in mesesData[year]) {
      for (const registro of mesesData[year][month]) {
        if (registro.tipo === 'Ingreso') {
          ingresosTotales += registro.monto;
        } else if (registro.tipo === 'Gasto') {
          gastosTotales += registro.monto;
        }
      }
    }
  }

  const ingresoGasto = ingresosTotales - gastosTotales;

  agregarFila(balanceTable, [`$${ingresosTotales.toFixed(2)}`, `$${gastosTotales.toFixed(2)}`, `$${ingresoGasto.toFixed(2)}`]);
}

function actualizarTablaCategoriasIngresos() {
  const categoriasIngresosTable = document.getElementById('categorias-ingresos-table');
  categoriasIngresosTable.innerHTML = '';

  const encabezados = ['Categoría', 'Total Ingresado'];
  agregarFila(categoriasIngresosTable, encabezados);

  const categoriasIngresosTotales = {};

  for (const year in mesesData) {
    for (const month in mesesData[year]) {
      for (const registro of mesesData[year][month]) {
        if (registro.tipo === 'Ingreso') {
          if (!categoriasIngresosTotales[registro.categoriaIngresos]) {
            categoriasIngresosTotales[registro.categoriaIngresos] = 0;
          }
          categoriasIngresosTotales[registro.categoriaIngreso] += registro.monto;        }
      }
    }
  }

  for (const categoriaIngresos in categoriasIngresosTotales) {
    agregarFila(
      categoriasIngresosTable,
      [categoriaIngresos, `$${categoriasIngresosTotales[categoriaIngresos].toFixed(2)}`]
    );
  }
}


const categoriasIngresosInput = document.getElementById('categoria-ingresos-table');

agregarBtn.addEventListener('click', () => {
  const fecha = fechaInput.value;
  const descripcion = descripcionInput.value;
  const categoria = categoriaInput.value;
  const tipo = tipoInput.value;
  const monto = parseFloat(montoInput.value);
  const categoriaIngresos = categoriasIngresosInput.value; // Capturing income category

  if (fecha && (tipo === 'Ingreso' || descripcion) && !isNaN(monto)) {
    const fechaParts = fecha.split('-');
    const year = fechaParts[0];
    const month = fechaParts[1];

    if (!mesesData[year]) {
      mesesData[year] = {};
    }

    if (!mesesData[year][month]) {
      mesesData[year][month] = [];
    }

    mesesData[year][month].push({ fecha, descripcion, categoria, tipo, monto, categoriaIngresos }); // Including categoriaIngresos
    actualizarTablaMensual(year, month);
    actualizarTablaCategorias();
    actualizarTablaCategoriasIngresos(); // Updating income categories table
    actualizarBalanceGeneral();
    limpiarFormulario();
  } else {
    alert("Por favor, ingresa información válida en los campos requeridos.");
  }
});


function limpiarFormulario() {
  fechaInput.value = '';
  descripcionInput.value = '';
  categoriaInput.value = 'vivienda';
  tipoInput.value = 'Ingreso';
  montoInput.value = '';
}



// Llamadas iniciales
actualizarTablaMensual();
actualizarTablaCategorias();
actualizarBalanceGeneral();
actualizarTablaCategoriasIngresos();
