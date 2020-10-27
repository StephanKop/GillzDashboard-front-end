import React, { useState, useEffect } from 'react';
import '../component_styles/style_comp_notes.scss';
import '../App.scss';

const Notes = (props)  => {
    const  [hasError, setErrors] =  useState(false)
    const  [isLoaded, setIsLoaded] =  useState(false)
    const  [notes,setDeadlines ]= useState<any[]>([])

    async function fetchData() {
        const res = await fetch(props.apiLink);
        res
            .json()
            .then((res) => {
                setIsLoaded(true);
                setDeadlines(res);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
        let interval = setInterval(() => fetchData(), (1000 * 10))
        return () => clearInterval(interval)
    }, [isLoaded]);

    if (isLoaded) {
        convertDate();
    }

    if (!isLoaded) {
        return <h2>Loading...</h2>
    }

    if (hasError) {
        return <h2>Error</h2>
    }

    function convertDate() {
        Object.keys(notes).map((i) => {
            const formatDate = new Date(notes[i].date);
            formatDate.toDateString();
            new Date(formatDate).toLocaleDateString("nl");
        })
    }

    return (
        <div className={'notes-container'}>
            {notes.map((notesData, index) => (
                <div key={index}>
                    <div className={'note'}>
                        <h3 className={'note__title'}>{notesData.title}</h3>
                        <p className={'note__description'}>{notesData.description}</p>
                        <p className={'note__date'}>{(new Date (notesData.date)).toLocaleString("nl")}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notes;
