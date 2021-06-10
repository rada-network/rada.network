import styles from '../../styles/modules/Widget.module.css'

export const Widget = ({title, text, footer, widgetIcon}) => {
  return (

    <div className={`group ${styles.widget}`}>
      { title &&
      <div className={`${styles.widget_header}`}>
        <div className={`${styles.widget_title}`}>{title}</div>
        <span className={`${styles.widget_icon}`}>
          <i className={`fa fa-${widgetIcon || ''} ${styles.widget_icon_fa}`}/>
        </span>
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