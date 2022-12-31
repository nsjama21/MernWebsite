import styles from './MenuListItem.module.css';

export default function MenuListItem({ menuItem, handleAddToOrder }) {
  return (
    <div className={styles.MenuListItem}>
      <img src={menuItem.image} alt="image" className={styles.image + " " + "flex-ctr-ctr"} />
      {/* <img src={menuItem.image} className={styles.image + ' ' + 'flex-ctr-ctr'}>{menuItem.image} /> */}
      <div className={styles.name}>{menuItem.name}</div>
      <div className={styles.buy}>
        <span>${menuItem.price.toFixed(2)}</span>
        <button className="btn-sm" onClick={() => handleAddToOrder(menuItem._id)}>
          ADD
        </button>
      </div>
    </div>
  );
}