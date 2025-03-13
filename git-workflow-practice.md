# Escenario Práctico de Trabajo con Git

Asumiendo que ya has clonado un proyecto, vamos a trabajar en un escenario realista que incluya todos los comandos Git solicitados.

## 1. Revisar el estado inicial y el historial

```bash
# Ver en qué rama estamos y el estado actual del repositorio
git status

# Revisar el historial de commits
git log --oneline --graph --decorate
```

## 2. Crear y gestionar ramas (git branch, git checkout)

```bash
# Ver todas las ramas existentes
git branch

# Crear una nueva rama de funcionalidad
git branch feature/login-page

# Cambiar a la nueva rama
git checkout feature/login-page

# Alternativa: crear y cambiar en un solo paso
git checkout -b feature/user-registration
```

## 3. Crear archivos y hacer cambios

Primero, creemos un archivo Markdown para documentación:

```bash
# Crear archivo README.md
echo "# Sistema de Autenticación\n\nEste módulo maneja la autenticación de usuarios." > README.md

# Ver los cambios pendientes
git status
```

Ahora, creemos un archivo JavaScript para la funcionalidad:

```bash
# Crear archivo login.js
cat > login.js << 'EOL'
function validateUser(username, password) {
  // Validación básica
  if (username.length < 3 || password.length < 8) {
    return false;
  }
  
  // Aquí iría la lógica real de autenticación
  return true;
}

module.exports = { validateUser };
EOL

# Ver los cambios pendientes
git status
```

## 4. Preparar y confirmar cambios (git add, git commit)

```bash
# Añadir los archivos al área de preparación
git add README.md login.js

# Ver el estado ahora
git status

# Hacer el commit
git commit -m "Añadir validación básica de usuarios y documentación"

# Ver el historial actualizado
git log --oneline
```

## 5. Usar git diff para ver diferencias

Hagamos más cambios:

```bash
# Modificar el archivo login.js
cat > login.js << 'EOL'
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
EOL

# Ver las diferencias sin preparar
git diff

# Ver las diferencias entre el último commit y el working directory
git diff HEAD

# Ver diferencias entre dos commits específicos (sustituye HASH1 y HASH2 por hashes reales)
# git diff HASH1 HASH2
```

## 6. Preparar y confirmar los nuevos cambios

```bash
# Añadir los cambios al área de preparación
git add login.js

# Hacer el commit
git commit -m "Añadir validación de caracteres especiales y función de roles"
```

## 7. Corregir el último commit (git commit --amend)

```bash
# Añadir un archivo que olvidamos incluir
echo "// Constantes para roles de usuario" > roles.js
echo "const ROLES = { ADMIN: 'admin', USER: 'user', GUEST: 'guest' };" >> roles.js
echo "module.exports = ROLES;" >> roles.js

# Añadir el archivo al área de preparación
git add roles.js

# Modificar el último commit para incluir este archivo
git commit --amend -m "Añadir validación y sistema de roles de usuario"

# Ver el historial actualizado
git log --oneline
```

## 8. Crear etiquetas para versiones (git tag)

```bash
# Crear una etiqueta ligera
git tag v0.1.0

# Crear una etiqueta anotada con mensaje
git tag -a v0.1.1 -m "Primera versión con sistema de login básico"

# Ver todas las etiquetas
git tag

# Ver detalles de una etiqueta
git show v0.1.1

# Crear una etiqueta para un commit anterior
# git tag -a v0.0.9 COMMIT_HASH -m "Versión previa"
```

## 9. Trabajar con stash para guardar cambios temporales

