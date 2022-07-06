/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TableOfContents from '../../components/TableOfContents/TableOfContents'
import ManualPage from '../../components/ManualPage/ManualPage'
import getAllUrls from '../../utils/getAllUrls'
import { getTree, getPageByUrl } from '../../api/apiPage'
import tp from '../../utils/typograf/typograf.config'
import styles from './page.module.css'

function GetPage({ page, tree, catalogPage }) {
    const router = useRouter()
    const { pageUrl } = router.query

    const [prevPageIndex, setPrevPageIndex] = useState(-1)
    const [nextPageIndex, setNexPageIndex] = useState(9e13)
    const [children, setChildren] = useState()
    const [tableOfContentArr, setTableOfContentArr] = useState([])
    const [anchorLinks, setAnchorLinks] = useState([])

    const [pageList, setPageList] = React.useState([])
    const [pageName, setPageName] = React.useState('')
    const [catalogTitle, setCatalogTitle] = React.useState('')
    const [catalogId, setCatalogId] = React.useState('')
    const [catalogIndex, setCatalogIndex] = React.useState()

    const getColumnItem = (columnItem) => {
        const getLine = (columnList) => {
            if (!columnList.children.length) {
                return
            }

            return columnList.children.map((cols) => cols.children.map((col) => getColumnItem(col)))
        }

        const getTextContent = (item) =>
            item.content.text.map((par) => {
                const textContent = tp.execute(par?.text?.content)
                if (!textContent) {
                    return
                }

                return textContent
            })

        switch (columnItem.type) {
            case 'column_list':
                return <div className={styles.columnList}>{getLine(columnItem)}</div>

            case 'heading_1':
                return { id: columnItem.id, title: getTextContent(columnItem, true) }

            case 'heading_2':
                return { id: columnItem.id, title: getTextContent(columnItem, true) }

            case 'heading_3':
                return { id: columnItem.id, title: getTextContent(columnItem, true) }

            default:
                return null
        }
    }

    React.useEffect(() => {
        if (!page) {
            return
        }

        setPageList(page.children)
        setPageName(page.content.title)
    }, [page])

    React.useEffect(() => {
        if (!catalogPage) {
            return
        }

        setCatalogTitle(catalogPage.content.title)
        setCatalogId(catalogPage.id)
    }, [catalogPage])

    useEffect(() => {
        if (!tree) {
            return
        }

        setChildren(tree?.children)
    }, [tree])

    useEffect(() => {
        if (!children || !catalogId || catalogId === '') {
            return
        }

        const catalogIndexForSet = children.findIndex((catalog) => catalog.id === catalogId)
        setCatalogIndex(catalogIndexForSet)
    }, [children, catalogId])

    useEffect(() => {
        if (!children || !pageUrl) {
            return
        }

        let currentChildren = children
        let tableOfContentArrForSet = []
        let currentPageChildren

        for (const currentPageUrl of pageUrl) {
            if (currentPageChildren) {
                currentPageChildren =
                    currentPageChildren.find((obj) => obj.url === currentPageUrl)?.children || []
            }

            currentChildren = currentChildren.find(
                (obj) => obj?.properties?.pageUrl?.url === currentPageUrl
            )?.children
            const b = currentChildren.map((obj) => ({
                url: obj?.properties?.pageUrl?.url,
                title: obj?.properties?.Name?.title[0]?.text?.content,
                children: [],
            }))

            if (!currentPageChildren) {
                tableOfContentArrForSet = b
                currentPageChildren = tableOfContentArrForSet
            } else {
                currentPageChildren = b
            }
        }
        setTableOfContentArr(tableOfContentArrForSet)
    }, [children, pageUrl])

    useEffect(() => {
        if (tableOfContentArr.length === 0 || !pageUrl) {
            return
        }

        const curPageUrl = pageUrl.length > 1 ? pageUrl[pageUrl.length - 1] : undefined

        const curPageIndex = tableOfContentArr.findIndex((el) => el.url === curPageUrl)
        setPrevPageIndex(curPageIndex - 1)
        setNexPageIndex(curPageIndex + 1)
    }, [tableOfContentArr, pageUrl])

    useEffect(() => {
        if (pageList.length === 0) {
            return
        }

        const anchorLinksForSet = pageList.map(getColumnItem)

        setAnchorLinks(anchorLinksForSet.filter((l) => l?.id))
    }, [pageList])

    return (
        <>
            <TableOfContents
                tableOfContentArr={tableOfContentArr}
                currentPageUrl={pageUrl}
                anchorLinks={anchorLinks}
                catalogTitle={catalogTitle}
            />
            <ManualPage
                pageList={pageList}
                pageName={pageName}
                children={children}
                tableOfContentArr={tableOfContentArr}
                prevPageIndex={prevPageIndex}
                nextPageIndex={nextPageIndex}
                catalogIndex={catalogIndex}
                pageUrl={pageUrl}
            />
        </>
    )
}

export async function getStaticPaths() {
    const tree = await getTree()
    const pageUrls = getAllUrls(tree.children)

    const paths = pageUrls.map((url) => {
        return { params: { pageUrl: url } }
    })

    return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
    const { pageUrl } = params
    return {
        props: {
            tree: await getTree(),
            page: await getPageByUrl(pageUrl.join('/')),
            catalogPage: await getPageByUrl(pageUrl[0]),
        },
        revalidate: 15,
    }
}

export default GetPage
