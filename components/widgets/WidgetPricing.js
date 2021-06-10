import styles from '../../styles/modules/Widget.module.css'

export const WidgetPricing = ({title, text, footer}) => {
  return (

    <div className={`group ${styles.widget}`}>
      { title &&
      <div className={`${styles.widget_header}`}>
        <div className={`${styles.widget_title}`}>{title}</div>
      </div> }
      { text &&
      <div className={`${styles.widget_body}`}>
        <div className={`${styles.widget_text}`}>{text}</div>
      </div> }
      { footer &&
      <div className={`${styles.widget_footer}`}>
        <div className={`${styles.widget_text}`}>{footer}</div>
      </div> }
    </div>

  );
};