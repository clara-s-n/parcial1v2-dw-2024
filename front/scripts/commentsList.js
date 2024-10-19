import {auth} from './auth.js';

// Obtenemos el nombre del usuario y lo mostramos en la barra de navegación
const username = document.getElementById('username');
username.textContent = auth.user.username;

// Obtener todas las tareas desde el backend
const API_URL = 'http://localhost/back/temas/';

// Sacamos la id del tema de la URL con un get query params
const urlParams = new URLSearchParams(window.location.search);
const id_tema = urlParams.get('id_tema');

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
        const response = await fetch(`${API_URL}${id_tema}/comentarios/`, {
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
            <h4>Id del tema: ${task.id_tema}</h4>
            <p>Descripcion: ${task.descripcion}</p>
            <p>Id del usuario creador del comentario: ${task.id_usuario}</p>
            <div class="button-container">
            <a href="#" class="edit-button">Editar comentario</a>
            <a href="#" class="delete-button">Eliminar comentario</a>
            </div>
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