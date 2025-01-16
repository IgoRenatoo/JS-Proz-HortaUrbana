import { data_itens } from '../database/data-itens.js'

const itensCar = JSON.parse(localStorage.getItem('itensCar')) // Carrega os itens do carrinho do localStorage
const main = document.querySelector('main')
const category = main.getAttribute('id')
const itens = data_itens.filter(item => item.category.includes(category)) // Filtra os itens pela categoria

// Função para salvar o carrinho no localStorage
function saveCart() {
  localStorage.setItem('itensCar', JSON.stringify(itensCar))
}

const cartContainer = document.createElement('div')
cartContainer.className = 'cart-container'
document.body.appendChild(cartContainer)

// Função para exibir o carrinho no canto superior direito
function displayCart() {
  let cartContent = `<h3>Carrinho</h3>`
  let total = 0

  if (itensCar.length === 0) {
    cartContainer.style.display = 'none'
  } else {
    cartContainer.style.display = 'block'
    itensCar.forEach((cartItem, index) => {
      const subtotal = cartItem.price * cartItem.quantity
      total += subtotal
      cartContent += `
        <div class="cart-item">
          <p>${cartItem.name} x ${cartItem.quantity}</p>
          <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
          <button class="removeItem" data-index="${index}">Remover</button>
        </div>
      `
    })
    cartContent += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`
  }

  const cartElement = document.querySelector('.cart-container')
  cartElement.innerHTML = cartContent

  // Adiciona eventos de remover itens
  const removeButtons = cartElement.querySelectorAll('.removeItem')
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index')
      itensCar.splice(index, 1)
      saveCart()
      displayCart()
    })
  })
}

// Função para exibir os itens da categoria
function displayItensByCategory() {
  main.innerHTML = ''

  itens.forEach(item => {
    const thisItem = document.createElement('div')
    thisItem.className = 'item'

    thisItem.innerHTML = `
      <h2>${item.name}</h2>
      <img style="width: 200px;" src="../../assets/images/product/horta.png" alt="" loading="lazy">
      <p class="description">${item.description}</p>
      <p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p>
      <p><strong>Fabricante:</strong> ${item.manufacturer}</p>
      <p><strong>Temporada:</strong> ${item.season.join(', ')}</p>
      <div class="cart">
        <button class="subItem">-</button>
        <span class="quantity">1</span>
        <button class="addItem">+</button>
      </div>
      <button class="addCart">Adicionar ao Carrinho</button>
    `

    const subButton = thisItem.querySelector('.subItem')
    const addButton = thisItem.querySelector('.addItem')
    const quantityDisplay = thisItem.querySelector('.quantity')
    let quantity = 1

    subButton.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--
        quantityDisplay.textContent = quantity
      }
    })

    addButton.addEventListener('click', () => {
      quantity++
      quantityDisplay.textContent = quantity
    })

    // Evento para o botão "Adicionar ao Carrinho"
    const addCartButton = thisItem.querySelector('.addCart')
    addCartButton.addEventListener('click', () => {
      const itIsItemIndex = itensCar.findIndex(cartItem => cartItem.id === item.id)

      if (itIsItemIndex !== -1) {
        itensCar[itIsItemIndex].quantity += quantity
      } else {
        itensCar.push({ ...item, quantity })
      }

      saveCart()
      displayCart()
    })

    main.appendChild(thisItem)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  displayItensByCategory()
  displayCart()
})
