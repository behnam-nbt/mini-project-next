import styles from './Card.module.css';
import Image from 'next/image';

function Card({ product }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageBox}>
                <Image src="/images/Union.png" alt="logo" width={100} height={100} />
            </div>
            <div className={styles.title}>
                <h4><span>نام محصول: </span>{product.name}</h4>
                <p><span>تعداد: </span>{product.quantity.toLocaleString("fa-IR")}</p>
                <p className={styles.price}><span>قیمت: </span>{product.price.toLocaleString("fa-IR")} تومان</p>
            </div>
        </div>
    )
}

export default Card