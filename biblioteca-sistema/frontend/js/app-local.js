/**
 * Sistema Inteligente de Gestión de Biblioteca - Versión Local
 * Frontend JavaScript sin backend
 * Sprint 1: Usuarios, Catálogo, Préstamos, Devoluciones y Reservas
 */

// Configuración
const STORAGE_KEY = 'biblioteca_data';

// Estado de la aplicación
const state = {
    currentUser: null,
    currentSection: 'inicio',
    libros: [],
    categorias: [],
    usuarios: [],
    prestamos: [],
    devoluciones: [],
    reservas: [],
    favoritos: []
};

// Elementos del DOM
const elements = {};
// Secciones
elements.loginSection = document.getElementById('loginSection');
elements.registerSection = document.getElementById('registerSection');
elements.inicioSection = document.getElementById('inicioSection');
elements.librosSection = document.getElementById('librosSection');
elements.prestamosSection = document.getElementById('prestamosSection');
elements.devolucionesSection = document.getElementById('devolucionesSection');
elements.reservasSection = document.getElementById('reservasSection');
elements.usuariosSection = document.getElementById('usuariosSection');
elements.misLibrosSection = document.getElementById('misLibrosSection');
elements.reportesSection = document.getElementById('reportesSection');
// Header
elements.mainNav = document.getElementById('mainNav');
elements.userInfo = document.getElementById('userInfo');
elements.userName = document.getElementById('userName');
elements.userRole = document.getElementById('userRole');
elements.logoutBtn = document.getElementById('logoutBtn');
elements.themeToggle = document.getElementById('themeToggle');
// Formularios
elements.loginForm = document.getElementById('loginForm');
elements.registerForm = document.getElementById('registerForm');
elements.bookForm = document.getElementById('bookForm');
elements.loanForm = document.getElementById('loanForm');
elements.userForm = document.getElementById('userForm');
// Dashboard
elements.totalLibros = document.getElementById('totalLibros');
elements.totalUsuarios = document.getElementById('totalUsuarios');
elements.prestamosActivos = document.getElementById('prestamosActivos');
elements.reservasActivas = document.getElementById('reservasActivas');
elements.librosMasPrestados = document.getElementById('librosMasPrestados');
elements.adminSection = document.getElementById('adminSection');
// Libros
elements.librosList = document.getElementById('librosList');
elements.booksEmptyState = document.getElementById('booksEmptyState');
elements.searchTitulo = document.getElementById('searchTitulo');
elements.searchAutor = document.getElementById('searchAutor');
elements.searchCategoria = document.getElementById('searchCategoria');
elements.searchDisponible = document.getElementById('searchDisponible');
elements.addBookBtn = document.getElementById('addBookBtn');
elements.refreshBooks = document.getElementById('refreshBooks');
// Prestamos
elements.prestamosList = document.getElementById('prestamosList');
elements.filterPrestamoEstado = document.getElementById('filterPrestamoEstado');
elements.addLoanBtn = document.getElementById('addLoanBtn');
elements.refreshLoans = document.getElementById('refreshLoans');
// Devoluciones
elements.devolucionesList = document.getElementById('devolucionesList');
elements.refreshReturns = document.getElementById('refreshReturns');
// Reservas
elements.reservasList = document.getElementById('reservasList');
elements.refreshReservations = document.getElementById('refreshReservations');
// Usuarios
elements.usuariosList = document.getElementById('usuariosList');
elements.addUserBtn = document.getElementById('addUserBtn');
elements.refreshUsers = document.getElementById('refreshUsers');
// Reportes
elements.reportesList = document.getElementById('reportesList');
elements.reportesEmpty = document.getElementById('reportesEmpty');
elements.refreshReports = document.getElementById('refreshReports');
elements.downloadPdfBtn = document.getElementById('downloadPdfBtn');
elements.downloadExcelBtn = document.getElementById('downloadExcelBtn');
// Reportes - Elementos de resumen
elements.reportTotalLibros = document.getElementById('reportTotalLibros');
elements.reportTotalUsuarios = document.getElementById('reportTotalUsuarios');
elements.reportTotalPrestamos = document.getElementById('reportTotalPrestamos');
elements.reportTotalDevoluciones = document.getElementById('reportTotalDevoluciones');
elements.reportTotalReservas = document.getElementById('reportTotalReservas');
elements.reportTotalMultas = document.getElementById('reportTotalMultas');
// Mis Libros
elements.misLibrosLeidos = document.getElementById('misLibrosLeidos');
elements.misFavoritosList = document.getElementById('misFavoritosList');
elements.misLibrosEmpty = document.getElementById('misLibrosEmpty');
// Modales
elements.bookModal = document.getElementById('bookModal');
elements.loanModal = document.getElementById('loanModal');
elements.userModal = document.getElementById('userModal');
elements.bookDetailModal = document.getElementById('bookDetailModal');
// Toast
elements.toast = document.getElementById('toast');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    loadData();
    checkAuth();
});

// Almacenamiento local
function saveData() {
    const data = {
        libros: state.libros,
        categorias: state.categorias,
        usuarios: state.usuarios,
        prestamos: state.prestamos,
        devoluciones: state.devoluciones,
        reservas: state.reservas,
        favoritos: state.favoritos || []
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        const parsed = JSON.parse(data);
        state.libros = parsed.libros || [];
        state.categorias = parsed.categorias || [];
        state.usuarios = parsed.usuarios || [];
        state.prestamos = parsed.prestamos || [];
        state.devoluciones = parsed.devoluciones || [];
        state.reservas = parsed.reservas || [];
        state.favoritos = parsed.favoritos || [];
    } else {
        // Datos iniciales
        initDefaultData();
    }
}

function initDefaultData() {
    // Categorías
    state.categorias = [
        { id: 1, nombre: 'Ficción', descripcion: 'Literatura de ficción general' },
        { id: 2, nombre: 'Ciencia Ficción', descripcion: 'Novelas de ciencia ficción y fantasía' },
        { id: 3, nombre: 'Tecnología', descripcion: 'Libros sobre tecnología y programación' },
        { id: 4, nombre: 'Educación', descripcion: 'Material educativo y académico' },
        { id: 5, nombre: 'Historia', descripcion: 'Libros de historia y biografías' },
        { id: 6, nombre: 'Matemáticas', descripcion: 'Textos de matemáticas y lógica' }
    ];

    // Administrador
    state.usuarios = [
        {
            id: 1,
            nombre: 'Admin',
            apellido: 'Biblioteca',
            carnet: 'ADMIN001',
            correo: 'admin@biblioteca.com',
            tipo_usuario: 'ADMINISTRADOR',
            estado: 'ACTIVO'
        }
    ];

    // Libros
    state.libros = [
        {
            id: 1,
            titulo: 'Fundamentos de Programación',
            autor: 'Luis Joyanes',
            editorial: 'McGraw-Hill',
            isbn: '978-9701072450',
            id_categoria: 3,
            anio_publicacion: 2020,
            ejemplares_totales: 5,
            ejemplares_disponibles: 5,
            descripcion: 'Libro básico de programación',
            estado: 'ACTIVO'
        },
        {
            id: 2,
            titulo: 'Matemáticas Discretas',
            autor: 'Richard Johnsonbaugh',
            editorial: 'Pearson',
            isbn: '978-6073220586',
            id_categoria: 6,
            anio_publicacion: 2019,
            ejemplares_totales: 3,
            ejemplares_disponibles: 3,
            descripcion: 'Matemáticas para ciencias de la computación',
            estado: 'ACTIVO'
        },
        {
            id: 3,
            titulo: 'Historia Universal',
            autor: 'José Luis Esquivel',
            editorial: 'Editorial Patria',
            isbn: '978-6075320123',
            id_categoria: 5,
            anio_publicacion: 2021,
            ejemplares_totales: 2,
            ejemplares_disponibles: 2,
            descripcion: 'Historia general de la humanidad',
            estado: 'ACTIVO'
        },
        {
            id: 4,
            titulo: 'Introducción a la Física',
            autor: 'Paul Tipler',
            editorial: 'Editorial Reverté',
            isbn: '978-8429144295',
            id_categoria: 4,
            anio_publicacion: 2018,
            ejemplares_totales: 4,
            ejemplares_disponibles: 4,
            descripcion: 'Física básica para estudiantes',
            estado: 'ACTIVO'
        },
        {
            id: 5,
            titulo: 'El Señor de los Anillos',
            autor: 'J.R.R. Tolkien',
            editorial: 'Minotauro',
            isbn: '978-9877380789',
            id_categoria: 2,
            anio_publicacion: 2020,
            ejemplares_totales: 3,
            ejemplares_disponibles: 3,
            descripcion: 'Trilogía de fantasía épica',
            estado: 'ACTIVO'
        }
    ];

    saveData();
}

