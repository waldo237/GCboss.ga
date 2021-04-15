import React from 'react'
import styles from "../App.module.scss";

export default function Progress(props:{value:number, total:number}) {
    const {value,total} = props;
    const percentage = (100 * value) / total;
    return (
        <div className={styles.flexRows}>
            <small>{percentage} %</small>
            <progress value={percentage} max="100"></progress>
                {(value && total)?<div><small>{value}/</small> <small>{total}</small></div>:null}
        </div>
    )
}
