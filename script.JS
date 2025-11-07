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


// Seleccionamos la modal y la "x"
const modal = document.getElementById("reminderModal");
const closeBtn = modal.querySelector(".close");

// Seleccionamos todos los botones que deben abrir la modal
const extraBtns = document.querySelectorAll(".extra-btn");

// Abrir modal al hacer clic en cualquier botón
extraBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // evita que el enlace haga scroll o cambie de página
    modal.style.display = "flex"; // mostramos la modal
  });
});

// Cerrar modal al pulsar la "x"
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


// FORMULARIO 

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const inputs = {
    name: document.getElementById("name"),
    surname: document.getElementById("surname"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Nombre
    if (inputs.name.value.trim() === "") {
      showError("nameError", "Please enter your name.");
      valid = false;
    } else clearError("nameError");

    // Apellido
    if (inputs.surname.value.trim() === "") {
      showError("surnameError", "Please enter your surname.");
      valid = false;
    } else clearError("surnameError");

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value)) {
      showError("emailError", "Please enter a valid email.");
      valid = false;
    } else clearError("emailError");

    // Contraseña
    if (inputs.password.value.trim().length < 6) {
      showError("passwordError", "Password must be at least 6 characters.");
      valid = false;
    } else clearError("passwordError");

    if (valid) {
      document.getElementById("successMessage").textContent =
        "✅ Form successfully submitted!";
      form.reset();
    } else {
      document.getElementById("successMessage").textContent = "";
    }
  });

  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  function clearError(id) {
    document.getElementById(id).textContent = "";
  }
});



// MENU 


document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks   = document.querySelector(".nav-links");
  const icon       = menuToggle.querySelector("i");

  // Estado inicial accesible
  menuToggle.setAttribute("role", "button");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.tabIndex = 0;

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle("active");
    // Alterna icono barras ↔ X
    icon.classList.toggle("fa-bars", !isOpen);
    icon.classList.toggle("fa-xmark", isOpen);
    // Accesibilidad
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  }

  // Click o Enter/Espacio
  menuToggle.addEventListener("click", toggleMenu);
  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleMenu(); }
  });
});
