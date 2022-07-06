import React from 'react'
import getTextContent from '../../../../utils/notionTypeParser/textParser'
import styles from './code.module.css'

export default function Code({ columnItem }) {
    return <code className={styles.code}>{getTextContent(columnItem, true)}</code>
}
