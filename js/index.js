
document.getElementById
document.getElementById('form-login').addEventListener('submit', function(event) {
event.preventDefault(); 

// Obtener valores ingresados
const usuario = document.getElementById('usuario').value.trim();
const contrasena = document.getElementById('contrasena').value;

// Validar credenciales
if (usuario === 'admin' && contrasena === '12345') {
    window.location.href = '../nav/inicio.html'; 
} else {
    alert('Usuario o contraseña incorrectos.');
}
});