// Event Listeners
function initEventListeners() {
    // Navegación
    elements.mainNav.addEventListener('click', (e) => {
        if (e.target.closest('.nav-link')) {
            e.preventDefault();
            const section = e.target.closest('.nav-link').dataset.section;
            navigateTo(section);
        }
    });

    // Formularios
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.registerForm.addEventListener('submit', handleRegister);
    elements.logoutBtn.addEventListener('click', handleLogout);

    // Libros
    elements.searchTitulo.addEventListener('input', filterLibros);
    elements.searchAutor.addEventListener('input', filterLibros);
    elements.searchCategoria.addEventListener('change', filterLibros);
    elements.searchDisponible.addEventListener('change', filterLibros);
    elements.addBookBtn.addEventListener('click', () => openBookModal());
    elements.refreshBooks.addEventListener('click', loadLibros);

    // Préstamos
    elements.filterPrestamoEstado.addEventListener('change', filterPrestamos);
    elements.addLoanBtn.addEventListener('click', () => openLoanModal());
    elements.refreshLoans.addEventListener('click', loadPrestamos);

    // Devoluciones
    elements.refreshReturns.addEventListener('click', loadDevoluciones);

    // Reservas
    elements.refreshReservations.addEventListener('click', loadReservas);

    // Usuarios
    elements.addUserBtn.addEventListener('click', () => openUserModal());
    elements.refreshUsers.addEventListener('click', loadUsuarios);

    // Modales
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modalId = e.target.dataset.modal;
            closeModal(modalId);
        });
    });

    // Cerrar modales al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Formulario de prestarse (Lector)
    const prestarseForm = document.getElementById('prestarseForm');
    if (prestarseForm) {
        prestarseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const libroId = parseInt(document.getElementById('prestarseLibroId').value);
            const ci = document.getElementById('prestarseCI').value;
            const ru = document.getElementById('prestarseRU').value;
            const celular = document.getElementById('prestarseCelular').value;

            const libro = state.libros.find(l => l.id === libroId);
            if (!libro) {
                showToast('Libro no encontrado', 'error');
                return;
            }
            if (libro.ejemplares_disponibles <= 0) {
                showToast('No hay ejemplares disponibles', 'error');
                return;
            }

            const fechaPrestamo = new Date();
            const fechaVencimiento = new Date();
            fechaVencimiento.setDate(fechaPrestamo.getDate() + 14);

            const nuevoPrestamo = {
                id: Date.now(),
                id_usuario: state.currentUser.id,
                id_libro: libroId,
                fecha_prestamo: fechaPrestamo.toISOString(),
                fecha_vencimiento: fechaVencimiento.toISOString(),
                fecha_devolucion: null,
                estado: 'PRESTADO',
                creado_por: state.currentUser.id,
                ci_prenda: ci,
                ru_prenda: ru,
                celular: celular
            };

            state.prestamos.push(nuevoPrestamo);
            libro.ejemplares_disponibles -= 1;
            saveData();

            showToast('Préstamo solicitado y registrado con éxito', 'success');
            closeModal('prestarseModal');
            loadPrestamos();
            loadDashboard();
            loadLibros();
        });
    }

    // Mostrar/Ocultar registro
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        toggleSections(elements.loginSection, elements.registerSection);
    });

    document.getElementById('cancelRegister').addEventListener('click', () => {
        toggleSections(elements.registerSection, elements.loginSection);
    });
}

// Autenticación
function checkAuth() {
    const token = localStorage.getItem('biblioteca_token');
    if (token) {
        state.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        showMainApp();
        loadDashboard();
    } else {
        showLogin();
    }
}

