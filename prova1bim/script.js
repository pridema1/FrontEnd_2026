document.addEventListener('DOMContentLoaded', function() {
  window.showingDEF = false;
  window.gruposContainer = document.getElementById('gruposContainer');
  window.originalGroups = window.gruposContainer ? window.gruposContainer.innerHTML : '';
});

function toggleGroups() {
  if (!window.gruposContainer) return;

  if (!window.showingDEF) {
    window.gruposContainer.innerHTML = `
      <div class="group" id="grupoD">
        <h3>Grupo D</h3>
        <ul>
          <li>Estados Unidos</li>
          <li>Paraguai</li>
          <li>Austrália</li>
          <li>Turquia</li>
        </ul>
        <details><summary>Saiba Mais</summary><p>Os EUA jogam em casa, vantagem histórica em Copas. Austrália enfrenta frequentemente seleções sul-americanas em torneios.</p></details>
      </div>
      <div class="group" id="grupoE">
        <h3>Grupo E</h3>
        <ul>
          <li>Alemanha</li>
          <li>Equador</li>
          <li>Costa do Marfin</li>
          <li>Curaçao</li>
        </ul>
        <details><summary>Saiba Mais</summary><p>Alemanha costuma dominar fases de grupos. Equador e Costa do Marfim têm estilos físicos semelhantes.</p></details>
      </div>
      <div class="group" id="grupoF">
        <h3>Grupo F</h3>
        <ul>
          <li>Holanda</li>
          <li>Japão</li>
          <li>Tunísia</li>
          <li>Suécia</li>
        </ul>
        <details><summary>Saiba Mais</summary><p>Brasil, Marrocos e Escócia já dividiram grupo em 1998. Brasil nunca perdeu para a Escócia em Copas.</p></details>
      </div>
    `;

    document.querySelector('#item1 h2').textContent = '1. Grupos e Fatos (D, E, F)';
    var btn = document.getElementById('nextBtn');
    if (btn) btn.textContent = 'Anterior';
    window.showingDEF = true;
  } else {
    window.gruposContainer.innerHTML = window.originalGroups;
    document.querySelector('#item1 h2').textContent = '1. Grupos e Fatos';
    var btn = document.getElementById('nextBtn');
    if (btn) btn.textContent = 'Próximo';
    window.showingDEF = false;
  }
}

window.addedPlayersCount = window.addedPlayersCount || 0;
function add() {
  var cardsContainer = document.getElementById('Cards');
  if (!cardsContainer) return;

  window.addedPlayersCount += 1;
  var suffix = '-' + window.addedPlayersCount;

  var card = document.createElement('div');
  card.className = 'card';
  card.style.width = '22rem';
  card.setAttribute('aria-hidden', 'true');

  card.innerHTML = `
    <img src="paqieta.jpg" class="card-img-top" alt="Jogador">
    <div class="card-body">
      <h5 class="card-title">
        <span class="card-title">Lucas Tolentino Coelho de Lima</span>
        <span class="badge text-bg-secondary">8,8</span>
      </h5>
      <p class="card-text">
        <span class="data-nas"><strong>Nascimento:</strong> 27/08/1997 (28 anos)</span><br>
        <span class="altura"><strong>Altura:</strong> 1,80 m</span><br>
        <span class="posicao"><strong>Posição:</strong> Meio-campista</span><br>
      </p>
    </div>
  `;

  card.style.marginLeft = '12px';

  cardsContainer.appendChild(card);
}
