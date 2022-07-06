import React, { useState, useEffect } from 'react'
import styles from '../styles/home.module.css'
import { getTree } from '../api/apiPage'
import Manual from '../components/Manual/Manual'

export default function Home({ tree }) {
    const [manuals, setManuals] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        if (!tree) {
            return
        }

        setManuals(tree.children)
        setTitle(tree?.properties?.child_page?.title)
    }, [tree])

    return (
        <main className={styles.homeContainer}>
            <h1 className={styles.mainTitle}>{title}</h1>
            <section className={styles.manualsSection}>
                {manuals.map((manual) => (
                    <Manual manual={manual} key={manual?.properties?.Name?.title} />
                ))}
            </section>
        </main>
    )
}

export async function getStaticProps() {
    const tree = await getTree()
    return {
        props: {
            tree,
        },
        revalidate: 15,
    }
}