async function handleLogin(e) {
    e.preventDefault();

    const correo = document.getElementById('loginCorreo').value;
    const carnet = document.getElementById('loginCarnet').value;

    const usuario = state.usuarios.find(u => u.correo === correo && u.carnet === carnet && u.estado === 'ACTIVO');

    if (usuario) {
        localStorage.setItem('biblioteca_token', 'local-token');
        localStorage.setItem('currentUser', JSON.stringify(usuario));
        state.currentUser = usuario;
        showMainApp();
        loadDashboard();
        showToast('¡Bienvenido de nuevo!', 'success');
    } else {
        showToast('Credenciales inválidas o usuario inactivo', 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();

    const nombre = document.getElementById('registroNombre').value;
    const apellido = document.getElementById('registroApellido').value;
    const carnet = document.getElementById('registroCarnet').value;
    const correo = document.getElementById('registroCorreo').value;
    const tipo_usuario = document.getElementById('registroTipo').value || 'LECTOR';

    if (!nombre || !apellido || !carnet || !correo || !tipo_usuario) {
        showToast('Por favor, complete todos los campos', 'warning');
        return;
    }

    // Verificar duplicados
    if (state.usuarios.find(u => u.carnet === carnet)) {
        showToast('El carnet ya está registrado', 'error');
        return;
    }

    if (state.usuarios.find(u => u.correo === correo)) {
        showToast('El correo ya está registrado', 'error');
        return;
    }

    const nuevoUsuario = {
        id: Date.now(),
        nombre,
        apellido,
        carnet,
        correo,
        tipo_usuario: 'LECTOR', // Asegurar rol lector en registro público
        estado: 'ACTIVO'
    };

    state.usuarios.push(nuevoUsuario);
    saveData();

    showToast('Usuario registrado exitosamente', 'success');
    toggleSections(elements.registerSection, elements.loginSection);
    elements.registerForm.reset();
}

function handleLogout() {
    localStorage.removeItem('biblioteca_token');
    localStorage.removeItem('currentUser');
    state.currentUser = null;
    showLogin();
    showToast('Sesión cerrada', 'info');
}

// Navegación
function navigateTo(section) {
    state.currentSection = section;

    // Actualizar navegación activa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`.nav-link[data-section="${section}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Mostrar sección correspondiente
    switch (section) {
        case 'inicio':
            showSection(elements.inicioSection);
            loadDashboard();
            break;
        case 'libros':
            showSection(elements.librosSection);
            loadLibros();
            break;
        case 'prestamos':
            showSection(elements.prestamosSection);
            loadPrestamos();
            break;
        case 'devoluciones':
            showSection(elements.devolucionesSection);
            loadDevoluciones();
            break;
        case 'reservas':
            showSection(elements.reservasSection);
            loadReservas();
            break;
        case 'usuarios':
            if (state.currentUser?.tipo_usuario === 'ADMINISTRADOR') {
                showSection(elements.usuariosSection);
                loadUsuarios();
            } else {
                showToast('Acceso denegado', 'error');
            }
            break;
        case 'mis-libros':
            if (state.currentUser) {
                showSection(elements.misLibrosSection);
                loadMisLibros();
            } else {
                showToast('Debes iniciar sesión', 'warning');
            }
            break;
        case 'reportes':
            if (state.currentUser?.tipo_usuario === 'ADMINISTRADOR') {
                showSection(elements.reportesSection);
                loadReportes();
            } else {
                showToast('Acceso denegado', 'error');
            }
            break;
    }
}

function showLogin() {
    toggleSections(elements.inicioSection, elements.loginSection);
    elements.loginSection.style.display = 'block';
    elements.registerSection.style.display = 'none';
    elements.userInfo.style.display = 'none';
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
}

function showMainApp() {
    elements.loginSection.style.display = 'none';
    elements.registerSection.style.display = 'none';
    elements.userInfo.style.display = 'flex';
    elements.userName.textContent = `${state.currentUser.nombre} ${state.currentUser.apellido}`;
    elements.userRole.textContent = state.currentUser.tipo_usuario;

    // Mostrar/ocultar elementos según rol
    if (state.currentUser.tipo_usuario === 'ADMINISTRADOR') {
        document.body.classList.add('is-admin');
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'inline-flex');
    } else {
        document.body.classList.remove('is-admin');
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    }

    navigateTo('inicio');
}

function showSection(section) {
    // Ocultar todas las secciones
    const sections = [
        elements.inicioSection,
        elements.librosSection,
        elements.prestamosSection,
        elements.devolucionesSection,
        elements.reservasSection,
        elements.usuariosSection,
        elements.misLibrosSection,
        elements.reportesSection
    ].filter(Boolean);

    sections.forEach(sec => {
        if (sec !== section) sec.style.display = 'none';
    });

    if (section) section.style.display = 'block';
}

function toggleSections(hide, show) {
    hide.style.display = 'none';
    show.style.display = 'block';
}

// Dashboard
function loadDashboard() {
    elements.totalLibros.textContent = state.libros.length;
    
    const isLector = state.currentUser?.tipo_usuario !== 'ADMINISTRADOR';

    // Ocultar tarjeta de usuarios para lectores
    const usuariosCard = document.getElementById('usuariosStatCard');
    if (usuariosCard) {
        usuariosCard.style.display = isLector ? 'none' : 'block';
    }

    if (isLector) {
        elements.totalUsuarios.textContent = 0;
        elements.prestamosActivos.textContent = state.prestamos.filter(p => p.estado === 'PRESTADO' && p.id_usuario === state.currentUser.id).length;
        elements.reservasActivas.textContent = state.reservas.filter(r => r.estado === 'ACTIVA' && r.id_usuario === state.currentUser.id).length;
    } else {
        elements.totalUsuarios.textContent = state.usuarios.filter(u => u.estado === 'ACTIVO').length;
        elements.prestamosActivos.textContent = state.prestamos.filter(p => p.estado === 'PRESTADO').length;
        elements.reservasActivas.textContent = state.reservas.filter(r => r.estado === 'ACTIVA').length;
    }

    // Mostrar libros más prestados si es admin
    if (state.currentUser?.tipo_usuario === 'ADMINISTRADOR') {
        elements.adminSection.style.display = 'block';
        renderLibrosMasPrestados();
    } else {
        elements.adminSection.style.display = 'none';
    }
}

function renderLibrosMasPrestados() {
    elements.librosMasPrestados.innerHTML = '';

    // Contar préstamos por libro
    const conteoPrestamos = {};
    state.prestamos.forEach(p => {
        conteoPrestamos[p.id_libro] = (conteoPrestamos[p.id_libro] || 0) + 1;
    });

    const librosConPrestamos = Object.keys(conteoPrestamos).map(id => {
        const libro = state.libros.find(l => l.id === parseInt(id));
        return {
            titulo: libro ? libro.titulo : 'Libro no encontrado',
            total_prestamos: conteoPrestamos[id]
        };
    }).sort((a, b) => b.total_prestamos - a.total_prestamos).slice(0, 5);

    if (librosConPrestamos.length === 0) {
        elements.librosMasPrestados.innerHTML = '<p class="empty-state">No hay datos de préstamos</p>';
        return;
    }

    librosConPrestamos.forEach(libro => {
        const div = document.createElement('div');
        div.className = 'stat-card';
        div.innerHTML = `
            <div class="stat-info">
                <h3>${libro.titulo}</h3>
                <p>${libro.total_prestamos} préstamos</p>
            </div>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${Math.min((libro.total_prestamos / Math.max(...librosConPrestamos.map(l => l.total_prestamos))) * 100, 100)}%"></div>
            </div>
        `;
        elements.librosMasPrestados.appendChild(div);
    });
}

// Libros
function loadLibros() {
    renderLibros();
}

function getCoverColor(id) {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];
    return colors[(id || 0) % colors.length];
}

