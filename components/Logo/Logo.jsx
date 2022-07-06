import React from 'react'
import styles from './logo.module.css'

export default function Logo({ linkTo, logoSrc }) {
    return (
        <a className={styles.logoContainer} href={linkTo}>
            <img className={styles.logoImage} src={logoSrc} alt="Дизайн код Екатеринбурга" />
            <p className={styles.logoText} aria-hidden="true">
                Дизайн-код
                <br />
                Екатеринбурга
            </p>
        </a>
    )
}
