function validateUser(username, password) {
  // Validación básica
  if (username.length < 3 || password.length < 8) {
    return false;
  }
  
  // Validación de caracteres especiales
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return false;
  }
  
  // Aquí iría la lógica real de autenticación
  return true;
}

function getUserRole(username) {
  // Determinar rol del usuario
  return 'user'; // Por defecto
}

module.exports = { validateUser, getUserRole };
function resetPassword(username) { /* TODO */ }