function getCoverInitial(titulo) {
    if (!titulo) return '?';
    const words = titulo.trim().split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

function renderLibros() {
    elements.librosList.innerHTML = '';

    if (state.libros.length === 0) {
        elements.booksEmptyState.style.display = 'block';
        return;
    }

    elements.booksEmptyState.style.display = 'none';

    state.libros.forEach(libro => {
        const card = document.createElement('div');
        card.className = 'book-card';
        const coverColor = getCoverColor(libro.id);
        const initial = getCoverInitial(libro.titulo);
        card.innerHTML = `
            <div class="book-card-header">
                <div class="book-cover" style="background: linear-gradient(135deg, ${coverColor}, ${coverColor}dd);">
                    <span class="book-cover-initial">${initial}</span>
                    <div class="book-cover-decoration">
                        <i class="fas fa-book-open"></i>
                    </div>
                </div>
                <div class="book-card-info">
                    <h3>${libro.titulo}</h3>
                    <div class="author">${libro.autor}</div>
                </div>
            </div>
            <div class="info">
                <i class="fas fa-tags"></i> ${getCategoriaNombre(libro.id_categoria)}
            </div>
            <div class="info">
                <i class="fas fa-copy"></i> ${libro.ejemplares_disponibles}/${libro.ejemplares_totales} disponibles
            </div>
            <div class="info">
                <i class="fas fa-calendar"></i> ${libro.anio_publicacion || 'Sin año'}
            </div>
            <div class="availability ${libro.ejemplares_disponibles > 0 ? 'available' : 'unavailable'}">
                <i class="fas fa-circle"></i>
                ${libro.ejemplares_disponibles > 0 ? 'Disponible' : 'No disponible'}
            </div>
            <div class="card-actions">
                <button class="btn btn-primary btn-small" onclick="verLibro(${libro.id})">
                    <i class="fas fa-eye"></i> Ver
                </button>
                ${libro.ejemplares_disponibles > 0 ? (
                    state.currentUser?.tipo_usuario === 'ADMINISTRADOR' ? `
                        <button class="btn btn-secondary btn-small" onclick="reservarLibro(${libro.id})">
                            <i class="fas fa-calendar-plus"></i> Reservar
                        </button>
                    ` : `
                        <button class="btn btn-success btn-small" onclick="abrirPrestarseModal(${libro.id})">
                            <i class="fas fa-exchange-alt"></i> Prestarse
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="reservarLibro(${libro.id})">
                            <i class="fas fa-calendar-plus"></i> Reservar
                        </button>
                    `
                ) : ''}
                ${state.currentUser?.tipo_usuario === 'ADMINISTRADOR' ? `
                    <button class="btn btn-warning btn-small" onclick="editarLibro(${libro.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-small" onclick="eliminarLibro(${libro.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                ` : ''}
            </div>
        `;
        elements.librosList.appendChild(card);
    });
}

function filterLibros() {
    const titulo = elements.searchTitulo.value.toLowerCase();
    const autor = elements.searchAutor.value.toLowerCase();
    const categoria = elements.searchCategoria.value;
    const disponible = elements.searchDisponible.checked;

    const filtered = state.libros.filter(libro => {
        const matchesTitulo = !titulo || libro.titulo.toLowerCase().includes(titulo);
        const matchesAutor = !autor || libro.autor.toLowerCase().includes(autor);
        const matchesCategoria = !categoria || libro.id_categoria === parseInt(categoria);
        const matchesDisponible = !disponible || libro.ejemplares_disponibles > 0;

        return matchesTitulo && matchesAutor && matchesCategoria && matchesDisponible;
    });

    elements.librosList.innerHTML = '';

    if (filtered.length === 0) {
        elements.booksEmptyState.style.display = 'block';
        return;
    }

    elements.booksEmptyState.style.display = 'none';

    filtered.forEach(libro => {
        const card = document.createElement('div');
        card.className = 'book-card';
        const coverColor = getCoverColor(libro.id);
        const initial = getCoverInitial(libro.titulo);
        card.innerHTML = `
            <div class="book-card-header">
                <div class="book-cover" style="background: linear-gradient(135deg, ${coverColor}, ${coverColor}dd);">
                    <span class="book-cover-initial">${initial}</span>
                    <div class="book-cover-decoration">
                        <i class="fas fa-book-open"></i>
                    </div>
                </div>
                <div class="book-card-info">
                    <h3>${libro.titulo}</h3>
                    <div class="author">${libro.autor}</div>
                </div>
            </div>
            <div class="info">
                <i class="fas fa-tags"></i> ${getCategoriaNombre(libro.id_categoria)}
            </div>
            <div class="info">
                <i class="fas fa-copy"></i> ${libro.ejemplares_disponibles}/${libro.ejemplares_totales} disponibles
            </div>
            <div class="info">
                <i class="fas fa-calendar"></i> ${libro.anio_publicacion || 'Sin año'}
            </div>
            <div class="availability ${libro.ejemplares_disponibles > 0 ? 'available' : 'unavailable'}">
                <i class="fas fa-circle"></i>
                ${libro.ejemplares_disponibles > 0 ? 'Disponible' : 'No disponible'}
            </div>
            <div class="card-actions">
                <button class="btn btn-primary btn-small" onclick="verLibro(${libro.id})">
                    <i class="fas fa-eye"></i> Ver
                </button>
                ${libro.ejemplares_disponibles > 0 ? (
                    state.currentUser?.tipo_usuario === 'ADMINISTRADOR' ? `
                        <button class="btn btn-secondary btn-small" onclick="reservarLibro(${libro.id})">
                            <i class="fas fa-calendar-plus"></i> Reservar
                        </button>
                    ` : `
                        <button class="btn btn-success btn-small" onclick="abrirPrestarseModal(${libro.id})">
                            <i class="fas fa-exchange-alt"></i> Prestarse
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="reservarLibro(${libro.id})">
                            <i class="fas fa-calendar-plus"></i> Reservar
                        </button>
                    `
                ) : ''}
                ${state.currentUser?.tipo_usuario === 'ADMINISTRADOR' ? `
                    <button class="btn btn-warning btn-small" onclick="editarLibro(${libro.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-small" onclick="eliminarLibro(${libro.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                ` : ''}
            </div>
        `;
        elements.librosList.appendChild(card);
    });
}

// Préstamos
function loadPrestamos() {
    renderPrestamos();
}

function renderPrestamos() {
    elements.prestamosList.innerHTML = '';

    if (state.prestamos.length === 0) {
        elements.prestamosList.innerHTML = '<div class="empty-state"><i class="fas fa-exchange-alt icon"></i><h3>No hay préstamos</h3><p>No se han registrado préstamos</p></div>';
        return;
    }

    const isLector = state.currentUser?.tipo_usuario !== 'ADMINISTRADOR';
    const prestamosAMostrar = isLector
        ? state.prestamos.filter(p => p.id_usuario === state.currentUser.id)
        : state.prestamos;

    if (prestamosAMostrar.length === 0) {
        elements.prestamosList.innerHTML = '<div class="empty-state"><i class="fas fa-exchange-alt icon"></i><h3>No tienes préstamos</h3><p>No tienes préstamos registrados</p></div>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                ${!isLector ? '<th>Usuario</th>' : ''}
                <th>Libro</th>
                <th>Fecha Préstamo</th>
                <th>Fecha Vencimiento</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${prestamosAMostrar.map(p => `
                <tr>
                    ${!isLector ? `<td>${getUsuarioNombre(p.id_usuario)}</td>` : ''}
                    <td>${getLibroTitulo(p.id_libro)}</td>
                    <td>${formatDate(p.fecha_prestamo)}</td>
                    <td>${formatDate(p.fecha_vencimiento)}</td>
                    <td><span class="status-badge ${p.estado.toLowerCase()}">${p.estado}</span></td>
                    <td class="action-buttons">
                        ${p.estado === 'PRESTADO' && !isLector ? `
                            <button class="btn btn-success btn-small" onclick="registrarDevolucion(${p.id})">
                                <i class="fas fa-undo"></i> Devolver
                            </button>
                        ` : ''}
                        <button class="btn btn-secondary btn-small" onclick="verPrestamo(${p.id})">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    elements.prestamosList.appendChild(table);
}

function filterPrestamos() {
    const estado = elements.filterPrestamoEstado.value;
    const isLector = state.currentUser?.tipo_usuario !== 'ADMINISTRADOR';

    const prestamosFiltrados = isLector
        ? state.prestamos.filter(p => p.id_usuario === state.currentUser.id)
        : state.prestamos;

    const filtered = prestamosFiltrados.filter(p => {
        return !estado || p.estado === estado;
    });

    elements.prestamosList.innerHTML = '';

    if (filtered.length === 0) {
        elements.prestamosList.innerHTML = '<div class="empty-state"><i class="fas fa-exchange-alt icon"></i><h3>No hay préstamos</h3><p>No se encontraron préstamos con ese estado</p></div>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                ${!isLector ? '<th>Usuario</th>' : ''}
                <th>Libro</th>
                <th>Fecha Préstamo</th>
                <th>Fecha Vencimiento</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${filtered.map(p => `
                <tr>
                    ${!isLector ? `<td>${getUsuarioNombre(p.id_usuario)}</td>` : ''}
                    <td>${getLibroTitulo(p.id_libro)}</td>
                    <td>${formatDate(p.fecha_prestamo)}</td>
                    <td>${formatDate(p.fecha_vencimiento)}</td>
                    <td><span class="status-badge ${p.estado.toLowerCase()}">${p.estado}</span></td>
                    <td class="action-buttons">
                        ${p.estado === 'PRESTADO' && !isLector ? `
                            <button class="btn btn-success btn-small" onclick="registrarDevolucion(${p.id})">
                                <i class="fas fa-undo"></i> Devolver
                            </button>
                        ` : ''}
                        <button class="btn btn-secondary btn-small" onclick="verPrestamo(${p.id})">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    elements.prestamosList.appendChild(table);
}

// Devoluciones
function loadDevoluciones() {
    renderDevoluciones();
}

function renderDevoluciones() {
    elements.devolucionesList.innerHTML = '';

    const isLector = state.currentUser?.tipo_usuario !== 'ADMINISTRADOR';
    const devolucionesAMostrar = isLector
        ? state.devoluciones.filter(d => {
            const prestamo = state.prestamos.find(p => p.id === d.id_prestamo);
            return prestamo && prestamo.id_usuario === state.currentUser.id;
        })
        : state.devoluciones;

    if (devolucionesAMostrar.length === 0) {
        elements.devolucionesList.innerHTML = `<div class="empty-state"><i class="fas fa-undo icon"></i><h3>No hay devoluciones</h3><p>${isLector ? 'No tienes devoluciones registradas' : 'No se han registrado devoluciones'}</p></div>`;
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                ${!isLector ? '<th>Usuario</th>' : ''}
                <th>Préstamo</th>
                <th>Fecha Devolución</th>
                <th>Días de Retraso</th>
                <th>Multa Generada</th>
                <th>Estado de Multa</th>
            </tr>
        </thead>
        <tbody>
            ${devolucionesAMostrar.map(d => {
                const prestamo = state.prestamos.find(p => p.id === d.id_prestamo);
                const usuarioNombre = prestamo ? getUsuarioNombre(prestamo.id_usuario) : 'Desconocido';
                return `
                <tr>
                    ${!isLector ? `<td>${usuarioNombre}</td>` : ''}
                    <td>${d.id_prestamo}</td>
                    <td>${formatDate(d.fecha_devolucion)}</td>
                    <td>${d.dias_retraso}</td>
                    <td>Bs. ${d.multa_generada.toFixed(2)}</td>
                    <td><span class="status-badge ${d.estado_multa.toLowerCase()}">${d.estado_multa}</span></td>
                </tr>
                `;
            }).join('')}
        </tbody>
    `;

    elements.devolucionesList.appendChild(table);
}

// Reservas
function loadReservas() {
    renderReservas();
}

function renderReservas() {
    elements.reservasList.innerHTML = '';

    const isLector = state.currentUser?.tipo_usuario !== 'ADMINISTRADOR';
    const reservasAMostrar = isLector
        ? state.reservas.filter(r => r.id_usuario === state.currentUser.id)
        : state.reservas;

    if (reservasAMostrar.length === 0) {
        elements.reservasList.innerHTML = `<div class="empty-state"><i class="fas fa-calendar-check icon"></i><h3>No hay reservas</h3><p>${isLector ? 'No tienes reservas activas' : 'No hay reservas activas en el sistema'}</p></div>`;
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                ${!isLector ? '<th>Usuario</th>' : ''}
                <th>Libro</th>
                <th>Fecha Reserva</th>
                <th>Estado</th>
                <th>Posición en Lista</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${reservasAMostrar.map(r => `
                <tr>
                    ${!isLector ? `<td>${getUsuarioNombre(r.id_usuario)}</td>` : ''}
                    <td>${getLibroTitulo(r.id_libro)}</td>
                    <td>${formatDate(r.fecha_reserva)}</td>
                    <td><span class="status-badge ${r.estado.toLowerCase()}">${r.estado}</span></td>
                    <td>${r.posicion_lista}</td>
                    <td class="action-buttons">
                        <button class="btn btn-danger btn-small" onclick="cancelarReserva(${r.id})">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    elements.reservasList.appendChild(table);
}

// Usuarios
function loadUsuarios() {
    renderUsuarios();
}

function renderUsuarios() {
    elements.usuariosList.innerHTML = '';

    if (state.usuarios.length === 0) {
        elements.usuariosList.innerHTML = '<div class="empty-state"><i class="fas fa-users icon"></i><h3>No hay usuarios</h3><p>No se han registrado usuarios</p></div>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Carnet</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${state.usuarios.map(u => `
                <tr>
                    <td>${u.nombre} ${u.apellido}</td>
                    <td>${u.correo}</td>
                    <td>${u.carnet}</td>
                    <td><span class="badge badge-primary">${u.tipo_usuario}</span></td>
                    <td><span class="status-badge ${u.estado.toLowerCase()}">${u.estado}</span></td>
                    <td class="action-buttons">
                        <button class="btn btn-warning btn-small" onclick="editarUsuario(${u.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-danger btn-small" onclick="eliminarUsuario(${u.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    elements.usuariosList.appendChild(table);
}

// Categorías
function loadCategorias() {
    populateCategoriasSelect();
}

function populateCategoriasSelect() {
    const selects = [elements.searchCategoria, document.getElementById('bookCategoria')];

    selects.forEach(select => {
        if (select) {
            select.innerHTML = '<option value="">Todas las categorías</option>';
            state.categorias.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.nombre;
                select.appendChild(option);
            });
        }
    });
}

function getCategoriaNombre(id) {
    const cat = state.categorias.find(c => c.id === id);
    return cat ? cat.nombre : 'Sin categoría';
}

function getUsuarioNombre(id) {
    const u = state.usuarios.find(u => u.id === id);
    return u ? `${u.nombre} ${u.apellido}` : 'Usuario no encontrado';
}

function getLibroTitulo(id) {
    const l = state.libros.find(l => l.id === id);
    return l ? l.titulo : 'Libro no encontrado';
}

// Modales
function openBookModal(id = null) {
    document.getElementById('bookModalTitle').innerHTML = `
        <i class="fas fa-book"></i> ${id ? 'Editar Libro' : 'Nuevo Libro'}
    `;
    document.getElementById('bookId').value = id || '';

    if (id) {
        const libro = state.libros.find(l => l.id === id);
        if (libro) {
            document.getElementById('bookTitulo').value = libro.titulo;
            document.getElementById('bookAutor').value = libro.autor;
            document.getElementById('bookEditorial').value = libro.editorial || '';
            document.getElementById('bookISBN').value = libro.isbn;
            document.getElementById('bookCategoria').value = libro.id_categoria || '';
            document.getElementById('bookAnio').value = libro.anio_publicacion || '';
            document.getElementById('bookEjemplares').value = libro.ejemplares_totales;
            document.getElementById('bookDisponibles').value = libro.ejemplares_disponibles;
            document.getElementById('bookDescripcion').value = libro.descripcion || '';
        }
    } else {
        elements.bookForm.reset();
    }

    openModal('bookModal');
}

function openLoanModal() {
    loadLoanModalData();
    openModal('loanModal');
}

function openUserModal(id = null) {
    document.getElementById('userModalTitle').innerHTML = `
        <i class="fas fa-user-plus"></i> ${id ? 'Editar Usuario' : 'Nuevo Usuario'}
    `;
    document.getElementById('userId').value = id || '';

    if (id) {
        const usuario = state.usuarios.find(u => u.id === id);
        if (usuario) {
            document.getElementById('userNombre').value = usuario.nombre;
            document.getElementById('userApellido').value = usuario.apellido;
            document.getElementById('userCarnet').value = usuario.carnet;
            document.getElementById('userCorreo').value = usuario.correo;
            document.getElementById('userTipo').value = usuario.tipo_usuario;
            document.getElementById('userEstado').value = usuario.estado;
        }
    } else {
        elements.userForm.reset();
    }

    openModal('userModal');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Funciones de acción (globales para onclick)
window.verLibro = function (id) {
    const libro = state.libros.find(l => l.id === id);
    if (libro) {
        const content = `
            <div class="detail-row">
                <span class="detail-label">Título</span>
                <span class="detail-value">${libro.titulo}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Autor</span>
                <span class="detail-value">${libro.autor}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Editorial</span>
                <span class="detail-value">${libro.editorial || 'No especificada'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">ISBN</span>
                <span class="detail-value">${libro.isbn}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Categoría</span>
                <span class="detail-value">${getCategoriaNombre(libro.id_categoria)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Año Publicación</span>
                <span class="detail-value">${libro.anio_publicacion || 'No especificado'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Ejemplares Totales</span>
                <span class="detail-value">${libro.ejemplares_totales}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Ejemplares Disponibles</span>
                <span class="detail-value">${libro.ejemplares_disponibles}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Disponibilidad</span>
                <span class="detail-value">
                    <span class="badge ${libro.ejemplares_disponibles > 0 ? 'badge-success' : 'badge-danger'}">
                        ${libro.ejemplares_disponibles > 0 ? 'Disponible' : 'No disponible'}
                    </span>
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Descripción</span>
                <span class="detail-value">${libro.descripcion || 'No especificada'}</span>
            </div>
        `;

        document.getElementById('bookDetailContent').innerHTML = content;
        openModal('bookDetailModal');
    }
};

window.reservarLibro = function (id_libro) {
    const libro = state.libros.find(l => l.id === id_libro);
    if (!libro) {
        showToast('Libro no encontrado', 'error');
        return;
    }

    if (libro.ejemplares_disponibles <= 0) {
        showToast('No hay ejemplares disponibles para reservar', 'error');
        return;
    }

    // Verificar si ya tiene una reserva activa para este libro
    const reservaExistente = state.reservas.find(r => r.id_usuario === state.currentUser.id && r.id_libro === id_libro && r.estado === 'ACTIVA');

    if (reservaExistente) {
        showToast('Ya tienes una reserva activa para este libro', 'warning');
        return;
    }

    // Calcular posición en lista de espera
    const reservasActivas = state.reservas.filter(r => r.id_libro === id_libro && r.estado === 'ACTIVA').length;
    const posicionLista = reservasActivas + 1;

    const nuevaReserva = {
        id: Date.now(),
        id_usuario: state.currentUser.id,
        id_libro: id_libro,
        fecha_reserva: new Date().toISOString(),
        estado: 'ACTIVA',
        posicion_lista: posicionLista
    };

    state.reservas.push(nuevaReserva);
    saveData();

    showToast('Libro reservado exitosamente', 'success');
    loadReservas();
    loadLibros();
};

window.editarLibro = function (id) {
    openBookModal(id);
};

window.eliminarLibro = function (id) {
    if (!confirm('¿Está seguro de eliminar este libro?')) return;

    const index = state.libros.findIndex(l => l.id === id);
    if (index > -1) {
        state.libros.splice(index, 1);
        saveData();
        showToast('Libro eliminado exitosamente', 'success');
        loadLibros();
        loadDashboard();
    } else {
        showToast('Libro no encontrado', 'error');
    }
};

window.registrarDevolucion = function (id_prestamo) {
    if (!confirm('¿Está seguro de registrar esta devolución?')) return;

    const prestamo = state.prestamos.find(p => p.id === id_prestamo);
    if (!prestamo) {
        showToast('Préstamo no encontrado', 'error');
        return;
    }

    if (prestamo.estado !== 'PRESTADO') {
        showToast('El préstamo ya fue devuelto o no está activo', 'error');
        return;
    }

    // Calcular días de retraso
    const fechaHoy = new Date();
    const fechaVencimiento = new Date(prestamo.fecha_vencimiento);
    const diasRetraso = Math.max(0, Math.ceil((fechaHoy - fechaVencimiento) / (1000 * 60 * 60 * 24)));

    // Calcular multa (1.00 por día de retraso)
    const multaGenerada = diasRetraso * 1.00;

    // Actualizar préstamo
    prestamo.estado = 'DEVUELTO';
    prestamo.fecha_devolucion = fechaHoy.toISOString();

    // Actualizar disponibilidad del libro
    const libro = state.libros.find(l => l.id === prestamo.id_libro);
    if (libro) {
        libro.ejemplares_disponibles += 1;
    }

    // Crear registro de devolución
    const nuevaDevolucion = {
        id: Date.now(),
        id_prestamo: id_prestamo,
        fecha_devolucion: fechaHoy.toISOString(),
        dias_retraso: diasRetraso,
        multa_generada: multaGenerada,
        estado_multa: multaGenerada > 0 ? 'PENDIENTE' : 'PAGADA'
    };

    state.devoluciones.push(nuevaDevolucion);
    saveData();

    showToast('Devolución registrada exitosamente', 'success');
    loadPrestamos();
    loadDevoluciones();
    loadDashboard();
};

window.verPrestamo = function (id) {
    const prestamo = state.prestamos.find(p => p.id === id);
    if (prestamo) {
        const content = `
            <div class="detail-row">
                <span class="detail-label">Usuario</span>
                <span class="detail-value">${getUsuarioNombre(prestamo.id_usuario)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Libro</span>
                <span class="detail-value">${getLibroTitulo(prestamo.id_libro)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Fecha Préstamo</span>
                <span class="detail-value">${formatDate(prestamo.fecha_prestamo)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Fecha Vencimiento</span>
                <span class="detail-value">${formatDate(prestamo.fecha_vencimiento)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Estado</span>
                <span class="detail-value">
                    <span class="badge ${prestamo.estado === 'PRESTADO' ? 'badge-primary' : 'badge-success'}">
                        ${prestamo.estado}
                    </span>
                </span>
            </div>
            ${prestamo.fecha_devolucion ? `
            <div class="detail-row">
                <span class="detail-label">Fecha Devolución</span>
                <span class="detail-value">${formatDate(prestamo.fecha_devolucion)}</span>
            </div>
            ` : ''}
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                <h4>Requisitos / Documentos en Prenda:</h4>
                <div class="detail-row" style="margin-top: 0.5rem;">
                    <span class="detail-label">CI Prenda</span>
                    <span class="detail-value">${prestamo.ci_prenda || 'No registrado'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">RU Prenda</span>
                    <span class="detail-value">${prestamo.ru_prenda || 'No registrado'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Celular</span>
                    <span class="detail-value">${prestamo.celular || 'No registrado'}</span>
                </div>
            </div>
        `;
        document.getElementById('loanDetailContent').innerHTML = content;
        openModal('loanDetailModal');
    } else {
        showToast('Préstamo no encontrado', 'error');
    }
};

window.abrirPrestarseModal = function (libroId) {
    const libro = state.libros.find(l => l.id === libroId);
    if (!libro) {
        showToast('Libro no encontrado', 'error');
        return;
    }
    document.getElementById('prestarseLibroId').value = libro.id;
    document.getElementById('prestarseLibroTitulo').value = libro.titulo;
    document.getElementById('prestarseCI').value = state.currentUser?.carnet || '';
    document.getElementById('prestarseRU').value = '';
    document.getElementById('prestarseCelular').value = '';
    openModal('prestarseModal');
};

window.cancelarReserva = function (id) {
    if (!confirm('¿Está seguro de cancelar esta reserva?')) return;

    const index = state.reservas.findIndex(r => r.id === id);
    if (index > -1) {
        state.reservas[index].estado = 'CANCELADA';
        saveData();
        showToast('Reserva cancelada exitosamente', 'success');
        loadReservas();
        loadLibros();
    } else {
        showToast('Reserva no encontrada', 'error');
    }
};

window.editarUsuario = function (id) {
    openUserModal(id);
};

window.eliminarUsuario = function (id) {
    if (!confirm('¿Está seguro de eliminar este usuario?')) return;

    const index = state.usuarios.findIndex(u => u.id === id);
    if (index > -1) {
        state.usuarios.splice(index, 1);
        saveData();
        showToast('Usuario eliminado exitosamente', 'success');
        loadUsuarios();
        loadDashboard();
    } else {
        showToast('Usuario no encontrado', 'error');
    }
};

// Formularios de modales
elements.bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('bookId').value;
    const data = {
        titulo: document.getElementById('bookTitulo').value,
        autor: document.getElementById('bookAutor').value,
        editorial: document.getElementById('bookEditorial').value,
        isbn: document.getElementById('bookISBN').value,
        id_categoria: parseInt(document.getElementById('bookCategoria').value) || null,
        anio_publicacion: parseInt(document.getElementById('bookAnio').value) || null,
        ejemplares_totales: parseInt(document.getElementById('bookEjemplares').value),
        ejemplares_disponibles: parseInt(document.getElementById('bookDisponibles').value),
        descripcion: document.getElementById('bookDescripcion').value
    };

    if (id) {
        // Editar
        const index = state.libros.findIndex(l => l.id === parseInt(id));
        if (index > -1) {
            state.libros[index] = { ...state.libros[index], ...data };
            showToast('Libro actualizado exitosamente', 'success');
        }
    } else {
        // Crear
        const nuevoLibro = {
            id: Date.now(),
            ...data,
            estado: 'ACTIVO'
        };
        state.libros.push(nuevoLibro);
        showToast('Libro creado exitosamente', 'success');
    }

    saveData();
    closeModal('bookModal');
    loadLibros();
    loadDashboard();
});

elements.loanForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        id_usuario: parseInt(document.getElementById('loanUsuario').value),
        id_libro: parseInt(document.getElementById('loanLibro').value),
        dias_prestamo: parseInt(document.getElementById('loanDias').value),
        ci_prenda: document.getElementById('loanCI').value,
        ru_prenda: document.getElementById('loanRU').value,
        celular: document.getElementById('loanCelular').value
    };

    const usuario = state.usuarios.find(u => u.id === data.id_usuario);
    const libro = state.libros.find(l => l.id === data.id_libro);

    if (!usuario || !libro) {
        showToast('Usuario o libro no encontrado', 'error');
        return;
    }

    if (libro.ejemplares_disponibles <= 0) {
        showToast('No hay ejemplares disponibles para préstamo', 'error');
        return;
    }

    // Calcular fecha de vencimiento
    const fechaPrestamo = new Date();
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaPrestamo.getDate() + data.dias_prestamo);

    const nuevoPrestamo = {
        id: Date.now(),
        id_usuario: data.id_usuario,
        id_libro: data.id_libro,
        fecha_prestamo: fechaPrestamo.toISOString(),
        fecha_vencimiento: fechaVencimiento.toISOString(),
        fecha_devolucion: null,
        estado: 'PRESTADO',
        creado_por: state.currentUser.id,
        ci_prenda: data.ci_prenda,
        ru_prenda: data.ru_prenda,
        celular: data.celular
    };

    state.prestamos.push(nuevoPrestamo);
    // Descontar ejemplar disponible
    libro.ejemplares_disponibles -= 1;
    saveData();

    showToast('Préstamo registrado exitosamente', 'success');
    closeModal('loanModal');
    loadPrestamos();
    loadDashboard();
    loadLibros();
});

elements.userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('userId').value;
    const data = {
        nombre: document.getElementById('userNombre').value,
        apellido: document.getElementById('userApellido').value,
        carnet: document.getElementById('userCarnet').value,
        correo: document.getElementById('userCorreo').value,
        tipo_usuario: document.getElementById('userTipo').value,
        estado: document.getElementById('userEstado').value
    };

    if (id) {
        // Editar
        const index = state.usuarios.findIndex(u => u.id === parseInt(id));
        if (index > -1) {
            state.usuarios[index] = { ...state.usuarios[index], ...data };
            showToast('Usuario actualizado exitosamente', 'success');
        }
    } else {
        // Crear
        const nuevoUsuario = {
            id: Date.now(),
            ...data
        };
        state.usuarios.push(nuevoUsuario);
        showToast('Usuario creado exitosamente', 'success');
    }

    saveData();
    closeModal('userModal');
    loadUsuarios();
    loadDashboard();
});

