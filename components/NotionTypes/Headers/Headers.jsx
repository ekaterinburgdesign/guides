import React from 'react'
import { getHeaderContent } from '../../../utils/notionTypeParser/textParser'
import styles from './Headers.module.css'

export function H1({ columnItem }) {
    return (
        <h1 id={columnItem.id} className={styles.heading1}>
            {getHeaderContent(columnItem)}
        </h1>
    )
}

export function H2({ columnItem }) {
    return (
        <h2 id={columnItem.id} className={styles.heading2}>
            {getHeaderContent(columnItem)}
        </h2>
    )
}

export function H3({ columnItem }) {
    return (
        <h3 id={columnItem.id} className={styles.heading3}>
            {getHeaderContent(columnItem)}
        </h3>
    )
}
