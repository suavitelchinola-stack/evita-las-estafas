
const btn = document.getElementById('checkBtn');
const input = document.getElementById('linkInput');
const box = document.getElementById('resultBox');
const tag = document.getElementById('riskTag');
const text = document.getElementById('resultText');
const historyList = document.getElementById('historyList');

let history = JSON.parse(localStorage.getItem('history')) || [];
renderHistory();

btn.onclick = () => {
  const link = input.value.trim();
  if (!link) return;

  let score = 0;

  if (!link.startsWith('https://')) score++;
  if (link.includes('@') || link.includes('-')) score++;
  if (link.length > 60) score++;

  box.classList.remove('hidden');
  tag.className = 'tag';
  
  if (score === 0) {
    tag.textContent = '🟢 Bajo riesgo';
    tag.classList.add('low');
    text.textContent = 'El enlace luce normal, aunque siempre verifica la fuente.';
  } else if (score === 1) {
    tag.textContent = '🟡 Riesgo medio';
    tag.classList.add('medium');
    text.textContent = 'El enlace tiene señales que ameritan precaución.';
  } else {
    tag.textContent = '🔴 Alto riesgo';
    tag.classList.add('high');
    text.textContent = 'El enlace tiene varias señales comunes en estafas.';
  }

  history.unshift(link);
  history = history.slice(0, 10);
  localStorage.setItem('history', JSON.stringify(history));
  renderHistory();
};

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(l => {
    const li = document.createElement('li');
    li.textContent = l;
    historyList.appendChild(li);
  });
}