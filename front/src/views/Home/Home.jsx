import image from "../../assets/turnos.jpg"
import styles from "./Home.module.css"


const Home = () => {
    return (
        <div className={styles.containerHome}>
            <h1 style={{ textAlign: "center" }}>HOME</h1>
            <img src={image} alt="imagen de turnos" />
            <p className={styles.parrafosHome}>Agendá tu turno con la mejor atención</p>
            <p className={styles.parrafosHome}>Para agendar y ver tus turnos inicia sesión</p>
            <p className={styles.parrafosHome}>Si todavía no eres usuario, puedes registrarte</p>

        </div>

    )
}

export default Home