import {auth} from './auth.js';

// Obtenemos el nombre del usuario y lo mostramos en la barra de navegación
const username = document.getElementById('username');
username.textContent = auth.user.username;

// Obtener todas las tareas desde el backend
const API_URL = 'http://localhost/back/temas/';

// Sacamos la id del tema de la URL con un get query params
const urlParams = new URLSearchParams(window.location.search);
const id_tema = urlParams.get('id_tema');

const id_usuario = auth.user.id_usuario;

document.addEventListener('DOMContentLoaded', () => {
    if (!auth.isAuthenticated()) {
        window.location.href = '../index.html';
    } else {
        // Hacemos un post para agregar un comentario
        const form = document.getElementById('add-comment-form');
        const comment = document.getElementById('comment');
        // Obtenemos el comentario del formulario
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            await sendComment(comment.value);
        });
    }
});

async function sendComment(comment) {
    try {
        const response = await fetch(`${API_URL}${id_tema}/comentarios/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                id_tema: id_tema,
                id_usuario: id_usuario,
                descripcion: comment
            })
        });
        if (!response.ok) {
            throw new Error('Failed to send comment');
        }
        alert('Comentario enviado con éxito');
        window.location.reload();
    } catch (error) {
        console.error('Error al enviar el comentario:', error);
        alert('Error al enviar el comentario. Por favor, intente de nuevo más tarde.');
    }
}
// Logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    auth.logout();
    window.location.href = '../index.html';
});