const cartTable = document.querySelector('#itensCart')
const sectionCart = document.querySelector('#sectionCart')
const quantityInCart = document.querySelector('#quantityInCart')
let cart = JSON.parse(localStorage.getItem('cart')) || []

function updateCart() {
  cartTable.innerHTML = `
    <tr>
      <th>Nome</th>
      <th>Preço</th>
      <th>Quantidade</th>
      <th>Total</th>
      <th>Excluir</th>
    </tr>
  `
  cart.forEach((item, index) => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${item.name}</td>
      <td>R$ ${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>R$ ${item.total.toFixed(2)}</td>
      <td><button class='remove-btn' index='${index}'>❌</button></td>
    `

    cartTable.appendChild(row)
  })

  // Adiciona o botão "Finalizar Compra" se houver itens no carrinho
  if (cart.length > 0 && !document.querySelector('#finishCart')) {
    const finishCart = document.createElement('div')
    finishCart.id = 'finishCart'
    finishCart.innerHTML = `<button id="finishCart" class="finish-btn">Finalizar Compra</button>`
    sectionCart.appendChild(finishCart)

    document.querySelector('#finishCart').addEventListener('click', () => {
      window.location.href = '../payment/payment.html'
    })
  }

  // Adiciona eventos para os botões de remoção
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', event => {
      const index = event.target.getAttribute('index')
      cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(cart))
      if (cart.length === 0) {
        alert('Carrinho vazio')      
        return window.location.href = '../shop/micro-verde.html'
      } else {
        quantityInCart.textContent = cart.length
        updateCart()
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  updateCart()
})
