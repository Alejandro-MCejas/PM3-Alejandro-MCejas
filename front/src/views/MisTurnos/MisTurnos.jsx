import { useEffect } from "react";
import TurnoUnico from "../../components/TurnoUnico/TurnoUnico";
import styles from "./MisTurnos.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserAppointments } from "../../redux/reducer";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../api";

const MisTurnos = () => {
    const user = useSelector(state => state.user.user);
    const appointmentsSelector = useSelector(state => state.user.userAppointments);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

  
    useEffect(() => {
        if (user) {
            axios.get(`${baseUrl}/users/${user.id}`)
                .then(res => {
                    console.log(res);
                    const { appointments } = res.data;
                    dispatch(setUserAppointments(appointments));
                })
                .catch(err => console.log(err));
        }
    }, [user, dispatch]);

    return (
        <div className={styles.containerAppointments}>
            <h1>MIS TURNOS</h1>
            {appointmentsSelector && appointmentsSelector.length > 0 ? (
                appointmentsSelector.map(appointment => (
                    <TurnoUnico key={appointment.id} appointment={appointment} />
                ))
            ) : (
                <p>No hay turnos disponibles.</p>
            )}
        </div>
    );
};

export default MisTurnos;
