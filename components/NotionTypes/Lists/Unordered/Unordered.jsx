import React from 'react'
import { getTextContent } from '../../../../utils/notionTypeParser/textParser'
import styles from './unordered.module.css'

function UnorderedList({ columnItem }) {
    return (
        <ul className={styles.ul}>
            {columnItem.children.map((li) => (
                <li className={styles.li} key={li.id}>
                    {getTextContent(li, true)}
                </li>
            ))}
        </ul>
    )
}

export default UnorderedList
