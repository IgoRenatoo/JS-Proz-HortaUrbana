import { data_itens } from '../database/data-itens.js'

const main = document.querySelector('main')
const category = main.getAttribute('id')
const itens = data_itens.filter(item => item.category.includes(category)) // Filtra os itens pela categoria

// Função para filtrar e exibir os itens com base no ID da tag <main>
function displayItensByCategory() {
  main.innerHTML = ''
  // Cria o conteúdo para cada item filtrado
  itens.forEach(item => {
    const thisItem = document.createElement('div')
    thisItem.className = 'item'
    thisItem.innerHTML = `
      <h2>${item.name}</h2>
      <img style="width: 200px;" src="../../assets/images/product/horta.png" alt="">
      <p>${item.description}</p>
      <p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p>
      <p><strong>Fabricante:</strong> ${item.manufacturer}</p>
      <p><strong>Temporada:</strong> ${item.season.join(', ')}</p>
    `
    main.appendChild(thisItem)
  })
}

document.addEventListener('DOMContentLoaded', displayItensByCategory)