// Funciones auxiliares
function loadLoanModalData() {
    // Cargar usuarios
    const usuarioSelect = document.getElementById('loanUsuario');
    usuarioSelect.innerHTML = '<option value="">Seleccione...</option>';
    state.usuarios.forEach(u => {
        const option = document.createElement('option');
        option.value = u.id;
        option.textContent = `${u.nombre} ${u.apellido} (${u.carnet})`;
        usuarioSelect.appendChild(option);
    });

    // Cargar libros disponibles
    const libroSelect = document.getElementById('loanLibro');
    libroSelect.innerHTML = '<option value="">Seleccione...</option>';
    state.libros.filter(l => l.ejemplares_disponibles > 0).forEach(l => {
        const option = document.createElement('option');
        option.value = l.id;
        option.textContent = `${l.titulo} por ${l.autor}`;
        libroSelect.appendChild(option);
    });
}

function formatDate(dateString) {
    if (!dateString) return 'No especificado';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function showToast(message, type = 'info') {
    elements.toast.textContent = message;
    elements.toast.className = `toast show ${type}`;

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ==================== MODO OSCURO/CLARO ====================
// Agregar estado modoOscuro al state
if (typeof state.modoOscuro === 'undefined') state.modoOscuro = true;

function toggleModo() {
    state.modoOscuro = !state.modoOscuro;
    localStorage.setItem('modo_oscuro', state.modoOscuro);
    aplicarModo();
}
function aplicarModo() {
    const btn = document.getElementById('themeToggle');
    if (state.modoOscuro) {
        document.documentElement.style.setProperty('--bg-primary', '#0f0f0f');
        document.documentElement.style.setProperty('--bg-secondary', '#1a1a1a');
        document.documentElement.style.setProperty('--bg-card', '#1e1e1e');
        document.documentElement.style.setProperty('--text-primary', '#f5f5f5');
        document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
        document.documentElement.style.setProperty('--border-color', '#333');
        if (btn) { btn.innerHTML = '<i class="fas fa-sun"></i>'; btn.title = 'Modo claro'; }
    } else {
        document.documentElement.style.setProperty('--bg-primary', '#f0f2f5');
        document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
        document.documentElement.style.setProperty('--bg-card', '#ffffff');
        document.documentElement.style.setProperty('--text-primary', '#1a1a2e');
        document.documentElement.style.setProperty('--text-secondary', '#666');
        document.documentElement.style.setProperty('--border-color', '#d0d0d0');
        if (btn) { btn.innerHTML = '<i class="fas fa-moon"></i>'; btn.title = 'Modo oscuro'; }
    }
}
// Cargar modo guardado al inicio
const modoGuardado = localStorage.getItem('modo_oscuro');
if (modoGuardado !== null) state.modoOscuro = modoGuardado === 'true';
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(aplicarModo, 100);
});
window.toggleModo = toggleModo;

