const checkBtn = document.getElementById('checkBtn');
const linkInput = document.getElementById('linkInput');
const result = document.getElementById('result');
const historyList = document.getElementById('historyList');
const themeToggle = document.getElementById('themeToggle');

// Guardar historial en localStorage
let history = JSON.parse(localStorage.getItem('linkHistory')) || [];
renderHistory();

checkBtn.addEventListener('click', () => {
    const link = linkInput.value.trim();
    if(!link) return alert("Pega un link válido");

    // Guardar en historial
    history.push(link);
    localStorage.setItem('linkHistory', JSON.stringify(history));
    renderHistory();

    // Verificación básica
    if(link.startsWith('http://') || link.startsWith('https://')) {
        result.style.color = 'green';
        result.textContent = "Link verificado (esta función no es 100% segura)";
    } else {
        result.style.color = 'red';
        result.textContent = "Link sospechoso (esta función no es 100% segura)";
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

// Cambio de tema
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});