export const validateLogin = (input) => {
    const errors = {}

    if (!input.username) {
        errors.username = "El usuario es requerido"
    } else if(/\s/.test(input.username)){
        errors.username = "No puede haber espacios en blanco"
    } 

    if (!input.password) {
        errors.password = "La contraseña es requerida"
    }

    return errors
}