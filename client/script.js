const numberInput = document.getElementById('number-input')
const categorySelector = document.getElementById('categories')
const descriptionBox = document.getElementById('description-box')

function registrarGasto(){
  const fecha = new Date().toLocaleString('es-ES');

  const gasto = {'monto': numberInput.value, 
                 'categoria': categorySelector.value,
                 'descripcion': descriptionBox.value,
                 'fecha': fecha}


  console.log(gasto)
}

//NEXT TO DO: CREATE AN ENDPOINT IN A NODE JS BACKEND SERVER AND SEND THE PAYLOAD THROUGH THAT ENDPOINT



