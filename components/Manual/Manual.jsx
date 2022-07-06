import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './manual.module.css'
import { api } from '../../next.config'

function Manual({ manual }) {
    const imageUrl = manual.cover
    const titleArr = manual?.properties?.Name?.title
    const titleText = titleArr.length > 0 ? titleArr[0]?.text?.content : ''
    const pageUrl = manual?.properties?.pageUrl?.url

    return (
        <Link
            href={{
                pathname: '/[[...pageUrl]]',
                query: { pageUrl: [pageUrl] },
            }}
            passHref
        >
            <a className={styles.manualItem}>
                <Image
                    src={`${api.HOST}/static/${imageUrl}`}
                    alt={titleText}
                    layout="fill"
                    overflow="visible"
                    loading="lazy"
                />
            </a>
        </Link>
    )
}

export default Manual
