import NavBarLinks from "./NavBarLinks"
import styles from "./NavBar.module.css"


const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>
                <NavBarLinks />
            </div>
        </nav>
    )
}


export default NavBar