import { database } from '../../database/database.js';

// Função para carregar os detalhes do item com base no parâmetro da URL
function carregarDetalhes() {
  const urlParams = new URLSearchParams(window.location.search);
  const nomeItem = urlParams.get('item');
  const categoria = urlParams.get('categoria');
  
  if (nomeItem && categoria) {
    const itemData = database[categoria].find(i => i.nome === nomeItem);
    
    if (itemData) {
      // Exibe os detalhes do item na página
      document.getElementById("item-title").textContent = itemData.nome;
      document.getElementById("plantio").textContent = `Plantio: ${itemData.plantio}`;
      document.getElementById("horta").textContent = `Horta: ${itemData.horta}`;
      document.getElementById("adubo").textContent = `Adubo: ${itemData.adubo}`;
      document.getElementById("atencao").textContent = `Atenção: ${itemData.atencao}`;
    } else {
      console.error("Item não encontrado na base de dados.");
    }
  } else {
    console.error("Parâmetros de URL inválidos.");
  }
}

// Carregar os detalhes ao carregar a página
window.onload = carregarDetalhes;
