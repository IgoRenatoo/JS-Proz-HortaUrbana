const paymentMethod = document.querySelector('#paymentMethod')
const cpfField = document.querySelector('#cpfField')
const cardField = document.querySelector('#cardField')
const discountInput = document.querySelector('#discount')
const applyDiscount = document.querySelector('#applyDiscountBtn')
const finishBuy = document.querySelector('#finishBuy')
const fullValue = document.querySelector('#fullValue')
const cart = JSON.parse(localStorage.getItem('cart'))
let value = 0

for (let i = 0; i < cart.length; i++){
  value += cart[i].total
}

fullValue.textContent = `Valor total da compra: R$${value.toFixed(2)}`

// Atualiza campos conforme a opção de pagamento escolhida
paymentMethod.addEventListener('change', () => {
  cpfField.style.display = paymentMethod.value === 'pix' ? 'block' : 'none'
  cardField.style.display = paymentMethod.value.includes('cartao') ? 'block' : 'none'
})

// Simula a aplicação de cupom de desconto
applyDiscount.addEventListener('click', () => {
  const discount = discountInput.value
  if (discount === 'HORTA10') {
    value = value*0.9
    fullValue.textContent = `Valor total da compra: R$${value.toFixed(2)}`
  } else {
    alert('Cupom inválido.')
  }
})

// Simula a finalização da compra
finishBuy.addEventListener('click', () => {
  alert('Compra finalizada com sucesso! Obrigado por comprar na Horta Urbana.')
  localStorage.removeItem('cart')
  window.location.href = '../../../index.html'

})