// ==================== MIS LIBROS ====================
function loadMisLibros() {
    if (!state.currentUser) { showToast('Debes iniciar sesión', 'warning'); return; }
    const userId = state.currentUser.id;
    const leidos = state.prestamos.filter(p => p.id_usuario === userId && p.estado === 'DEVUELTO')
        .map(p => state.libros.find(l => l.id === p.id_libro)).filter(Boolean);
    const favIds = state.favoritos.filter(f => f.id_usuario === userId).map(f => f.id_libro);
    const favs = state.libros.filter(l => favIds.includes(l.id));

    const el = elements.misLibrosEmpty;
    if (el) el.style.display = (leidos.length > 0 || favs.length > 0) ? 'none' : 'block';

    const secLeidos = elements.misLibrosLeidos;
    if (secLeidos) {
        secLeidos.innerHTML = '';
        if (leidos.length === 0) secLeidos.innerHTML = '<p style="color: var(--text-secondary);">Aún no has leído ningún libro</p>';
        else leidos.forEach(l => {
            if (!l) return;
            secLeidos.appendChild(crearCardMini(l, 'Leído', 'devuelto'));
        });
    }
    const secFavs = elements.misFavoritosList;
    if (secFavs) {
        secFavs.innerHTML = '';
        if (favs.length === 0) secFavs.innerHTML = '<p style="color: var(--text-secondary);">No tienes favoritos aún</p>';
        else favs.forEach(l => {
            if (!l) return;
            const card = crearCardMini(l, '<i class="fas fa-heart"></i> Favorito', 'prestado');
            card.querySelector('.card-actions')?.remove();
            const div = document.createElement('div');
            div.style.cssText = 'display:flex;gap:0.5rem;align-items:center';
            div.innerHTML = `<span class="badge-small prestado" style="background:var(--danger-bg);color:var(--danger-color)"><i class="fas fa-heart"></i> Favorito</span>
                <button class="btn btn-danger btn-small" onclick="quitarFavorito(${l.id})"><i class="fas fa-times"></i></button>`;
            card.appendChild(div);
            secFavs.appendChild(card);
        });
    }
}
function crearCardMini(libro, label, labelClass) {
    const card = document.createElement('div'); card.className = 'book-card-mini';
    card.innerHTML = `<h4>${libro.titulo}</h4><div class="author">${libro.autor}</div>
        <div class="info"><i class="fas fa-tags"></i> ${getCategoriaNombre(libro.id_categoria)}</div>`;
    if (label) { const sp = document.createElement('span'); sp.className = `badge-small ${labelClass}`; sp.innerHTML = label; card.appendChild(sp); }
    return card;
}
function quitarFavorito(idLibro) {
    if (!state.currentUser) return;
    const idx = state.favoritos.findIndex(f => f.id_usuario === state.currentUser.id && f.id_libro === idLibro);
    if (idx > -1) { state.favoritos.splice(idx, 1); saveData(); showToast('Favorito removido', 'info'); loadMisLibros(); }
}
window.quitarFavorito = quitarFavorito;

