import React from 'react'
import tp from '../typograf/typograf.config'

export const getHeaderContent = (item) =>
    item.content.text.map((par) => {
        const textContent = tp.execute(par?.text?.content)

        if (!textContent) {
            return
        }

        return textContent
    })

export const getTextContent = (item, useTypograf = false) =>
    item.content.text.map((par) => {
        const textContent = useTypograf ? tp.execute(par?.text?.content) : par?.text?.content
        const stylePar = {
            fontWeight: par?.annotations?.bold ? '500' : '300',
            color: par?.annotations?.color ? par?.annotations?.color : 'black',
            fontStyle: par?.annotations?.italic ? 'italic' : 'normal',
            // eslint-disable-next-line no-nested-ternary
            textDecoration: par?.annotations?.underline
                ? par?.annotations?.strikethrough
                    ? 'line-through'
                    : 'underline'
                : 'none',
        }

        if (!textContent) {
            return
        }

        // eslint-disable-next-line consistent-return
        return (
            <span style={{ ...stylePar }} key={textContent}>
                {textContent}
            </span>
        )
    })

export const getListItem = (columnItem) => {
    columnItem.children.map((li) => <li key={li.id}>{getTextContent(li, true)}</li>)
}
