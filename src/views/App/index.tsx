import React from "react";
import styles from './index.module.scss';

import { useToDoStore } from "../../data/stores/useToDoStore";
import InputPlus from "../components/InputPlus";

export const App: React.FC = () => {

    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask
    ])
    
    console.log(tasks)

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <InputPlus onAdd={(title) => {
                    if (title) {
                        createTask(title);
                    }
                }} />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && <p className={styles.articleText}>There is no one task.</p>}
            </section>
        </article>
    )
}