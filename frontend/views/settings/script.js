let categoriasFetched = [];
let metodosFetched = [];

categoriasFetched = JSON.parse(localStorage.getItem('categorias'));
metodosFetched= JSON.parse(localStorage.getItem('metodos'));

const listaCategorias = document.getElementById('lista-categorias')
const listaMetodos = document.getElementById('lista-metodos')
const agregarCategoriaButton = document.getElementById('agregar-categoria');
const agregarCategoriaInput = document.getElementById('input-categoria');
const agregarMetodoButton = document.getElementById('agregar-metodo');
const agregarMetodoInput = document.getElementById('input-metodo');
const guardarCategoriasButton = document.getElementById('guardar-categorias');
const guardarMetodosButton = document.getElementById('guardar-metodos');

for (let i = 0; i < categoriasFetched.length; i++) {
  const element = categoriasFetched[i];

  const newListElement = document.createElement('li');

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'Borrar';
  removeButton.id = element;

  newListElement.innerHTML = element;

  removeButton.addEventListener('click', () => {
    newListElement.remove();
    categoriasFetched.splice(i,1);
    
    console.log(categoriasFetched);
    console.log(metodosFetched);
  })

  newListElement.appendChild(removeButton);
  listaCategorias.appendChild(newListElement);
}

for (let i = 0; i < metodosFetched.length; i++) {
  const element = metodosFetched[i];

  const newListElement = document.createElement('li');

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'Borrar';
  removeButton.id = element;

  newListElement.innerHTML = element;

  removeButton.addEventListener('click', () => {
    
    newListElement.remove();
    metodosFetched.splice(i,1);

    console.log(categoriasFetched);
    console.log(metodosFetched);
    
  })

  newListElement.appendChild(removeButton);
  listaMetodos.appendChild(newListElement)
}

agregarCategoriaButton.addEventListener('click', () => {
  const element = agregarCategoriaInput.value;

  if (!element){
    alert("Escribe algo en el input")
  } else {
    categoriasFetched.push(element);

    const newListElement = document.createElement('li');

    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Borrar';
    removeButton.id = element;

    newListElement.innerHTML = element;

    removeButton.addEventListener('click', () => {
      
      newListElement.remove();
      metodosFetched.splice(categoriasFetched.length - 1,1);

      console.log(categoriasFetched);
      console.log(metodosFetched);
      
    })

    newListElement.appendChild(removeButton);
    listaCategorias.appendChild(newListElement);
  }

  agregarCategoriaInput.value = ''

  console.log(categoriasFetched);
  console.log(metodosFetched);

})

agregarMetodoButton.addEventListener('click', () => {
  const element = agregarMetodoInput.value;

  if (!element){
    alert("Escribe algo en el input")
  } else {
    metodosFetched.push(element);

    const newListElement = document.createElement('li');

    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Borrar';
    removeButton.id = element;

    newListElement.innerHTML = element;

    removeButton.addEventListener('click', () => {
      
      newListElement.remove();
      metodosFetched.splice(metodosFetched.length - 1,1);

      console.log(categoriasFetched);
      console.log(metodosFetched);
      
    })

    newListElement.appendChild(removeButton);
    listaMetodos.appendChild(newListElement);
  }

  agregarMetodoInput.value = ''

  console.log(categoriasFetched);
  console.log(metodosFetched);
  
})

guardarCategoriasButton.addEventListener('click', () => {

      localStorage.setItem('categorias', JSON.stringify(categoriasFetched));
  
})

guardarMetodosButton.addEventListener('click', () => {

      localStorage.setItem('metodos', JSON.stringify(metodosFetched));
  
})



