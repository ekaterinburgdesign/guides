import React from 'react'
import styles from './link.module.css'

function Bookmark({ columnItem }) {
    return (
        <a className={styles.link} href={`${columnItem.content.url}`}>
            {columnItem.content.url}
        </a>
    )
}

export default Bookmark
