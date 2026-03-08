import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <span className={styles.logoDot}></span>
                    MyTutorials
                </Link>
                <ul className={styles.navLinks}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/tutorials">Tutorials</Link></li>
                    <li><Link to="/admin" className={styles.adminLink}>Admin</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
