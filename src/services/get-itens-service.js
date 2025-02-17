import { data_itens } from '../database/itens-database.js'

const main = document.querySelector('main')
const category = main.getAttribute('id')
// Filtra os itens pela categoria
const itens = data_itens.filter(item => item.category.includes(category))

// Função para exibir os itens da categoria
function displayItensByCategory() {
  main.innerHTML = ''

  itens.forEach(item => {
    const thisItem = document.createElement('div')
    thisItem.className = 'item'

    thisItem.innerHTML = `
      <h2>${item.name}</h2>
      <img style="width: 200px;" src="../../assets/images/product/${item.pic}" alt="" loading="lazy">      
      <p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p>
      <p><strong>Fabricante:</strong> ${item.manufacturer}</p>
      <p><strong>Temporada:</strong> ${item.season.join(', ')}</p>
      <div class="description">
        <button id="desc-btn">Descrição</button>
        <p id="desc-text">${item.description}</p>
      </div>
      <div class="cart">
        <button class="subItem">-</button>
        <span class="quantity">0</span>
        <button class="addItem">+</button>
      </div>
      <button class="btn-addCart">Adicionar ao Carrinho</button>
    `

    // Estrutura para exibir a descrição ao passar o mouse.
    const descButton = thisItem.querySelector('#desc-btn')
    const descText = thisItem.querySelector('#desc-text')

    descButton.addEventListener('mouseover', () => {
      descText.style.display = 'block'
    })
    descButton.addEventListener('mouseout', () => {
      descText.style.display = 'none'
    })

    // Estrutura da quantidade dos itens para adição no carrinho.
    const subButton = thisItem.querySelector('.subItem')
    const addButton = thisItem.querySelector('.addItem')
    const quantityDisplay = thisItem.querySelector('.quantity')
    let quantity = 0

    subButton.addEventListener('click', () => {
      if (quantity > 0) {
        quantity--
        quantityDisplay.textContent = quantity
      }
    })
    addButton.addEventListener('click', () => {
      quantity++
      quantityDisplay.textContent = quantity
    })
   
    main.appendChild(thisItem)
  })
}

// Execução da função após carregamento completo da página.
document.addEventListener('DOMContentLoaded', () => {
  displayItensByCategory()
})
