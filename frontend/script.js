const numberInput = document.getElementById('number-input')
const categorySelector = document.getElementById('categories')
const paymentmethodSelector = document.getElementById('metodos')
const descriptionBox = document.getElementById('description-box');

let categorias = []
let metodos = []

//let myURL = 'http://localhost:3000';
let myURL = 'https://registro-gastos-backend.onrender.com';

initialize()




async function initialize(){
  categorias = await obtenerCategoriasService();
  metodos = await obtenerMetodosService();
  
  console.log(categorias)
  localStorage.setItem('categorias', JSON.stringify(categorias));
  localStorage.setItem('metodos', JSON.stringify(metodos));

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
}

async function obtenerCategoriasService() {
  try {
    const response = await fetch(`${myURL}/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();  // <-- Parse the response body as JSON
    
    if (response.ok) {
      console.log('Categorias obtenidas');
      
      return data;
      
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Error de red:', error);
    return { success: false, error: 'Error de conexión' };
  }
}

async function obtenerMetodosService() {
  try {
    const response = await fetch(`${myURL}/metodos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json(); 
    
    if (response.ok) {
      console.log('Métodos obtenidas');
      
      return data
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


  await registrarGastoService(gasto);

}

function clearContent(){
   numberInput.value = '';
   categorySelector.selectedIndex = 0;
   paymentmethodSelector.selectedIndex = 0;
   descriptionBox.value = '';
}






