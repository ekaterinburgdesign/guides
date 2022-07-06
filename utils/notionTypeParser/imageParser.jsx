import React from 'react'
import { api } from '../../next.config'
import styles from '../../components/ManualPage/Template.module.css'

const getImage = (imageObj) => {
    if (imageObj.content.image_data.caption.length === 0) {
        return (
            <img
                className={styles.templateImage}
                src={`${api.HOST}/static/${imageObj.content.image_name}`}
                alt=""
            />
        )
    }
    return (
        <div>
            <img
                className={styles.templateImage}
                src={`${api.HOST}/static/${imageObj.content.image_name}`}
                alt=""
            />
            <span>{imageObj.content.image_data.caption[0].plain_text}</span>
        </div>
    )
}

export default getImage