```bash
# Hacer cambios sin confirmar
echo "function resetPassword(username) { /* TODO */ }" >> login.js

# Guardar los cambios en stash para cambiar de contexto
git stash save "Función de reseteo de contraseña en progreso"

# Ver lista de stashes
git stash list

# Cambiar a otra rama para una tarea urgente
git checkout main

# Crear rama de hotfix
git checkout -b hotfix/security-patch

# Crear un archivo para el hotfix
echo "// Corrección de seguridad urgente" > security-patch.js
echo "function sanitizeInput(input) { return input.replace(/[<>]/g, ''); }" >> security-patch.js

# Añadir y confirmar
git add security-patch.js
git commit -m "Hotfix: añadir sanitización de inputs para prevenir XSS"

# Volver a nuestra rama original
git checkout feature/login-page

# Recuperar los cambios del stash
git stash pop

# Alternativa: aplicar sin eliminar del stash
# git stash apply stash@{0}

# Ver que los cambios han vuelto
git status
```

## 10. Combinar cambios con merge

```bash
# Asegurémonos de estar en la rama principal
git checkout main

# Incorporar los cambios del hotfix
git merge hotfix/security-patch

# Ver el historial con las ramas
git log --oneline --graph --all
```

## 11. Usar rebase para incorporar cambios

```bash
# Volver a la rama de funcionalidad
git checkout feature/login-page

# Incorporar los cambios de main (incluyendo el hotfix)
git rebase main

# Ver el historial ahora
git log --oneline --graph --all
```

## 12. Gestionar conflictos (simulación)

```bash
# Crear conflicto: modificar el mismo archivo en main
git checkout main
echo "// Función de seguridad global" >> security-patch.js
echo "function validateAllInputs(form) { /* Validación global */ }" >> security-patch.js
git add security-patch.js
git commit -m "Añadir validación global de formularios"

# Modificar el mismo archivo en nuestra rama
git checkout feature/login-page
echo "// Extensión de seguridad" >> security-patch.js
echo "function secureLoginForm() { /* Seguridad específica para login */ }" >> security-patch.js
git add security-patch.js
git commit -m "Añadir seguridad específica para formulario de login"

# Intentar hacer merge (generará conflicto)
git checkout main
git merge feature/login-page

# Resolver conflicto (esto sería manual en un caso real)
# Supongamos que editamos el archivo para resolver

# Marcar como resuelto
git add security-patch.js
git commit -m "Merge: combinar seguridad global y específica de login"
```

## 13. Deshacer cambios con reset y revert

```bash
# Ver el historial para encontrar el commit que queremos revertir
git log --oneline

# Usar reset para deshacer commits (¡cuidado! esto modifica el historial)
# Soft: mantiene los cambios en área de preparación
git reset --soft HEAD~1

# Ver estado después del reset soft
git status

# Volver a hacer commit con un mensaje mejor
git commit -m "Combinar seguridad: global y específica para login"

# Para un nuevo cambio que queremos revertir públicamente
echo "// Función experimental" > experimental.js
git add experimental.js
git commit -m "Añadir función experimental (no lista para producción)"

# Revertir este commit (crea un nuevo commit que deshace los cambios)
git revert HEAD

# Ver historial final
git log --oneline --graph --all
```

## 14. Finalizar el desarrollo y etiquetar versión

```bash
# Completar la funcionalidad
git checkout feature/login-page
echo "// Sistema completo" >> login.js
git add login.js
git commit -m "Completar sistema de login"

# Integrar en main
git checkout main
git merge --no-ff feature/login-page -m "Merge: Sistema de login completo"

# Etiquetar la versión final
git tag -a v0.2.0 -m "Versión con sistema de login completo y seguro"

# Ver resultado final
git log --oneline --graph --all
```

Este flujo de trabajo ha cubierto todos los comandos solicitados:
- `git branch` para crear y listar ramas
- `git checkout` para cambiar entre ramas
- `git log` para ver el historial
- `git diff` para ver diferencias
- `git add` para preparar cambios
- `git commit` para confirmar cambios
- `git commit --amend` para modificar commits
- `git tag` para etiquetar versiones
- `git stash` para guardar cambios temporales
- `git merge` para combinar ramas
- `git rebase` para reorganizar commits
- `git reset` para deshacer cambios (cuidado con esto)
- `git revert` para deshacer cambios de forma segura
