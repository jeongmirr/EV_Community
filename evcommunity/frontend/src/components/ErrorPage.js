import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/ErrorPageStyle.module.css'; //CSS


export default function ErrorPage() {
    return(
        <div className={styles.Errpage}>
            <h1>404 Error</h1>
            <h2>존재하지 않는 페이지 입니다.</h2>
            <br></br>
            <Link to="/">
                <button className={styles.backhomebutton}>
                    메인 화면으로 가기
                </button>
            </Link>
        </div>
        
    )
}