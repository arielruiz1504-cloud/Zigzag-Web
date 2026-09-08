// Inicializar Iconos
lucide.createIcons();

// Data de Categorías
const categories = [
  {
    id: "branding", n: "01", name: "Identidad de Marca", short: "Branding",
    desc: "Creamos o renovamos la imagen visual de tu negocio con una identidad coherente en todos sus puntos de contacto.",
    items: ["Diseño de logotipos", "Manual de marca", "Papelería corporativa", "Tarjetas y credenciales"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    icon: "palette", color: "var(--cyan-brand)"
  },
  {
    id: "publicidad", n: "02", name: "Diseño Publicitario", short: "Publicidad",
    desc: "Materiales pensados para promocionar productos y servicios con impacto real en el punto de venta.",
    items: ["Flyers y folletos", "Catálogos de productos", "Merchandising (tazas, poleras, lápices)", "Afiches y volantes"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    icon: "megaphone", color: "var(--magenta-brand)"
  },
  {
    id: "editorial", n: "03", name: "Diseño Editorial", short: "Editorial",
    desc: "Maquetación profesional de documentos extensos, cuidando tipografía, ritmo visual y calidad de impresión.",
    items: ["Libros y revistas", "Menús de restaurantes", "Memorias y reportes corporativos", "Anuarios y agendas"],
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=80",
    icon: "book-open", color: "var(--amber-brand)"
  },
  {
    id: "granformato", n: "04", name: "Gran Formato e Impresión", short: "Gran Formato",
    desc: "Impresión física a gran escala para máxima visibilidad exterior, con materiales resistentes a la intemperie.",
    items: ["Letreros y avisos", "Vinilos decorativos", "Señalética de seguridad", "Pendones y roller banners"],
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1200&q=80",
    icon: "printer", color: "var(--magenta-brand)"
  },
  {
    id: "digital", n: "05", name: "Diseño Digital y Redes", short: "Digital",
    desc: "Piezas digitales consistentes con tu marca para redes sociales, e-commerce y presentaciones corporativas.",
    items: ["Kits para Instagram, Facebook y LinkedIn", "Banners web para e-commerce", "Presentaciones corporativas", "Firmas de correo y plantillas"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    icon: "monitor-smartphone", color: "var(--teal-brand)"
  }
];

// Variables de DOM
const categoryButtonsContainer = document.getElementById('category-buttons');
const categoryContentContainer = document.getElementById('category-content-container');
const servicesGrid = document.getElementById('services-grid');
const footerCategories = document.getElementById('footer-categories');
let activeCategory = 0;

// Renderizar Categorías y Servicios
function initCategories() {
  categoryButtonsContainer.innerHTML = '';
  servicesGrid.innerHTML = '';
  footerCategories.innerHTML = '';

  categories.forEach((cat, i) => {
    // --- 1. Botones de Pestañas ---
    const btn = document.createElement('button');
    btn.className = `cat-btn ${i === activeCategory ? 'active' : ''}`;
    if(i === activeCategory) {
      btn.style.backgroundColor = cat.color;
      btn.style.borderColor = cat.color;
      btn.style.color = '#fff';
      btn.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
    }
    btn.onclick = () => switchCategory(i);
    btn.innerHTML = `<i data-lucide="${cat.icon}" style="width: 1rem; height: 1rem;"></i> ${cat.short}`;
    categoryButtonsContainer.appendChild(btn);

    // --- 2. Tarjetas de Servicios ---
    const srvBtn = document.createElement('button');
    srvBtn.className = 'service-card reveal';
    srvBtn.setAttribute('data-delay', i * 80);
    srvBtn.onclick = () => { 
      switchCategory(i); 
      categoryContentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    };
    
    let itemsHtml = cat.items.slice(0,3).map(it => `
      <li style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-weight: 700; color: ${cat.color}">•</span>${it}
      </li>
    `).join('');
    
    srvBtn.innerHTML = `
      <div class="service-icon-box" style="background-color: color-mix(in srgb, ${cat.color} 12%, transparent)">
        <i data-lucide="${cat.icon}" style="width: 1.5rem; height: 1.5rem; color: ${cat.color}"></i>
      </div>
      <span class="service-title">${cat.n}. ${cat.name}</span>
      <span class="service-desc">${cat.desc}</span>
      <span class="service-link">
        Ver categoría <i data-lucide="arrow-right" style="width: 1rem; height: 1rem;"></i>
      </span>
    `;
    servicesGrid.appendChild(srvBtn);

    // --- 3. Enlaces del Footer ---
    const footerLi = document.createElement('li');
    footerLi.innerHTML = `<a href="#categorias" onclick="switchCategory(${i})">${cat.name}</a>`;
    footerCategories.appendChild(footerLi);
  });

  // Añadir la última tarjeta especial a los servicios
  const specialSrv = document.createElement('div');
  specialSrv.className = 'service-card-special reveal';
  specialSrv.setAttribute('data-delay', 400);
  specialSrv.innerHTML = `
    <i data-lucide="sparkles" style="width: 1.75rem; height: 1.75rem; color: var(--amber-brand)"></i>
    <h3>¿No encuentras lo que buscas?</h3>
    <p>Producimos piezas a medida: troqueles especiales, empaques, acabados con relieve, laminados y barnices selectivos.</p>
    <a href="#contacto" class="btn-special">
      Consultar <i data-lucide="arrow-right" style="width: 1rem; height: 1rem;"></i>
    </a>
  `;
  servicesGrid.appendChild(specialSrv);

  renderCategoryContent();
  lucide.createIcons();
}

// Cambiar Pestaña
function switchCategory(index) {
  activeCategory = index;
  
  const btns = categoryButtonsContainer.querySelectorAll('.cat-btn');
  categories.forEach((cat, i) => {
    const btn = btns[i];
    if (i === index) {
      btn.style.backgroundColor = cat.color;
      btn.style.borderColor = cat.color;
      btn.style.color = '#fff';
      btn.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
    } else {
      btn.style.backgroundColor = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      btn.style.boxShadow = '';
    }
  });
  
  renderCategoryContent();
  lucide.createIcons();
}

// Renderizar área de contenido de la categoría actual
function renderCategoryContent() {
  const cat = categories[activeCategory];
  let itemsHtml = cat.items.map(it => `
    <li class="category-list-item">
      <span class="category-check-icon" style="background-color: ${cat.color}">
        <i data-lucide="check" style="width: 0.875rem; height: 0.875rem;"></i>
      </span>
      ${it}
    </li>
  `).join('');

  categoryContentContainer.innerHTML = `
    <div class="category-media">
      <img src="${cat.image}" alt="${cat.name}" loading="lazy" />
      <span class="category-badge-floating" style="background-color: ${cat.color}">
        ${cat.n}
      </span>
    </div>
    <div class="category-details">
      <h3>${cat.name}</h3>
      <p>${cat.desc}</p>
      <ul class="category-list">${itemsHtml}</ul>
      <a href="#contacto" class="btn-category-action">
        Cotizar ${cat.short} <i data-lucide="arrow-right" style="width: 1rem; height: 1rem;"></i>
      </a>
    </div>
  `;
}

// Intersección (Scroll Reveal)
function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Menú Mobile
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('menu-icon-open');
const iconClose = document.getElementById('menu-icon-close');

mobileBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  iconOpen.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

// Formulario de Contacto
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('form-success').classList.remove('hidden');
  this.reset();
});

// Ejecutar inicio al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  initCategories();
  initScrollReveal();
});