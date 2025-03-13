// Corrección de seguridad urgente
function sanitizeInput(input) { return input.replace(/[<>]/g, ''); }
