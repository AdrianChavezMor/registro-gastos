let registrosGlobal = []
const tableBody = document.getElementById('tableBody');

//let myURL = 'http://localhost:3000';
let myURL = 'https://registro-gastos-backend.onrender.com';

document.addEventListener('DOMContentLoaded', function() {
    obtenerRegistrosService();
});

async function obtenerRegistrosService() {
  try {
  const response = await fetch(`${myURL}/registro`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();  // <-- Parse the response body as JSON
    
    if (response.ok) {
      console.log('Registro obtenido');
    
      mostrarTabla(data);
      return { success: true };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Error de red:', error);
    return { success: false, error: 'Error de conexión' };
  }
}

function mostrarTabla(registros){
    registros.forEach(registro => {
      const row = document.createElement('tr');
      
      const monto = parseFloat(registro.monto || 0);
      const montoFormatted = new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN'
      }).format(monto);
  
      row.innerHTML = `
          <td class="monto">${montoFormatted}</td>
          <td>${registro.categoria}</td>
          <td>${registro.banco || '-'}</td>
          <td>${registro.descripcion || '-'}</td>
          <td>${registro.fecha}</td>
      `;
      
      tableBody.appendChild(row);
  });
}
