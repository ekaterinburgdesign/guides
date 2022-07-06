import React from 'react'
import { getTextContent } from '../../../../utils/notionTypeParser/textParser'
import styles from './ordered.module.css'

function OrderedList({ columnItem }) {
    return (
        <ol className={styles.ul}>
            {columnItem.children.map((li) => (
                <li className={styles.li} key={li.id}>
                    {getTextContent(li, true)}
                </li>
            ))}
        </ol>
    )
}

export default OrderedList
