// tickets.js
// FUNCIONALIDAD DE BOTONES Y TOTAL DINÁMICO

// ==== CONFIGURACIÓN ====
const prices = {
  normal: 140,
  silver: 215,
  minor: 95
};

const counts = {
  normal: 0,
  silver: 0,
  minor: 0
};

// ==== FUNCIONES ====

// Formatea el total como moneda
function formatCurrency(value) {
  return value.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  });
}

// Actualiza el número mostrado de entradas
function updateDisplayCount(type) {
  const el = document.getElementById(`${type}-count`);
  if (el) {
    el.textContent = counts[type] ?? 0;

    // efecto visual al cambiar
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 200);
  }
}

// Recalcula el total y lo actualiza en pantalla
function updateTotal() {
  const totalVal =
    (counts.normal * prices.normal) +
    (counts.silver * prices.silver) +
    (counts.minor * prices.minor);

  const totalEl = document.getElementById('total');
  if (!totalEl) return;

  totalEl.textContent = formatCurrency(totalVal);

  // Animación suave al actualizar el total
  totalEl.parentElement.classList.add('updated');
  setTimeout(() => totalEl.parentElement.classList.remove('updated'), 250);
}

// Actualiza el contador sin permitir números negativos
function safeUpdateCountsAndUI(type, change) {
  if (!(type in counts)) {
    console.warn('Tipo de ticket desconocido:', type);
    return;
  }

  counts[type] = Math.max(0, counts[type] + change);
  updateDisplayCount(type);
  updateTotal();
}

// Función principal llamada desde los botones
function updateTickets(type, change) {
  // Asegurar que el cambio siempre sea de ±1
  const realChange = change > 0 ? 1 : -1;
  safeUpdateCountsAndUI(type, realChange);
}

window.updateTickets = updateTickets;

// ==== INICIALIZACIÓN ====
document.addEventListener('DOMContentLoaded', () => {
  Object.keys(counts).forEach(updateDisplayCount);
  updateTotal();

  // Asegura que todos los botones funcionen incluso si no tienen onclick (por compatibilidad futura)
  document.querySelectorAll('.ctrl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ticket = btn.closest('.ticket');
      const type = ticket?.dataset.type;
      if (!type) return;

      const txt = btn.textContent.trim();
      const change = txt === '+' ? 1 : txt === '−' || txt === '-' ? -1 : 0;
      if (change !== 0) updateTickets(type, change);
    });
  });
});





FORMULARIO 

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  // Validar nombre
  if (nameInput.value.trim() === "") {
    document.getElementById("nameError").textContent = "Please enter your name.";
    valid = false;
  } else {
    document.getElementById("nameError").textContent = "";
  }

  // Validar apellido
  if (surnameInput.value.trim() === "") {
    document.getElementById("surnameError").textContent = "Please enter your surname.";
    valid = false;
  } else {
    document.getElementById("surnameError").textContent = "";
  }

  // Validar email
  if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    document.getElementById("emailError").textContent = "Please enter a valid email.";
    valid = false;
  } else {
    document.getElementById("emailError").textContent = "";
  }

  // Validar contraseña
  if (passwordInput.value.trim().length < 6) {
    document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
    valid = false;
  } else {
    document.getElementById("passwordError").textContent = "";
  }

  // Si todo está correcto
  if (valid) {
    alert("✅ Form successfully submitted!");
    form.reset();
  }
});





  document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.querySelector(".menu-toggle i");
    const navLinks = document.querySelector(".nav-links");

    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  });



MENU 

const menuToggle = document.querySelector('.menu-toggle i');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Cambiar el icono (hamburguesa <-> cruz)
    menuToggle.classList.toggle('fa-bars');
    menuToggle.classList.toggle('fa-xmark');
  });

  