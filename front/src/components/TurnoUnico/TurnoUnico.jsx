import styles from "./TurnoUnico.module.css"
import { useDispatch } from "react-redux";
import axios from "axios";
import { cancelAppointment } from "../../redux/reducer";
import baseUrl from "../../api";


const TurnoUnico = ({ appointment: { id, date, time, status } }) => {

    const dispatch = useDispatch();

    const handleCancelAppointment = () => {
        const appointmentDateTime = new Date(`${date} ${time}`);
        const now = new Date();

        const timeDifferenceInHours = (appointmentDateTime - now) / (1000 * 60 * 60);

        if (timeDifferenceInHours >= 24) {
            axios.put(`${baseUrl}/appointments/cancel/${id}`)
                .then(res => {
                    console.log(res)
                    dispatch(cancelAppointment(id))
                })
                .catch(err => console.log(err))
        }
        else{
            alert("No puedes cancelar este turno porque solo se cancelan 24hs antes de la hora de tu turno")
        }



    }

    return (
        <div className={styles.containerAppointment}>
            <p>Fecha: {date}</p>
            <p>Hora: {time}</p>
            <p>Estado: {status} </p>
            <button onClick={handleCancelAppointment} disabled={status === "cancelled"}>Cancelar turno</button>
            {status === "cancelled" && <p>Turno cancelado</p>}
        </div>
    )
}

export default TurnoUnico