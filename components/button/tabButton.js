import React from "react";

import {observer} from "mobx-react";

const Button = ({active, onClick, children}) => {
    if (active) return <a className="btn rounded bg-white px-4 py-1 shadow-sm" onClick={onClick}>{children}</a>
    return <a className="btn rounded bg-white text-gray-400 bg-opacity-0 px-4 py-1" onClick={onClick}>{children}</a>
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