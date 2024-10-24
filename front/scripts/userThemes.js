import {auth} from './auth.js';

// Obtenemos el nombre del usuario y lo mostramos en la barra de navegación
const username = document.getElementById('username');
username.textContent = auth.user.username;

// Si está autenticado y es administrador, redirigir a la lista de tareas personales
if (auth.isAuthenticated() && auth.getRole()) {
    window.location.href = '../admin/index.html';
}

// Obtener todas las tareas desde el backend
const API_URL = 'http://localhost/back/usuarios/';
const id_usuario = auth.user.id_usuario;

const taskList = document.getElementById('card-grid');

document.addEventListener('DOMContentLoaded', () => {
    if (!auth.isAuthenticated()) {
        window.location.href = '../index.html';
    } else {
        initializePage();
    }
});

async function initializePage() {
    await getTasksList();
}

async function getTasksList() {
    try {
        const response = await fetch(`${API_URL}${id_usuario}/temas/`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch themes list');
        }
        const data = await response.json();
        renderTasksList(data);
    } catch (error) {
        console.error('Error al obtener el listado de temas:', error);
        alert('Error al cargar la lista de temas. Por favor, intente de nuevo más tarde.');
    }
}

function renderTasksList(tasks) {
    tasks.forEach(task => {
        const card = createTaskCard(task);
        taskList.appendChild(card);
    });
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card">
            <h4>Titulo: ${task.titulo}</h4>
            <p>Descripcion: ${task.descripcion}</p>
            <p>Id del tema: ${task.id_tema}</p>
            <p>Id del usuario creador: ${task.id_usuario}</p>
            <a href="../comments/index.html?id_tema=${task.id_tema}" class="back-button">Ver comentarios</a
        </div>
    `;
    return card;
}

// Logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    auth.logout();
    window.location.href = '../index.html';
});