import styles from '../../styles/modules/Widget.module.css'

export const Widget = ({title, text, footer, widgetIcon, widgetIconColor}) => {
  return (

    <div className={`widget group ${styles.widget}`}>
      { title &&
      <div className={`widget-header`}>
        <div className={`widget-title`}>
          <span className="title">{title}</span>
        </div>
        <span className={`widget-icon`}>
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-300'} widget-icon-fa`}/>
        </span>
      </div> }
      { text &&
      <div className={`widget-body`}>
        <div className={`${styles.widget_text}`}>{text}</div>
      </div> }
      { footer &&
      <div className={`widget-footer`}>
        <div className={`${styles.widget_text}`}>{footer}</div>
      </div> }
    </div>

  );
};