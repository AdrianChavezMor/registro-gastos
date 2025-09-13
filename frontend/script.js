const numberInput = document.getElementById('number-input')
const categorySelector = document.getElementById('categories')
const paymentmethodSelector = document.getElementById('metodos')
const descriptionBox = document.getElementById('description-box');

//let myURL = 'http://localhost:3000';
let myURL = 'https://registro-gastos-backend.onrender.com';

let categorias = [];
let metodos = [];

initialize()

function initialize(){

  if(localStorage.getItem('access') == null){
    window.location.href = 'views/ingreso'
  }

  if (localStorage.getItem('categorias') == null && localStorage.getItem('metodos') == null){
    localStorage.setItem('categorias', JSON.stringify(categorias))
    localStorage.setItem('metodos', JSON.stringify(metodos))
  } else {
    categorias = JSON.parse(localStorage.getItem('categorias'));
    metodos = JSON.parse(localStorage.getItem('metodos'));
  }

  loadContent()
} 

function loadContent(){
  for (const element of categorias) {
    const newOptionElement = document.createElement('option');
    newOptionElement.innerHTML = element;
    newOptionElement.value = element;
    categorySelector.appendChild(newOptionElement)
  }

  for (const element of metodos) {
    const newOptionElement = document.createElement('option');
    newOptionElement.innerHTML = element;
    newOptionElement.value = element;
    paymentmethodSelector.appendChild(newOptionElement)
  }

  fetch_dashboard_data();
}

function llenar_dashboard(dashboard_data){
  const elemento_suma_mes = document.getElementById("suma_mes");
  const elemento_suma_necesidadesbasicas = document.getElementById("suma_necesidadesbasicas");
  const elemento_suma_gustitos = document.getElementById('suma_gustitos');
  const elemento_suma_comerfuera = document.getElementById('suma_comerfuera');

  elemento_suma_mes.innerHTML = dashboard_data.suma_mes;
  elemento_suma_necesidadesbasicas.innerHTML = dashboard_data.suma_necesidadesbasicas;
  elemento_suma_gustitos.innerHTML = dashboard_data.suma_gustitos;
  elemento_suma_comerfuera.innerHTML = dashboard_data.suma_comerfuera;

}

async function fetch_dashboard_data(){
    try {
      const response = await fetch(`${myURL}/dashboard_data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();  // <-- Parse the response body as JSON
    
    if (response.ok) {
      console.log('Datos obtenidos');
      llenar_dashboard(data);
      return { success: true };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Error de red:', error);
    return { success: false, error: 'Error de conexión' };
  }


}

async function registrarGastoService(dataGasto) {
  try {
    const response = await fetch(`${myURL}/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataGasto)
    });
    
    const data = await response.json();

    console.log(response)
    
    if (response.ok) {
      console.log('Registro exitoso:', data);
      return { success: true, data };
    } else {
      console.error('Error en registro:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Error de red:', error);
    return { success: false, error: 'Error de conexión' };
  }
}

async function registrarGasto(){
  const fecha = new Date().toLocaleString('es-ES');

  const gasto = {'monto': numberInput.value, 
                 'categoria': categorySelector.value,
                 'metodo': paymentmethodSelector.value,
                 'descripcion': descriptionBox.value,
                 'fecha': fecha}

  let response = await registrarGastoService(gasto);

  if (response.success){
    alert('Registro exitoso')
    clearContent();
  }
 

}



function clearContent(){
   numberInput.value = '';
   categorySelector.selectedIndex = 0;
   paymentmethodSelector.selectedIndex = 0;
   descriptionBox.value = '';
}






