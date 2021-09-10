
export const Widget = ({title, text, footer, widgetIcon, widgetIconColor}) => {
  return (

    <div className={`widget group`}>
      { title &&
      <div className={`widget-header`}>
        <div className={`widget-title`}>
          <span className="text-color-title">{title}</span>
        </div>
        <span className={`widget-icon`}>
          <i className={`fa-duotone fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-300'} widget-icon-fa`}/>
        </span>
      </div> }
      { text &&
      <div className={`widget-body`}>
        <div className={`widget-text`}>
          {text}
        </div>
      </div> }
      { footer &&
      <div className={`widget-footer`}>
        <div className={`widget-footer--text`}>
          {footer}
        </div>
      </div> }
    </div>

  );
};