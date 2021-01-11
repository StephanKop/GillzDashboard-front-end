import React, { useState, createContext } from 'react';

const deadlinesState = [];

// Create Context Object
export const DeadlinesContext = createContext<any[]>(deadlinesState);

// Create a provider for components to consume and subscribe to changes
export const DeadlinesContextProvider = props => {
    const [deadlines, setDeadlines] = useState(0);
    const [errors, setErrors] = useState(false);
    const [fetchUrl] = useState(process.env.REACT_APP_API_DEADLINES_ORDEREDBYDATE);

    async function fetchData() {
        const res = await fetch(fetchUrl as Request | string);
        res
            .json()
            .then((result) => {
                setDeadlines(result);
            })
            .catch(err => setErrors(err));
        return true;
    }

    return (
        <DeadlinesContext.Provider value={[deadlines, setDeadlines]}>
            {props.children}
            {fetchData()}
        </DeadlinesContext.Provider>
    );
};