// ==================== REPORTES ====================
function loadReportes() {
    if (elements.reportTotalLibros) elements.reportTotalLibros.textContent = state.libros.length;
    if (elements.reportTotalUsuarios) elements.reportTotalUsuarios.textContent = state.usuarios.filter(u => u.estado === 'ACTIVO').length;
    if (elements.reportTotalPrestamos) elements.reportTotalPrestamos.textContent = state.prestamos.length;
    if (elements.reportTotalDevoluciones) elements.reportTotalDevoluciones.textContent = state.devoluciones.length;
    if (elements.reportTotalReservas) elements.reportTotalReservas.textContent = state.reservas.length;
    const totalMultas = state.devoluciones.filter(d => d.estado_multa === 'PENDIENTE').reduce((s, d) => s + (d.multa_generada || 0), 0);
    if (elements.reportTotalMultas) elements.reportTotalMultas.textContent = `Bs. ${totalMultas.toFixed(2)}`;

    const acts = [];
    state.prestamos.forEach(p => { const l = state.libros.find(b => b.id === p.id_libro); acts.push({ t: 'Préstamo', d: getUsuarioNombre(p.id_usuario) + ' - ' + (l ? l.titulo : 'N/A'), f: p.fecha_prestamo, e: p.estado }); });
    state.devoluciones.forEach(d => { const pr = state.prestamos.find(x => x.id === d.id_prestamo); if (pr) { const l = state.libros.find(b => b.id === pr.id_libro); acts.push({ t: 'Devolución', d: getUsuarioNombre(pr.id_usuario) + ' - ' + (l ? l.titulo : 'N/A'), f: d.fecha_devolucion, e: d.estado_multa === 'PENDIENTE' ? 'Con multa' : 'OK' }); } });
    state.reservas.forEach(r => { const l = state.libros.find(b => b.id === r.id_libro); acts.push({ t: 'Reserva', d: getUsuarioNombre(r.id_usuario) + ' - ' + (l ? l.titulo : 'N/A'), f: r.fecha_reserva, e: r.estado }); });
    acts.sort((a, b) => new Date(b.f) - new Date(a.f));

    if (!elements.reportesList) return;
    elements.reportesList.innerHTML = '';
    if (acts.length === 0) { if (elements.reportesEmpty) elements.reportesEmpty.style.display = 'block'; return; }
    if (elements.reportesEmpty) elements.reportesEmpty.style.display = 'none';
    const tbl = document.createElement('table');
    tbl.innerHTML = `<thead><tr><th>Tipo</th><th>Detalle</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>
        ${acts.slice(0, 100).map(a => `<tr><td><span class="badge badge-primary">${a.t}</span></td><td>${a.d}</td><td>${formatDate(a.f)}</td><td><span class="status-badge ${a.e.toLowerCase().replace(/ /g, '')}">${a.e}</span></td></tr>`).join('')}</tbody>`;
    elements.reportesList.appendChild(tbl);
}
window.descargarReportePDF = function () {
    let c = `<div style="font-family:Arial;padding:20px"><h1 style="color:#4f46e5;text-align:center">Reporte - Biblioteca</h1>
        <p style="text-align:center;color:#666">${new Date().toLocaleDateString('es-ES')}</p><hr>
        <h2>Resumen</h2><ul><li>Libros: ${state.libros.length}</li><li>Usuarios: ${state.usuarios.filter(u => u.estado === 'ACTIVO').length}</li>
        <li>Préstamos: ${state.prestamos.length} (Activos: ${state.prestamos.filter(p => p.estado === 'PRESTADO').length})</li>
        <li>Devoluciones: ${state.devoluciones.length}</li><li>Reservas: ${state.reservas.length}</li>
        <li>Multas: Bs. ${state.devoluciones.filter(d => d.estado_multa === 'PENDIENTE').reduce((s, d) => s + (d.multa_generada || 0), 0).toFixed(2)}</li></ul></div>`;
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>Reporte Biblioteca</title><style>body{font-family:Arial;padding:40px}h1{color:#4f46e5;text-align:center}ul{line-height:1.8}</style></head><body>${c}<script>window.onload=function(){setTimeout(function(){window.print()},500)}<\/script></body></html>`);
    w.document.close();
    showToast('Reporte PDF generado', 'success');
};
window.descargarReporteExcel = function () {
    let csv = '\uFEFF'; csv += 'REPORTE BIBLIOTECA\nGenerado: ' + new Date().toLocaleDateString('es-ES') + '\n\n';
    csv += 'RESUMEN\n'; csv += `Total Libros,${state.libros.length}\nUsuarios Activos,${state.usuarios.filter(u => u.estado === 'ACTIVO').length}\n`;
    csv += `Total Prestamos,${state.prestamos.length}\nPrestamos Activos,${state.prestamos.filter(p => p.estado === 'PRESTADO').length}\n`;
    csv += `Total Devoluciones,${state.devoluciones.length}\nTotal Reservas,${state.reservas.length}\n`;
    csv += `Multas Pendientes (Bs.),${state.devoluciones.filter(d => d.estado_multa === 'PENDIENTE').reduce((s, d) => s + (d.multa_generada || 0), 0).toFixed(2)}\n\nACTIVIDAD\nTipo,Detalle,Fecha,Estado\n`;
    const acts = [];
    state.prestamos.forEach(p => { const l = state.libros.find(b => b.id === p.id_libro); acts.push({ t: 'Préstamo', d: getUsuarioNombre(p.id_usuario) + ' - ' + (l ? l.titulo : 'N/A'), f: p.fecha_prestamo, e: p.estado }); });
    state.devoluciones.forEach(d => { const pr = state.prestamos.find(x => x.id === d.id_prestamo); if (pr) { const l = state.libros.find(b => b.id === pr.id_libro); acts.push({ t: 'Devolución', d: getUsuarioNombre(pr.id_usuario) + ' - ' + (l ? l.titulo : 'N/A'), f: d.fecha_devolucion, e: d.estado_multa }); } });
    state.reservas.forEach(r => { const l = state.libros.find(b => b.id === r.id_libro); acts.push({ t: 'Reserva', d: getUsuarioNombre(r.id_usuario) + ' - ' + (l ? l.titulo : 'N/A'), f: r.fecha_reserva, e: r.estado }); });
    acts.sort((a, b) => new Date(b.f) - new Date(a.f));
    acts.slice(0, 100).forEach(a => { csv += `${a.t},"${a.d}",${formatDate(a.f)},${a.e}\n`; });

    // Download as .csv file (opens as Excel)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_biblioteca_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Reporte Excel descargado', 'success');
};

// ==================== INICIALIZAR EVENTOS DE NUEVAS SECCIONES ====================
document.addEventListener('DOMContentLoaded', function () {
    if (elements.refreshReports) elements.refreshReports.addEventListener('click', loadReportes);
    if (elements.downloadPdfBtn) elements.downloadPdfBtn.addEventListener('click', window.descargarReportePDF);
    if (elements.downloadExcelBtn) elements.downloadExcelBtn.addEventListener('click', window.descargarReporteExcel);
    if (elements.refreshMisLibros) elements.refreshMisLibros.addEventListener('click', loadMisLibros);
});
