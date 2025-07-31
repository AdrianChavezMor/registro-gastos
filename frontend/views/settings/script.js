let categoriasFetched = [];
let metodosFetched = []

categoriasFetched = JSON.parse(localStorage.getItem('categorias'));
metodosFetched = JSON.parse(localStorage.getItem('metodos'));

const listaCategorias = document.getElementById('lista-categorias')
const listaMetodos = document.getElementById('lista-metodos')

for (const element of categoriasFetched) {
  const newListElement = document.createElement('li');
  newListElement.innerHTML = element;
  listaCategorias.appendChild(newListElement)
}

for (const element of metodosFetched) {
  const newListElement = document.createElement('li');
  newListElement.innerHTML = element;
  listaMetodos.appendChild(newListElement)
}
