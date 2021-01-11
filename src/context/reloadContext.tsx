import React, { useState, createContext } from 'react';

const reloadState = [];

// Create Context Object
export const ReloadContext = createContext<any[]>(reloadState);

// Create a provider for components to consume and subscribe to changes
export const ReloadContextProvider = props => {
    const [reload, setReload] = useState(0);

    return (
        <ReloadContext.Provider value={[reload, setReload]}>
            {props.children}
        </ReloadContext.Provider>
    );
};