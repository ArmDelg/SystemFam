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

function actualizarTablaIngresos(year, month) {
  const ingresosMensuales = mesesData[year][month].filter((registro) => registro.tipo === 'Ingreso');
  const ingresosTable = document.getElementById('ingresos-table'); // Obtener la tabla existente de ingresos

  // Limpiar la tabla existente
  while (ingresosTable.rows.length > 1) {
    ingresosTable.deleteRow(1);
  }

  for (const registro of ingresosMensuales) {
    agregarFila(ingresosTable, [registro.categoria, registro.descripcion, `$${registro.monto}`]);
  }
}

function actualizarTablaGastos(year, month) {
  const gastosMensuales = mesesData[year][month].filter((registro) => registro.tipo === 'Gasto');
  const gastosTable = document.getElementById('gastos-table'); // Obtener la tabla existente de gastos

  // Limpiar la tabla existente
  while (gastosTable.rows.length > 1) {
    gastosTable.deleteRow(1);
  }

  for (const registro of gastosMensuales) {
    agregarFila(gastosTable, [registro.categoria, registro.descripcion, `$${registro.monto}`]);
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

  if (tipo === 'Ingreso') {
    actualizarTablaIngresos(year, month);
  } else if (tipo === 'Gasto') {
    actualizarTablaGastos(year, month);
  }

  actualizarBalanceGeneral();
  limpiarFormulario();
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
