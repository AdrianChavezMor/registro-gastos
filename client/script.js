const numberInput = document.getElementById('number-input')
const categorySelector = document.getElementById('categories')
const paymentmethodSelector = document.getElementById('metodos')
const descriptionBox = document.getElementById('description-box')

async function registrarGastoService(dataGasto) {
  try {
    const response = await fetch('http://localhost:3000/registro', {
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


  const result = await registrarGastoService(gasto);

  numberInput.value = 0
  categorySelector.value = ''
  paymentmethodSelector.value = ''
  descriptionBox.value = ''
  
  if (result.success) {
    alert('¡Registro exitoso!');
  } else {
    alert('Error: ' + result.error);
  }
}

//NEXT TO DO: CREATE AN ENDPOINT IN A NODE JS BACKEND SERVER AND SEND THE PAYLOAD THROUGH THAT ENDPOINT



