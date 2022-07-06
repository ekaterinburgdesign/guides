import React from 'react'
import Link from 'next/link'
import styles from './arrow.module.css'

const getCatalogOptions = (catalog) => ({
    url: catalog.properties.pageUrl.url,
    title: catalog.properties.Name.title[0].plain_text,
})

// TODO: выделить общую логику у этих двух компонент
export function PrevPage({ prevPageIndex, tableOfContentArr, pageUrl, catalogIndex, children }) {
    let href = {
        pathname: '/[[...pageUrl]]',
        query: { pageUrl: [] },
    }
    let title = ''

    if (prevPageIndex >= 0) {
        href.query.pageUrl = [pageUrl[0], tableOfContentArr[prevPageIndex].url]
        title = tableOfContentArr[prevPageIndex].title
    } else {
        const prevCatalogIndex = catalogIndex - 1
        if (Number.isNaN(prevCatalogIndex)) {
            return prevCatalogIndex + 1
        }
        if (prevCatalogIndex <= -1) {
            title = 'Назад к руководствам'
            href = { pathname: '/' }
        } else {
            const prevCatalog = getCatalogOptions(children[prevCatalogIndex])
            title = prevCatalog.title
            href.query.pageUrl = [prevCatalog.url]
        }
    }

    return (
        <Link href={href} passHref>
            <a className={styles.arrowNavLink}>←&nbsp;{title}</a>
        </Link>
    )
}

export function NextPage({ nextPageIndex, tableOfContentArr, pageUrl, catalogIndex, children }) {
    let href = {
        pathname: '/[[...pageUrl]]',
        query: { pageUrl: [] },
    }
    let title = ''

    if (nextPageIndex < tableOfContentArr.length) {
        href.query.pageUrl = [pageUrl[0], tableOfContentArr[nextPageIndex].url]
        title = tableOfContentArr[nextPageIndex].title
    } else {
        const nextCatalogIndex = catalogIndex + 1
        if (Number.isNaN(nextCatalogIndex)) {
            return nextCatalogIndex - 1
        }
        if (nextCatalogIndex >= children.length) {
            title = 'Назад к руководствам'
            href = { pathname: '/' }
        } else {
            const nextCatalog = getCatalogOptions(children[nextCatalogIndex])
            title = nextCatalog.title
            href.query.pageUrl = [nextCatalog.url]
        }
    }

    return (
        <Link href={href} passHref>
            <a className={styles.arrowNavLink}>{title}&nbsp;→</a>
        </Link>
    )
}
