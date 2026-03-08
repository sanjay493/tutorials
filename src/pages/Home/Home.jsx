import React from 'react';
import { Link } from 'react-router-dom';
import TutorialRegistry from '../../tutorials';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.home}>
            <header className={styles.hero}>
                <h1 className="animate-fade-in">Master Your Craft</h1>
                <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Explore curated tutorials on DevOps, Frontend, and Cloud Architecture.
                </p>
            </header>

            <section className={styles.tutorialGrid}>
                {TutorialRegistry.map((tutorial, index) => (
                    <Link
                        to={`/tutorials/${tutorial.path}`}
                        key={tutorial.id}
                        className={`${styles.card} glass animate-fade-in`}
                        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                        <div className={styles.icon}>{tutorial.icon}</div>
                        <h2>{tutorial.title}</h2>
                        <p>{tutorial.description}</p>
                        <span className={styles.learnMore}>Explore Tutorial &rarr;</span>
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default Home;
