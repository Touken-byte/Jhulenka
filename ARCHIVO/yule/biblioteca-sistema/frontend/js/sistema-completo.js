/**
 * Sistema Inteligente de Gestión de Biblioteca - Versión Completa
 * Frontend JavaScript con localStorage
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
    reservas: []
};

// Elementos del DOM
let elements = {};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    initEventListeners();
    loadData();
    checkAuth();
});

// Inicializar elementos del DOM
function initElements() {
    elements = {
        // Secciones
        loginSection: document.getElementById('loginSection'),
        registerSection: document.getElementById('registerSection'),
        inicioSection: document.getElementById('inicioSection'),
        librosSection: document.getElementById('librosSection'),
        prestamosSection: document.getElementById('prestamosSection'),
        devolucionesSection: document.getElementById('devolucionesSection'),
        reservasSection: document.getElementById('reservasSection'),
        usuariosSection: document.getElementById('usuariosSection'),

        // Header
        mainNav: document.getElementById('mainNav'),
        userInfo: document.getElementById('userInfo'),
        userName: document.getElementById('userName'),
        userRole: document.getElementById('userRole'),
        logoutBtn: document.getElementById('logoutBtn'),

        // Formularios
        loginForm: document.getElementById('loginForm'),
        registerForm: document.getElementById('registerForm'),
        bookForm: document.getElementById('bookForm'),
        loanForm: document.getElementById('loanForm'),
        userForm: document.getElementById('userForm'),

        // Dashboard
        totalLibros: document.getElementById('totalLibros'),
        totalUsuarios: document.getElementById('totalUsuarios'),
        prestamosActivos: document.getElementById('prestamosActivos'),
        reservasActivas: document.getElementById('reservasActivas'),
        librosMasPrestados: document.getElementById('librosMasPrestados'),
        adminSection: document.getElementById('adminSection'),

        // Libros
        librosList: document.getElementById('librosList'),
        booksEmptyState: document.getElementById('booksEmptyState'),
        searchTitulo: document.getElementById('searchTitulo'),
        searchAutor: document.getElementById('searchAutor'),
        searchCategoria: document.getElementById('searchCategoria'),
        searchDisponible: document.getElementById('searchDisponible'),
        addBookBtn: document.getElementById('addBookBtn'),
        refreshBooks: document.getElementById('refreshBooks'),

        // Préstamos
        prestamosList: document.getElementById('prestamosList'),
        filterPrestamoEstado: document.getElementById('filterPrestamoEstado'),
        addLoanBtn: document.getElementById('addLoanBtn'),
        refreshLoans: document.getElementById('refreshLoans'),

        // Devoluciones
        devolucionesList: document.getElementById('devolucionesList'),
        refreshReturns: document.getElementById('refreshReturns'),

        // Reservas
        reservasList: document.getElementById('reservasList'),
        refreshReservations: document.getElementById('refreshReservations'),

        // Usuarios
        usuariosList: document.getElementById('usuariosList'),
        addUserBtn: document.getElementById('addUserBtn'),
        refreshUsers: document.getElementById('refreshUsers'),

        // Modales
        bookModal: document.getElementById('bookModal'),
        loanModal: document.getElementById('loanModal'),
        userModal: document.getElementById('userModal'),
        bookDetailModal: document.getElementById('bookDetailModal'),

        // Toast
        toast: document.getElementById('toast')
    };
}

// Almacenamiento local
function saveData() {
    const data = {
        libros: state.libros,
        categorias: state.categorias,
        usuarios: state.usuarios,
        prestamos: state.prestamos,
        devoluciones: state.devoluciones,
        reservas: state.reservas
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
    } else {
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
        { id: 6, nombre: 'Matemáticas', descripcion: 'Textos de matemáticas y lógica' },
        { id: 7, nombre: 'Física', descripcion: 'Libros de física y ciencias' },
        { id: 8, nombre: 'Química', descripcion: 'Libros de química y laboratorio' },
        { id: 9, nombre: 'Biología', descripcion: 'Libros de biología y ciencias naturales' },
        { id: 10, nombre: 'Literatura', descripcion: 'Literatura clásica y contemporánea' },
        { id: 11, nombre: 'Filosofía', descripcion: 'Textos filosóficos y ensayos' },
        { id: 12, nombre: 'Psicología', descripcion: 'Libros de psicología y desarrollo personal' },
        { id: 13, nombre: 'Economía', descripcion: 'Libros de economía y negocios' },
        { id: 14, nombre: 'Derecho', descripcion: 'Textos jurídicos y legales' },
        { id: 15, nombre: 'Medicina', descripcion: 'Libros de medicina y salud' }
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

    // Generar 150 libros (10 por categoría)
    state.libros = generarLibros();
    saveData();
}

function generarLibros() {
    const libros = [];
    let id = 1;
    const datosPorCategoria = {
        1: {
            autores: ['Gabriel García Márquez', 'Mario Vargas Llosa', 'Julio Cortázar', 'Jorge Luis Borges', 'Pablo Neruda', 'Isabel Allende', 'Carlos Fuentes', 'Octavio Paz', 'Mario Benedetti', 'Laura Esquivel'],
            titulos: ['Cien años de soledad', 'La ciudad y los perros', 'Rayuela', 'Ficciones', 'Veinte poemas', 'La casa de los espíritus', 'La muerte de Artemio Cruz', 'El laberinto de la soledad', 'La tregua', 'Como agua para chocolate']
        },
        2: {
            autores: ['Isaac Asimov', 'Philip K. Dick', 'Arthur C. Clarke', 'Ray Bradbury', 'Frank Herbert', 'Ursula K. Le Guin', 'William Gibson', 'Neal Stephenson', 'Orson Scott Card', 'Liu Cixin'],
            titulos: ['Fundación', '¿Sueñan los androides?', '2001: Odisea del espacio', 'Fahrenheit 451', 'Dune', 'La mano izquierda', 'Neuromante', 'Criptonomicón', 'El juego de Ender', 'El problema de los tres cuerpos']
        },
        3: {
            autores: ['Robert C. Martin', 'Eric Freeman', 'Anders Hejlsberg', 'Joshua Bloch', 'Martin Fowler', 'Kent Beck', 'Andrew Hunt', 'Steve McConnell', 'Brian Kernighan', 'Bjarne Stroustrup'],
            titulos: ['Clean Code', 'Head First Design Patterns', 'C# in Depth', 'Effective Java', 'Refactoring', 'Extreme Programming', 'The Pragmatic Programmer', 'Code Complete', 'The C Programming Language', 'The C++ Programming Language']
        },
        4: {
            autores: ['John Dewey', 'Jean Piaget', 'Lev Vygotsky', 'Paulo Freire', 'Howard Gardner', 'Maria Montessori', 'Benjamin Bloom', 'Jerome Bruner', 'Carl Rogers', 'Erik Erikson'],
            titulos: ['Democracia y educación', 'La psicología del niño', 'Pensamiento y lenguaje', 'Pedagogía del oprimido', 'Inteligencias múltiples', 'El método Montessori', 'Taxonomía de objetivos', 'Proceso educativo', 'Libertad y aprendizaje', 'Infancia y sociedad']
        },
        5: {
            autores: ['Yuval Noah Harari', 'Jared Diamond', 'Walter Isaacson', 'David McCullough', 'Doris Kearns Goodwin', 'Stephen Ambrose', 'Barbara Tuchman', 'E.H. Gombrich', 'H.W.F. Saggs', 'Fernand Braudel'],
            titulos: ['Sapiens', 'Armas, gérmenes y acero', 'Steve Jobs', '1776', 'Team of Rivals', 'Band of Brothers', 'The Guns of August', 'A Little History of the World', 'Civilization of Babylonia', 'The Mediterranean']
        },
        6: {
            autores: ['Richard Johnsonbaugh', 'Kenneth Rosen', 'Herbert Wilf', 'George Pólya', 'Ian Stewart', 'Martin Gardner', 'John Horton Conway', 'Donald Knuth', 'Gilbert Strang', 'James Stewart'],
            titulos: ['Discrete Mathematics', 'Discrete Mathematics and Its Applications', 'generatingfunctionology', 'How to Solve It', 'Concepts of Modern Mathematics', 'Mathematical Circus', 'Winning Ways', 'Concrete Mathematics', 'Linear Algebra', 'Calculus']
        },
        7: {
            autores: ['Stephen Hawking', 'Carl Sagan', 'Richard Feynman', 'Neil deGrasse Tyson', 'Brian Greene', 'Michio Kaku', 'Bill Bryson', 'Sam Kean', 'Mary Roach', 'Oliver Sacks'],
            titulos: ['A Brief History of Time', 'Cosmos', 'The Feynman Lectures', 'Astrophysics for People', 'The Elegant Universe', 'Physics of the Impossible', 'A Short History of Nearly Everything', 'The Disappearing Spoon', 'Packing for Mars', 'The Man Who Mistook His Wife']
        },
        8: {
            autores: ['John McMurry', 'Shriver Atkins', 'Skoog West', 'Peter Atkins', 'Linus Pauling', 'Lehninger', 'Owen Fennema', 'Stanley Manahan', 'Badger Banchero', 'Larry McCauley'],
            titulos: ['Química Orgánica', 'Química Inorgánica', 'Química Analítica', 'Química Física', 'Química General', 'Bioquímica', 'Química de los Alimentos', 'Química Ambiental', 'Química Industrial', 'Química de Materiales']
        },
        9: {
            autores: ['Bruce Alberts', 'Benjamin Pierce', 'Derek Briggs', 'Prescott Harley Klein', 'Eugene Odum', 'Scott Gilbert', 'Donald Voet', 'Abbas Lichtman', 'Raven Evert Eichhorn', 'Stephen Miller'],
            titulos: ['Biología Molecular de la Célula', 'Genética: Un Enfoque Conceptual', 'Biología Evolutiva', 'Microbiología', 'Ecología', 'Biología del Desarrollo', 'Bioquímica', 'Inmunología', 'Botánica', 'Zoología']
        },
        10: {
            autores: ['Lord Byron', 'Fiódor Dostoyevski', 'Gustave Flaubert', 'James Joyce', 'Homero', 'Dante Alighieri', 'Johann Wolfgang von Goethe', 'Victor Hugo', 'León Tolstói', 'Michel de Montaigne'],
            titulos: ['Don Juan', 'Crimen y Castigo', 'Madame Bovary', 'Ulises', 'La Odisea', 'La Divina Comedia', 'Fausto', 'Los Miserables', 'Guerra y Paz', 'Ensayos']
        },
        11: {
            autores: ['Immanuel Kant', 'Nicolás Maquiavelo', 'René Descartes', 'Jean-Paul Sartre', 'Platón', 'Aristóteles', 'Jostein Gaarder', 'Friedrich Nietzsche', 'Karl Marx', 'Ludwig Wittgenstein'],
            titulos: ['Crítica de la Razón Pura', 'El Príncipe', 'Meditaciones Metafísicas', 'El Ser y la Nada', 'La República', 'Ética a Nicómaco', 'El Mundo de Sofía', 'Así Habló Zaratustra', 'El Capital', 'Tractatus Logico-Philosophicus']
        },
        12: {
            autores: ['Robert Feldman', 'James Kalat', 'David Myers', 'John Santrock', 'Timothy Trull', 'Anita Woolfolk', 'Daniel Goleman', 'Sigmund Freud', 'Martin Seligman', 'Michael Gazzaniga'],
            titulos: ['Psicología General', 'Introducción a la Psicología', 'Psicología Social', 'Psicología del Desarrollo', 'Psicología Clínica', 'Psicología Educativa', 'Inteligencia Emocional', 'Psicoanálisis', 'Psicología Positiva', 'Neurociencia Cognitiva']
        },
        13: {
            autores: ['Paul Samuelson', 'Robert Pindyck', 'N. Gregory Mankiw', 'Dixit Nalebuff', 'Robert Heilbroner', 'Paul Krugman', 'Michael Todaro', 'Joseph Stiglitz', 'James McGuigan', 'Adam Smith'],
            titulos: ['Economía para Principiantes', 'Microeconomía', 'Macroeconomía', 'Teoría de Juegos', 'Historia del Pensamiento Económico', 'Economía Internacional', 'Economía del Desarrollo', 'Economía Pública', 'Economía de la Empresa', 'La Riqueza de las Naciones']
        },
        14: {
            autores: ['Carlos Cossio', 'Karl Loewenstein', 'Claus Roxin', 'Manuel Albaladejo', 'José Garrigues', 'Antonio Remiro', 'Américo Plá Rodríguez', 'Hans Kelsen', 'Eduardo García de Enterría', 'Juan Iglesias'],
            titulos: ['Introducción al Derecho', 'Derecho Constitucional', 'Derecho Penal', 'Derecho Civil', 'Derecho Mercantil', 'Derecho Internacional', 'Derecho Laboral', 'Filosofía del Derecho', 'Derecho Administrativo', 'Derecho Romano']
        },
        15: {
            autores: ['Henry Gray', 'Arthur Guyton', 'Vinay Kumar', 'Laurence Brunton', 'Harrison', 'Patrick Murray', 'Eric Kandel', 'Charles Janeway', 'Robert Nussbaum', 'Leon Gordis'],
            titulos: ['Anatomía de Gray', 'Fisiología Médica', 'Patología Estructural', 'Farmacología', 'Medicina Interna', 'Microbiología Médica', 'Neurociencia', 'Inmunología', 'Genética Médica', 'Epidemiología']
        }
    };

    for (const [catId, datos] of Object.entries(datosPorCategoria)) {
        datos.autores.forEach((autor, i) => {
            libros.push({
                id: id++,
                titulo: datos.titulos[i],
                autor: autor,
                editorial: ['Editorial A', 'Editorial B', 'Editorial C', 'Editorial D', 'Editorial E'][i % 5],
                isbn: `978-${String(catId).padStart(3, '0')}${String(i).padStart(4, '0')}`,
                id_categoria: parseInt(catId),
                anio_publicacion: 1950 + i * 5,
                ejemplares_totales: 3 + (i % 3),
                ejemplares_disponibles: 2 + (i % 2),
                descripcion: `Obra de ${autor}`,
                estado: 'ACTIVO'
            });
        });
    }
    return libros;
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

    // Mostrar/Ocultar registro
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        toggleSections(elements.loginSection, elements.registerSection);
    });

    document.getElementById('cancelRegister').addEventListener('click', () => {
        toggleSections(elements.registerSection, elements.loginSection);
    });

    // Botones de cancelar en modales
    document.querySelectorAll('.form-actions .btn-secondary[data-modal]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = e.target.dataset.modal || e.target.closest('[data-modal]').dataset.modal;
            closeModal(modalId);
        });
    });

    // Formularios de modales
    elements.bookForm.addEventListener('submit', handleBookSubmit);
    elements.loanForm.addEventListener('submit', handleLoanSubmit);
    elements.userForm.addEventListener('submit', handleUserSubmit);
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

function handleLogin(e) {
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

function handleRegister(e) {
    e.preventDefault();
    const nombre = document.getElementById('registroNombre').value;
    const apellido = document.getElementById('registroApellido').value;
    const carnet = document.getElementById('registroCarnet').value;
    const correo = document.getElementById('registroCorreo').value;
    const tipo_usuario = document.getElementById('registroTipo').value;

    if (!nombre || !apellido || !carnet || !correo || !tipo_usuario) {
        showToast('Por favor, complete todos los campos', 'warning');
        return;
    }

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
        nombre, apellido, carnet, correo, tipo_usuario, estado: 'ACTIVO'
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
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-section="${section}"]`);
    if (activeLink) activeLink.classList.add('active');

    switch (section) {
        case 'inicio': showSection(elements.inicioSection); loadDashboard(); break;
        case 'libros': showSection(elements.librosSection); loadLibros(); break;
        case 'prestamos': showSection(elements.prestamosSection); loadPrestamos(); break;
        case 'devoluciones': showSection(elements.devolucionesSection); loadDevoluciones(); break;
        case 'reservas': showSection(elements.reservasSection); loadReservas(); break;
        case 'usuarios':
            if (state.currentUser?.tipo_usuario === 'ADMINISTRADOR') {
                showSection(elements.usuariosSection); loadUsuarios();
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
    const sections = [elements.inicioSection, elements.librosSection, elements.prestamosSection, elements.devolucionesSection, elements.reservasSection, elements.usuariosSection];
    sections.forEach(sec => { if (sec !== section) sec.style.display = 'none'; });
    section.style.display = 'block';
}

function toggleSections(hide, show) {
    hide.style.display = 'none';
    show.style.display = 'block';
}

// Dashboard
function loadDashboard() {
    elements.totalLibros.textContent = state.libros.length;
    elements.totalUsuarios.textContent = state.usuarios.filter(u => u.estado === 'ACTIVO').length;
    elements.prestamosActivos.textContent = state.prestamos.filter(p => p.estado === 'PRESTADO').length;
    elements.reservasActivas.textContent = state.reservas.filter(r => r.estado === 'ACTIVA').length;

    if (state.currentUser?.tipo_usuario === 'ADMINISTRADOR') {
        elements.adminSection.style.display = 'block';
        renderLibrosMasPrestados();
    } else {
        elements.adminSection.style.display = 'none';
    }
}

function renderLibrosMasPrestados() {
    elements.librosMasPrestados.innerHTML = '';
    const conteoPrestamos = {};
    state.prestamos.forEach(p => {
        conteoPrestamos[p.id_libro] = (conteoPrestamos[p.id_libro] || 0) + 1;
    });

    const librosConPrestamos = Object.keys(conteoPrestamos).map(id => {
        const libro = state.libros.find(l => l.id === parseInt(id));
        return { titulo: libro ? libro.titulo : 'Libro no encontrado', total_prestamos: conteoPrestamos[id] };
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
    populateCategoriasSelect();
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
        card.innerHTML = `
            <h3>${libro.titulo}</h3>
            <div class="author">${libro.autor}</div>
            <div class="info"><i class="fas fa-tags"></i> ${getCategoriaNombre(libro.id_categoria)}</div>
            <div class="info"><i class="fas fa-copy"></i> ${libro.ejemplares_disponibles}/${libro.ejemplares_totales} disponibles</div>
            <div class="info"><i class="fas fa-calendar"></i> ${libro.anio_publicacion || 'Sin año'}</div>
            <div class="availability ${libro.ejemplares_disponibles > 0 ? 'available' : 'unavailable'}">
                <i class="fas fa-circle"></i> ${libro.ejemplares_disponibles > 0 ? 'Disponible' : 'No disponible'}
            </div>
            <div class="card-actions">
                <button class="btn btn-primary btn-small" onclick="verLibro(${libro.id})"><i class="fas fa-eye"></i> Ver</button>
                ${libro.ejemplares_disponibles > 0 ? `<button class="btn btn-secondary btn-small" onclick="reservarLibro(${libro.id})"><i class="fas fa-calendar-plus"></i> Reservar</button>` : ''}
                ${state.currentUser?.tipo_usuario === 'ADMINISTRADOR' ? `
                    <button class="btn btn-warning btn-small" onclick="editarLibro(${libro.id})"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-danger btn-small" onclick="eliminarLibro(${libro.id})"><i class="fas fa-trash"></i> Eliminar</button>
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
        card.innerHTML = `
            <h3>${libro.titulo}</h3>
            <div class="author">${libro.autor}</div>
            <div class="info"><i class="fas fa-tags"></i> ${getCategoriaNombre(libro.id_categoria)}</div>
            <div class="info"><i class="fas fa-copy"></i> ${libro.ejemplares_disponibles}/${libro.ejemplares_totales} disponibles</div>
            <div class="info"><i class="fas fa-calendar"></i> ${libro.anio_publicacion || 'Sin año'}</div>
            <div class="availability ${libro.ejemplares_disponibles > 0 ? 'available' : 'unavailable'}">
                <i class="fas fa-circle"></i> ${libro.ejemplares_disponibles > 0 ? 'Disponible' : 'No disponible'}
            </div>
            <div class="card-actions">
                <button class="btn btn-primary btn-small" onclick="verLibro(${libro.id})"><i class="fas fa-eye"></i> Ver</button>
                ${libro.ejemplares_disponibles > 0 ? `<button class="btn btn-secondary btn-small" onclick="reservarLibro(${libro.id})"><i class="fas fa-calendar-plus"></i> Reservar</button>` : ''}
                ${state.currentUser?.tipo_usuario === 'ADMINISTRADOR' ? `
                    <button class="btn btn-warning btn-small" onclick="editarLibro(${libro.id})"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-danger btn-small" onclick="eliminarLibro(${libro.id})"><i class="fas fa-trash"></i> Eliminar</button>
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

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Usuario</th>
                <th>Libro</th>
                <th>Fecha Préstamo</th>
                <th>Fecha Vencimiento</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${state.prestamos.map(p => `
                <tr>
                    <td>${getUsuarioNombre(p.id_usuario)}</td>
                    <td>${getLibroTitulo(p.id_libro)}</td>
                    <td>${formatDateTime(p.fecha_prestamo)}</td>
                    <td>${formatDateTime(p.fecha_vencimiento)}</td>
                    <td><span class="status-badge ${p.estado.toLowerCase()}">${p.estado}</span></td>
                    <td class="action-buttons">
                        ${p.estado === 'PRESTADO' ? `<button class="btn btn-success btn-small" onclick="registrarDevolucion(${p.id})"><i class="fas fa-undo"></i> Devolver</button>` : ''}
                        <button class="btn btn-secondary btn-small" onclick="verPrestamo(${p.id})"><i class="fas fa-eye"></i> Ver</button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    elements.prestamosList.appendChild(table);
}

function filterPrestamos() {
    const estado = elements.filterPrestamoEstado.value;
    const filtered = state.prestamos.filter(p => !estado || p.estado === estado);

    elements.prestamosList.innerHTML = '';
    if (filtered.length === 0) {
        elements.prestamosList.innerHTML = '<div class="empty-state"><i class="fas fa-exchange-alt icon"></i><h3>No hay préstamos</h3><p>No se encontraron préstamos con ese estado</p></div>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Usuario</th>
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
                    <td>${getUsuarioNombre(p.id_usuario)}</td>
                    <td>${getLibroTitulo(p.id_libro)}</td>
                    <td>${formatDateTime(p.fecha_prestamo)}</td>
                    <td>${formatDateTime(p.fecha_vencimiento)}</td>
                    <td><span class="status-badge ${p.estado.toLowerCase()}">${p.estado}</span></td>
                    <td class="action-buttons">
                        ${p.estado === 'PRESTADO' ? `<button class="btn btn-success btn-small" onclick="registrarDevolucion(${p.id})"><i class="fas fa-undo"></i> Devolver</button>` : ''}
                        <button class="btn btn-secondary btn-small" onclick="verPrestamo(${p.id})"><i class="fas fa-eye"></i> Ver</button>
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
    if (state.devoluciones.length === 0) {
        elements.devolucionesList.innerHTML = '<div class="empty-state"><i class="fas fa-undo icon"></i><h3>No hay devoluciones</h3><p>No se han registrado devoluciones</p></div>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Préstamo</th>
                <th>Fecha Devolución</th>
                <th>Días de Retraso</th>
                <th>Multa Generada</th>
                <th>Estado de Multa</th>
            </tr>
        </thead>
        <tbody>
            ${state.devoluciones.map(d => `
                <tr>
                    <td>${d.id_prestamo}</td>
                    <td>${formatDateTime(d.fecha_devolucion)}</td>
                    <td>${d.dias_retraso}</td>
                    <td>Bs. ${d.multa_generada.toFixed(2)}</td>
                    <td><span class="status-badge ${d.estado_multa.toLowerCase()}">${d.estado_multa}</span></td>
                </tr>
            `).join('')}
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
    if (state.reservas.length === 0) {
        elements.reservasList.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-check icon"></i><h3>No hay reservas</h3><p>No tienes reservas activas</p></div>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Libro</th>
                <th>Fecha Reserva</th>
                <th>Estado</th>
                <th>Posición en Lista</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${state.reservas.map(r => `
                <tr>
                    <td>${getLibroTitulo(r.id_libro)}</td>
                    <td>${formatDateTime(r.fecha_reserva)}</td>
                    <td><span class="status-badge ${r.estado.toLowerCase()}">${r.estado}</span></td>
                    <td>${r.posicion_lista}</td>
                    <td class="action-buttons">
                        <button class="btn btn-danger btn-small" onclick="cancelarReserva(${r.id})"><i class="fas fa-times"></i> Cancelar</button>
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
                        <button class="btn btn-warning btn-small" onclick="editarUsuario(${u.id})"><i class="fas fa-edit"></i> Editar</button>
                        <button class="btn btn-danger btn-small" onclick="eliminarUsuario(${u.id})"><i class="fas fa-trash"></i> Eliminar</button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    elements.usuariosList.appendChild(table);
}

// Categorías
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
    document.getElementById('bookModalTitle').innerHTML = `<i class="fas fa-book"></i> ${id ? 'Editar Libro' : 'Nuevo Libro'}`;
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
    document.getElementById('userModalTitle').innerHTML = `<i class="fas fa-user-plus"></i> ${id ? 'Editar Usuario' : 'Nuevo Usuario'}`;
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

// Funciones globales para onclick
window.verLibro = function (id) {
    const libro = state.libros.find(l => l.id === id);
    if (libro) {
        const content = `
            <div class="detail-row"><span class="detail-label">Título</span><span class="detail-value">${libro.titulo}</span></div>
            <div class="detail-row"><span class="detail-label">Autor</span><span class="detail-value">${libro.autor}</span></div>
            <div class="detail-row"><span class="detail-label">Editorial</span><span class="detail-value">${libro.editorial || 'No especificada'}</span></div>
            <div class="detail-row"><span class="detail-label">ISBN</span><span class="detail-value">${libro.isbn}</span></div>
            <div class="detail-row"><span class="detail-label">Categoría</span><span class="detail-value">${getCategoriaNombre(libro.id_categoria)}</span></div>
            <div class="detail-row"><span class="detail-label">Año Publicación</span><span class="detail-value">${libro.anio_publicacion || 'No especificado'}</span></div>
            <div class="detail-row"><span class="detail-label">Ejemplares Totales</span><span class="detail-value">${libro.ejemplares_totales}</span></div>
            <div class="detail-row"><span class="detail-label">Ejemplares Disponibles</span><span class="detail-value">${libro.ejemplares_disponibles}</span></div>
            <div class="detail-row"><span class="detail-label">Disponibilidad</span><span class="detail-value"><span class="badge ${libro.ejemplares_disponibles > 0 ? 'badge-success' : 'badge-danger'}">${libro.ejemplares_disponibles > 0 ? 'Disponible' : 'No disponible'}</span></span></div>
            <div class="detail-row"><span class="detail-label">Descripción</span><span class="detail-value">${libro.descripcion || 'No especificada'}</span></div>
        `;
        document.getElementById('bookDetailContent').innerHTML = content;
        openModal('bookDetailModal');
    }
};

window.reservarLibro = function (id_libro) {
    const libro = state.libros.find(l => l.id === id_libro);
    if (!libro) { showToast('Libro no encontrado', 'error'); return; }
    if (libro.ejemplares_disponibles <= 0) { showToast('No hay ejemplares disponibles para reservar', 'error'); return; }

    const reservaExistente = state.reservas.find(r => r.id_usuario === state.currentUser.id && r.id_libro === id_libro && r.estado === 'ACTIVA');
    if (reservaExistente) { showToast('Ya tienes una reserva activa para este libro', 'warning'); return; }

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

window.editarLibro = function (id) { openBookModal(id); };

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
    if (!prestamo) { showToast('Préstamo no encontrado', 'error'); return; }
    if (prestamo.estado !== 'PRESTADO') { showToast('El préstamo ya fue devuelto o no está activo', 'error'); return; }

    const fechaHoy = new Date();
    const fechaVencimiento = new Date(prestamo.fecha_vencimiento);
    const diasRetraso = Math.max(0, Math.ceil((fechaHoy - fechaVencimiento) / (1000 * 60 * 60 * 24)));
    const multaGenerada = diasRetraso * 1.00;

    prestamo.estado = 'DEVUELTO';
    prestamo.fecha_devolucion = fechaHoy.toISOString();

    const libro = state.libros.find(l => l.id === prestamo.id_libro);
    if (libro) libro.ejemplares_disponibles += 1;

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

window.verPrestamo = function (id) { console.log('Ver préstamo:', id); };

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

window.editarUsuario = function (id) { openUserModal(id); };

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
function handleBookSubmit(e) {
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
        const index = state.libros.findIndex(l => l.id === parseInt(id));
        if (index > -1) {
            state.libros[index] = { ...state.libros[index], ...data };
            showToast('Libro actualizado exitosamente', 'success');
        }
    } else {
        // Validar ISBN duplicado
        if (state.libros.some(l => l.isbn === data.isbn)) {
            showToast('El ISBN ya existe', 'error');
            return;
        }
        const nuevoLibro = { id: Date.now(), ...data, estado: 'ACTIVO' };
        state.libros.push(nuevoLibro);
        showToast('Libro creado exitosamente', 'success');
    }

    saveData();
    closeModal('bookModal');
    loadLibros();
    loadDashboard();
}

function handleLoanSubmit(e) {
    e.preventDefault();
    const data = {
        id_usuario: parseInt(document.getElementById('loanUsuario').value),
        id_libro: parseInt(document.getElementById('loanLibro').value),
        dias_prestamo: parseInt(document.getElementById('loanDias').value)
    };

    const usuario = state.usuarios.find(u => u.id === data.id_usuario);
    const libro = state.libros.find(l => l.id === data.id_libro);

    if (!usuario || !libro) { showToast('Usuario o libro no encontrado', 'error'); return; }
    if (libro.ejemplares_disponibles <= 0) { showToast('No hay ejemplares disponibles para préstamo', 'error'); return; }

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
        creado_por: state.currentUser.id
    };

    state.prestamos.push(nuevoPrestamo);
    libro.ejemplares_disponibles -= 1;
    saveData();

    showToast('Préstamo registrado exitosamente', 'success');
    closeModal('loanModal');
    loadPrestamos();
    loadDashboard();
    loadLibros();
}

function handleUserSubmit(e) {
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
        const index = state.usuarios.findIndex(u => u.id === parseInt(id));
        if (index > -1) {
            state.usuarios[index] = { ...state.usuarios[index], ...data };
            showToast('Usuario actualizado exitosamente', 'success');
        }
    } else {
        // Validar duplicados
        if (state.usuarios.some(u => u.carnet === data.carnet)) {
            showToast('El carnet ya está registrado', 'error');
            return;
        }
        if (state.usuarios.some(u => u.correo === data.correo)) {
            showToast('El correo ya está registrado', 'error');
            return;
        }
        const nuevoUsuario = { id: Date.now(), ...data };
        state.usuarios.push(nuevoUsuario);
        showToast('Usuario creado exitosamente', 'success');
    }

    saveData();
    closeModal('userModal');
    loadUsuarios();
    loadDashboard();
}

// Funciones auxiliares
function loadLoanModalData() {
    const usuarioSelect = document.getElementById('loanUsuario');
    usuarioSelect.innerHTML = '<option value="">Seleccione...</option>';
    state.usuarios.forEach(u => {
        const option = document.createElement('option');
        option.value = u.id;
        option.textContent = `${u.nombre} ${u.apellido} (${u.carnet})`;
        usuarioSelect.appendChild(option);
    });

    const libroSelect = document.getElementById('loanLibro');
    libroSelect.innerHTML = '<option value="">Seleccione...</option>';
    state.libros.filter(l => l.ejemplares_disponibles > 0).forEach(l => {
        const option = document.createElement('option');
        option.value = l.id;
        option.textContent = `${l.titulo} por ${l.autor}`;
        libroSelect.appendChild(option);
    });
}

function formatDateTime(dateString) {
    if (!dateString) return 'No especificado';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });
}

function showToast(message, type = 'info') {
    elements.toast.textContent = message;
    elements.toast.className = `toast show ${type}`;
    setTimeout(() => { elements.toast.classList.remove('show'); }, 3000);
}