import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cn from 'classnames'
import { useMediaQuery } from 'react-responsive'
import Logo from '../Logo/Logo'
import styles from './TableOfContents.module.css'
import tp from '../../utils/typograf/typograf.config'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'

function InnerLink({ anchor, baseState, setState }) {
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })
    if (isDesktop) {
        return (
            <a
                className={styles.innerTableOfContentsLink}
                key={anchor.title}
                href={`#${anchor.id}`}
            >
                {anchor.title}
            </a>
        )
    }
    return (
        <a
            className={styles.innerTableOfContentsLink}
            key={anchor.title}
            href={`#${anchor.id}`}
            onClick={() => setState(!baseState)}
        >
            {tp.execute(anchor.title)}
        </a>
    )
}

function TableOfContents({ tableOfContentArr, currentPageUrl = [], anchorLinks, catalogTitle }) {
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })
    const [isOpen, setIsOpen] = useState(isDesktop)

    // TODO: Сделать для большой вложенности...
    const tableOfContentsLink = ({ url, title }) => (
        <li className={styles.link}>
            <Link
                href={{
                    pathname: '/[[...pageUrl]]',
                    query: { pageUrl: [currentPageUrl[0], url] },
                    as: `${currentPageUrl.join('/')}/${url}`,
                }}
            >
                <a
                    className={cn(styles.tableOfContentsLink, {
                        [styles.active]: currentPageUrl[1] && currentPageUrl[1] === url,
                        [styles.separator]:
                            currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length,
                    })}
                    href={url}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {tp.execute(title)}
                </a>
            </Link>
            {currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length > 0 && (
                <ul className={styles.innerlinkContainerList}>
                    {anchorLinks.map((anchor) => (
                        <li className={styles.innerlinkContainerListItem} key={anchor.id}>
                            <InnerLink anchor={anchor} baseState={isOpen} setState={setIsOpen} />
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )

    const navClassName = cn(styles.tableOfContents, {
        [styles.open]: isOpen,
    })

    return (
        <>
            <Head>
                <title>{catalogTitle}</title>
            </Head>
            <HamburgerMenu state={isOpen} changeState={() => setIsOpen(!isOpen)} />
            <aside>
                <nav className={navClassName}>
                    <Link
                        href={{
                            pathname: '/',
                        }}
                    >
                        <a className={styles.linkToAllManuals} href="/">
                            ←&nbsp;Все руководства
                        </a>
                    </Link>
                    <Link
                        href={{
                            pathname: '/[[...pageUrl]]',
                            query: { pageUrl: [currentPageUrl[0]] },
                        }}
                    >
                        <a className={styles.catalogTitle} href="/">
                            {tp.execute(catalogTitle)}
                        </a>
                    </Link>
                    <ul className={styles.linkContainerList}>
                        {currentPageUrl && tableOfContentArr.map((obj) => tableOfContentsLink(obj))}
                    </ul>
                    <Logo logoSrc="/Avatar.svg" linkTo="https://ekaterinburg.design/" />
                </nav>
            </aside>
        </>
    )
}

export default TableOfContents
