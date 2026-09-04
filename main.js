
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
    btn.className = `cat-btn flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${i === activeCategory ? 'text-white shadow-md' : 'border-border bg-secondary text-muted-foreground hover:text-foreground'}`;
    if(i === activeCategory) {
      btn.style.backgroundColor = cat.color;
      btn.style.borderColor = cat.color;
    }
    btn.onclick = () => switchCategory(i);
    btn.innerHTML = `<i data-lucide="${cat.icon}" class="h-4 w-4"></i> ${cat.short}`;
    categoryButtonsContainer.appendChild(btn);

    // --- 2. Tarjetas de Servicios ---
    const srvBtn = document.createElement('button');
    srvBtn.className = 'group flex h-full w-full flex-col rounded-2xl border border-border bg-card p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl reveal';
    srvBtn.setAttribute('data-delay', i * 80);
    srvBtn.onclick = () => { 
      switchCategory(i); 
      document.getElementById('categorias').scrollIntoView({ behavior: 'smooth' }); 
    };
    
    let itemsHtml = cat.items.slice(0,3).map(it => `<li class="flex items-center gap-2"><span class="font-bold" style="color: ${cat.color}">•</span>${it}</li>`).join('');
    
    srvBtn.innerHTML = `
      <span class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors" style="background-color: color-mix(in srgb, ${cat.color} 12%, transparent)">
        <i data-lucide="${cat.icon}" class="h-6 w-6" style="color: ${cat.color}"></i>
      </span>
      <span class="font-display text-lg font-bold text-foreground">${cat.n}. ${cat.name}</span>
      <span class="mt-2 text-xs text-muted-foreground">${cat.desc}</span>
      <ul class="mt-4 space-y-2 text-sm text-muted-foreground">${itemsHtml}</ul>
      <span class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
        Ver categoría <i data-lucide="arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1"></i>
      </span>
    `;
    servicesGrid.appendChild(srvBtn);

    // --- 3. Enlaces del Footer ---
    const footerLi = document.createElement('li');
    footerLi.innerHTML = `<a href="#categorias" class="transition-colors hover:text-[var(--amber-brand)]" onclick="switchCategory(${i})">${cat.name}</a>`;
    footerCategories.appendChild(footerLi);
  });

  // Añadir la última tarjeta especial a los servicios
  const specialSrv = document.createElement('div');
  specialSrv.className = 'reveal flex h-full flex-col justify-center rounded-2xl bg-[var(--ink)] p-8 text-white';
  specialSrv.setAttribute('data-delay', 400);
  specialSrv.innerHTML = `
    <i data-lucide="sparkles" class="h-7 w-7 text-[var(--amber-brand)]"></i>
    <h3 class="mt-4 font-display text-xl font-bold text-white">¿No encuentras lo que buscas?</h3>
    <p class="mt-2 text-sm text-white/70">Producimos piezas a medida: troqueles especiales, empaques, acabados con relieve, laminados y barnices selectivos.</p>
    <a href="#contacto" class="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--amber-brand)] px-5 py-3 font-bold text-[var(--ink)] transition-all hover:brightness-105">
      Consultar <i data-lucide="arrow-right" class="h-4 w-4"></i>
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
      btn.className = 'cat-btn flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all text-white shadow-md';
      btn.style.backgroundColor = cat.color;
      btn.style.borderColor = cat.color;
    } else {
      btn.className = 'cat-btn flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all border-border bg-secondary text-muted-foreground hover:text-foreground';
      btn.style.backgroundColor = '';
      btn.style.borderColor = '';
    }
  });
  
  renderCategoryContent();
  lucide.createIcons();
}

// Renderizar área de contenido de la categoría actual
function renderCategoryContent() {
  const cat = categories[activeCategory];
  let itemsHtml = cat.items.map(it => `
    <li class="flex items-center gap-3 text-sm font-medium">
      <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style="background-color: ${cat.color}">
        <i data-lucide="check" class="h-3.5 w-3.5"></i>
      </span>
      ${it}
    </li>
  `).join('');

  categoryContentContainer.innerHTML = `
    <div class="relative overflow-hidden rounded-2xl">
      <img src="${cat.image}" alt="${cat.name}" loading="lazy" class="h-72 w-full object-cover duration-500 lg:h-[26rem]" style="animation: fadeIn 0.5s ease-in-out;" />
      <span class="absolute left-4 top-4 rounded-full px-3 py-1 font-display text-xs font-extrabold text-white" style="background-color: ${cat.color}">
        ${cat.n}
      </span>
    </div>
    <div style="animation: fadeIn 0.5s ease-in-out;">
      <h3 class="font-display text-2xl font-extrabold text-foreground sm:text-3xl">${cat.name}</h3>
      <p class="mt-4 text-muted-foreground">${cat.desc}</p>
      <ul class="mt-6 space-y-3">${itemsHtml}</ul>
      <a href="#contacto" class="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--ink)] px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5">
        Cotizar ${cat.short} <i data-lucide="arrow-right" class="h-4 w-4"></i>
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