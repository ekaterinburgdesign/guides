import React from 'react'
import styles from './paragraph.module.css'
import { getTextContent } from '../../../../utils/notionTypeParser/textParser'

function Paragraph({ columnItem }) {
    const textContent = getTextContent(columnItem, true)
    return textContent.length ? <p className={styles.p}>{textContent}</p> : <br />
}

export default Paragraph
