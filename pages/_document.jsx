import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    const ogTitle = 'Городские руководства Екатеринбурга'
    const ogDescription =
        'Делаем онлайн-платформу для официальных городских руководств и стандартов'

    return (
        <Html lang="ru">
            <Head>
                <meta name="og:description" content={ogDescription} />
                <meta property="og:title" content={ogTitle} />
                <meta name="theme-color" content="#123" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
