import image from "../../assets/turnos.jpg"
import styles from "./Home.module.css"


const Home = () => {
    return (
        <div className={styles.containerHome}>
            <h1 style={{ textAlign: "center" }}>HOME</h1>
            <img src={image} alt="imagen de turnos" />
            <p>Agendá tu turno con la mejor atención</p>
            <p>Para agendar y ver tus turnos inicia sesión</p>
            <p>Si todavía no eres usuario, puedes registrarte</p>

        </div>

    )
}

export default Home