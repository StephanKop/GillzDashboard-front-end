import React, { useState, useEffect } from 'react';
import '../component_styles/style_comp_notes.scss';
import NotesInterface from '../interfaces/notes';
import '../App.scss';
import axios from 'axios';
import {useSnackbar} from 'notistack';

const Notes = (props)  => {
    const [hasError, setErrors] =  useState(false);
    const [isLoaded, setIsLoaded] =  useState(false);
    const [notes,setDeadlines ]= useState<NotesInterface[]>([]);
    const [count, setCount] = useState(0);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    async function fetchData() {
        const res = await fetch(props.apiLink);
        res
            .json()
            .then((result) => {
                setIsLoaded(true);
                setDeadlines(result);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => fetchData(), (1000 * 10));
        return () => clearInterval(interval);
    }, [isLoaded, count]);

    if (!isLoaded) {
        return <h2>Loading...</h2>;
    }

    if (hasError) {
        return <h2>{hasError}</h2>;
    }
    const reload = () => {
        setCount(count + 1);
    };

    function deleteRequest(id) {
        axios.delete(process.env.REACT_APP_API_NOTES + '/' + id)
            .then((response) => {
                console.log(response);
                reload();
                enqueueSnackbar('Notitie verwijderd', {variant: 'success', anchorOrigin: {vertical: 'bottom', horizontal: 'center'}});
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar(error, {variant: 'error', anchorOrigin: {vertical: 'bottom', horizontal: 'center'}});
            });
    }

    return (
        <div className={'notes-container'}>
            {notes.map((notesData, index) => (
                <div key={index}>
                    <div className={'note'}>
                        <div>
                            <div className={'note__top'}>
                                <h3 className={'note__title'}>{notesData.title}</h3>
                                <img id={'edit'} src={(require('../img/delete.svg'))} alt={'edit'} onClick={() => deleteRequest(notesData.id)}/>
                            </div>
                            <p className={'note__description'}>{notesData.description}</p>
                        </div>
                        <div>
                            <p className={'note__date'}>{(new Date (notesData.date)).toISOString().split('T', 1)[0]}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notes;
