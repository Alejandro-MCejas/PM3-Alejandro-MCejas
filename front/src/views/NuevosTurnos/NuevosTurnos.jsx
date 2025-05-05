import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { validateAppointments } from "../../helpers/validateAppointments"
import styles from "./NuevosTurnos.module.css"
import axios from "axios"
import { createAppointment } from "../../redux/reducer"
import baseUrl from "../../api"



const NuevosTurnos = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const [appointments, setAppointments] = useState({
        date: "",
        time: "",
        userId: user ? user.id : null
    })


    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user, navigate])

    if (!user) return null



    const handleInputChange = (event) => {
        const { name, value } = event.target

        setAppointments({ ...appointments, [name]: value })
        setErrors(validateAppointments({ ...appointments, [name]: value }))

    }


    const handleCreateAppointment = (event) => {
        event.preventDefault()

        const validationErrors = validateAppointments(appointments)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            axios.post(`${baseUrl}/appointments/schedule`, appointments)
                .then(res => {
                    const newAppointment = res.data;
                    dispatch(createAppointment(newAppointment))

                    alert("Turno registrado")
                    navigate("/mis-turnos")
                })
                .catch(err => console.log(err))
        }
    }



    return (
        <div className={styles.containerAppointment}>
            <h1>Registrar un turno</h1>
            <form>
                <label>Fecha del turno: </label>
                <input name="date" type="date" onChange={handleInputChange} />
                {appointments.date && errors.date && <p>{errors.date}</p>}


                <label>Hora del turno: </label>
                <input name="time" type="time" onChange={handleInputChange} min="08:30" max="20:00" step="1800" />
                {appointments.time && errors.time && <p>{errors.time}</p>}

                <input type="submit" value="Registrar turno" onClick={handleCreateAppointment} disabled={Object.keys(errors).length > 0} />

            </form>
        </div>
    )
}

export default NuevosTurnos