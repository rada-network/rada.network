import React from "react";

import {observer} from "mobx-react";

const Button = ({active, onClick, children}) => {
    if (active) return <a className="btn btn-filter-active" onClick={onClick}>{children}</a>
    return <a className="btn btn-filter" onClick={onClick}>{children}</a>
}

export const TabButton = observer(({handle,nValue,value,dataStore}) => {
    return (
        <Button
            active={dataStore.currentTab === nValue}
            onClick={e => {dataStore.currentTab = nValue;dataStore.tweets = [];handle(e)} }>
            {value}
        </Button>
    )
})