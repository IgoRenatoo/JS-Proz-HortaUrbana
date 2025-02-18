import { data_itens } from '../database/itens-database.js'

// Busca ou cria um array para o carrinho
let cart = JSON.parse(localStorage.getItem('cart')) || []

const main = document.querySelector('main')
const category = main.getAttribute('id')
// Filtra os itens pela categoria
const itens = data_itens.filter(item => item.category.includes(category))

const myCart = document.querySelector('#myCart')
const quantityInCart = document.querySelector('#quantityInCart')

// Função para atualizar o carrinho no localStorage e na interface
function updateCartDisplay() {
  localStorage.setItem('cart', JSON.stringify(cart))
  quantityInCart.textContent = cart.length
  console.log(cart)
  myCart.style.display = (cart.length > 0) ? 'contents' : 'none'
}

function addCart(item, quantity) {
  if (quantity <= 0) return

  const currentItem = cart.find(current => current.id === item.id)

  if (currentItem) {
    currentItem.quantity += quantity
    currentItem.total = currentItem.quantity * currentItem.price
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      total: item.price * quantity
    })
  }

  updateCartDisplay()
}

// Função para exibir os itens da categoria
function displayItensByCategory() {
  if (main && main.id) {
    main.innerHTML = '';
  }

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
      <div class="add-cart">
        <button id="subItem">-</button>
        <span id="quantity">0</span>
        <button id="addItem">+</button>
      </div>
      <button class="add-cart-btn" id="addCart">Adicionar ao Carrinho</button>
    `

    // Estrutura para exibir a descrição ao passar o mouse
    const descButton = thisItem.querySelector('#desc-btn')
    const descText = thisItem.querySelector('#desc-text')

    descButton.addEventListener('mouseover', () => {
      descText.style.display = 'block'
    })
    descButton.addEventListener('mouseout', () => {
      descText.style.display = 'none'
    })

    // Estrutura da quantidade dos itens para adição no carrinho
    const subButton = thisItem.querySelector('#subItem')
    const addButton = thisItem.querySelector('#addItem')
    const quantityDisplay = thisItem.querySelector('#quantity')
    const addCartButton = thisItem.querySelector('#addCart')
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
    addCartButton.addEventListener('click', () => {
      const logged = localStorage.getItem('loggedIn')
      if(!logged){
        return alert('Necessário realizar login!')
      }
      addCart(item, quantity)
      quantity = 0
      quantityDisplay.textContent = quantity
    })
   
    main.appendChild(thisItem)
  })
}

// Execução da função após carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {
  displayItensByCategory()
  updateCartDisplay()
})
