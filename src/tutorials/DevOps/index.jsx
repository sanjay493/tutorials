import React, { useState } from 'react';
import styles from './DevOps.module.css';
import devopsTopics from './data/devops-topics';

const DevOpsTutorial = () => {
    const [activeChapterId, setActiveChapterId] = useState(devopsTopics[0].id);

    const activeTopic = devopsTopics.find(t => t.id === activeChapterId);
    const currentIndex = devopsTopics.findIndex(t => t.id === activeChapterId);

    const handleNext = () => {
        if (currentIndex < devopsTopics.length - 1) {
            setActiveChapterId(devopsTopics[currentIndex + 1].id);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setActiveChapterId(devopsTopics[currentIndex - 1].id);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className={styles.tutorialContainer}>
            <header className={styles.header}>
                <h1>DevOps Mastery</h1>
                <p>Comprehensive guide to modern CI/CD, Docker, and Cloud Deployment.</p>
            </header>

            <div className={styles.content}>
                <aside className={styles.sidebar}>
                    <h3>Course Path</h3>
                    <ul>
                        {devopsTopics.map((topic) => (
                            <li 
                                key={topic.id} 
                                className={`${styles.sidebarItem} ${activeChapterId === topic.id ? styles.activeItem : ''}`}
                                onClick={() => setActiveChapterId(topic.id)}
                            >
                                <span className={styles.chapterNumber}>Ch {topic.chapter}</span>
                                <span className={styles.sidebarTitle}>{topic.title}</span>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className={styles.main}>
                    {activeTopic && (
                        <section key={activeTopic.id} className={styles.section}>
                            <div className={styles.chapterBadge}>Chapter {activeTopic.chapter}</div>
                            <h2>{activeTopic.title}</h2>

                            {activeTopic.sections.map((section, idx) => (
                                <div key={idx} className={styles.topicSection}>
                                    <div className={styles.topicContent}>
                                        {section.content}
                                    </div>
                                    {section.image && (
                                        <div className={styles.imageContainer}>
                                            <img src={section.image} alt={section.content} className={styles.topicImage} />
                                        </div>
                                    )}
                                    {section.code && (
                                        <pre className={styles.codeBlock}>
                                            <code>{section.code}</code>
                                        </pre>
                                    )}
                                </div>
                            ))}

                            {activeTopic.link && (
                                <div className={styles.externalLink}>
                                    <a href={activeTopic.link} target="_blank" rel="noopener noreferrer">
                                        View original tutorial reference →
                                    </a>
                                </div>
                            )}

                            <div className={styles.navigation}>
                                <button 
                                    onClick={handleBack} 
                                    disabled={currentIndex === 0}
                                    className={styles.navButton}
                                >
                                    ← Previous Chapter
                                </button>
                                <button 
                                    onClick={handleNext} 
                                    disabled={currentIndex === devopsTopics.length - 1}
                                    className={styles.navButton}
                                >
                                    Next Chapter →
                                </button>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DevOpsTutorial;
