function validateUser(username, password) {
  // Validación básica
  if (username.length < 3 || password.length < 8) {
    return false;
  }
  
  // Aquí iría la lógica real de autenticación
  return true;
}

module.exports = { validateUser };
