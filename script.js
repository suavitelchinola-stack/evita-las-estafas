const checkBtn = document.getElementById('checkBtn');
const linkInput = document.getElementById('linkInput');
const result = document.getElementById('result');
const historyList = document.getElementById('historyList');
const themeToggle = document.getElementById('themeToggle');

let history = JSON.parse(localStorage.getItem('linkHistory')) || [];
renderHistory();

checkBtn.addEventListener('click', () => {
  const link = linkInput.value.trim();
  if(!link) return alert("Pega un link válido");

  history.push(link);
  localStorage.setItem('linkHistory', JSON.stringify(history));
  renderHistory();

  if(link.startsWith('http://') || link.startsWith('https://')) {
    result.style.color = '#00ff99';
    result.textContent = "✅ Link verificado (no 100% seguro)";
  } else {
    result.style.color = '#ff4c4c';
    result.textContent = "⚠️ Link sospechoso (no 100% seguro)";
  }
});

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(l => {
    const li = document.createElement('li');
    li.textContent = l;
    historyList.appendChild(li);
  });
}

// Modo oscuro / claro
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});