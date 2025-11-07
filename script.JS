// tickets.js
// FUNCIONALIDAD DE BOTONES Y TOTAL DINÁMICO

const prices = {
  normal: 140,
  silver: 215,
  minor: 95
};

// Cantidades iniciales (coinciden con los valores que quieres por defecto)
const counts = {
  normal: 0,
  silver: 0,
  minor: 0
};

// Formateo sencillo de moneda (puedes ajustar separación de miles si quieres)
function formatCurrency(n){
  return n + '€';
}

// Actualiza el contador visible para un tipo
function updateDisplayCount(type){
  const el = document.getElementById(`${type}-count`);
  if(el) el.textContent = counts[type] ?? 0;
}

// Recalcula y escribe el total (y aplica animación breve)
function updateTotal(){
  const totalVal =
    (counts.normal || 0) * prices.normal +
    (counts.silver || 0) * prices.silver +
    (counts.minor || 0) * prices.minor;

  const totalEl = document.getElementById('total');
  if(!totalEl) return;

  totalEl.textContent = formatCurrency(totalVal);

  // efecto visual en el contenedor
  const parent = totalEl.parentElement;
  if(parent){
    parent.classList.add('updated');
    window.setTimeout(()=> parent.classList.remove('updated'), 200);
  }
}

// Actualiza counts (evita negativos) y refresca UI
function safeUpdateCountsAndUI(type, change){
  if(!(type in counts)){
    console.warn('Tipo desconocido:', type);
    return;
  }
  counts[type] = Math.max(0, Number(counts[type]) + Number(change));
  updateDisplayCount(type);
  updateTotal();
}

// Función expuesta para compatibilidad con onclick inline
function updateTickets(type, change){
  safeUpdateCountsAndUI(type, change);
}

// Hacer global (por si tu HTML usa onclick="updateTickets(...)")
window.updateTickets = updateTickets;

// Inicializa contadores visibles y engancha listeners a botones (por si usas data-attrs)
document.addEventListener('DOMContentLoaded', function(){
  // inicializa mostradores
  Object.keys(counts).forEach(updateDisplayCount);
  updateTotal();

  // Adicional: detectar botones con data-type/data-change — útil si quieres migrar
  document.querySelectorAll('.ctrl-btn').forEach(btn => {
    // si el botón ya tiene onclick inline, lo dejaremos — pero añadimos listener por compatibilidad
    btn.addEventListener('click', (e) => {
      // intentar leer dataset (si lo cambias en el futuro)
      const dt = btn.dataset.type;
      const dc = btn.dataset.change;
      if(dt && dc){
        safeUpdateCountsAndUI(dt, Number(dc));
        return;
      }

      // si no hay dataset, extraer del onclick si existe (compat.)
      const onclick = btn.getAttribute('onclick') || '';
      const m = onclick.match(/updateTickets\(\s*['"]?([a-zA-Z0-9_-]+)['"]?\s*,\s*([-]?\d+)\s*\)/);
      if(m){
        safeUpdateCountsAndUI(m[1], Number(m[2]));
        return;
      }

      // fallback: parsear texto +/-
      const txt = (btn.textContent || btn.innerText || '').trim();
      let change = NaN;
      if(txt === '+' || txt === '＋') change = 1;
      if(txt === '-' || txt === '−' || txt === '—') change = -1;
      // si no se detecta tipo, buscar el ancestor ticket y su data-type
      const ticket = btn.closest('.ticket');
      const type = ticket ? ticket.dataset.type : null;
      if(type && !Number.isNaN(change)){
        safeUpdateCountsAndUI(type, change);
      } else {
        // no se pudo interpretar; no hacemos nada
        console.warn('Botón ctrl-btn no interpretable', btn);
      }
    });
  });
});




// Seleccionamos elementos
const modal = document.getElementById("reminderModal");
const closeBtn = document.querySelector(".close");
const buttons = document.querySelectorAll(".extra-btn");

// Al hacer clic en los botones
buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });
});

// Al hacer clic en la X
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Al hacer clic fuera del modal
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
