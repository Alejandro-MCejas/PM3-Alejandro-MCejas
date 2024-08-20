import styles from './Register.module.css'
import { useState } from 'react'
import { validate } from '../../helpers/validate'
import axios from 'axios'


const Register = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({})



    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUserData({ ...userData, [name]: value })

        setErrors(validate({ ...userData, [name]: value }))

        // const updatedUserData = { ...userData, [name]: value }
        // setUserData(updatedUserData)

        // setErrors(validate(updatedUserData))
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        const validationErrors = validate(userData)
        setErrors(validationErrors)


        if (Object.keys(validationErrors).length === 0) {
            
            axios.post('http://localhost:3000/users/register', userData)
                .then(res => {
                    if (res.status === 201) {
                        alert('Usuario registrado con éxito')
                        
                        setUserData({
                            name: "",
                            email: "",
                            birthdate: "",
                            nDni: "",
                            username: "",
                            password: "",
                            confirmPassword: ""
                        })

                        setErrors({})
                    }
                })
                .catch(err => {
                    console.log(err)
                    alert('Error al registrar el usuario')
                })
        }
    }



    return (
        <form onSubmit={handleSubmit} className={styles.containerRegister}>
            <h1>Register</h1>

            <label>Nombre y Apellido: </label>
            <input type="text" value={userData.name} name='name' onChange={handleInputChange} />
            {userData.name && errors.name && <p>{errors.name}</p>}

            <label>Email: </label>
            <input type="email" value={userData.email} name='email' onChange={handleInputChange} />
            {userData.email && errors.email && <p>{errors.email}</p>}

            <label>Fecha de Nacimiento: </label>
            <input type="date" value={userData.birthdate} name='birthdate' onChange={handleInputChange} />
            {userData.birthdate && errors.birthdate && <p>{errors.birthdate}</p>}

            <label>DNI: </label>
            <input min="0" type="number" value={userData.nDni} name='nDni' onChange={handleInputChange} />
            {userData.nDni && errors.nDni && <p>{errors.nDni}</p>}

            <label>Usuario: </label>
            <input type="text" value={userData.username} name='username' onChange={handleInputChange} />
            {userData.username && errors.username && <p>{errors.username}</p>}

            <label>Contraseña: </label>
            <input type="password" value={userData.password} name='password' onChange={handleInputChange} />
            {userData.password && errors.password && <p>{errors.password}</p>}

            <label>Confirme su contraseña: </label>
            <input type="password" value={userData.confirmPassword} name='confirmPassword' onChange={handleInputChange} />
            {userData.confirmPassword && errors.confirmPassword && <p>{errors.confirmPassword}</p>}

            <input type="submit" value="Registrarse" disabled={Object.keys(errors).length > 0} />
        </form>
    )
}

export default Register