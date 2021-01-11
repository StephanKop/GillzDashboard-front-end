import React, {useEffect} from 'react';
import Notes from '../components/comp_notes';
import DialogNotes from '../components/comp_dialog_notes';
import '../page_styles/style_notes.scss';
import '../App.scss';
import Header from '../components/comp_header';

const PageNotes = ()  => {
    const openForm = () => {
        const modal = (document.getElementById('notesModal')!);
        modal.classList.add('visibleAnim');
        const modalBackground = (document.getElementById('modalBackground')!);
        modalBackground.classList.add('visible');
    };
    useEffect(() => {
        document.title = 'Gillz Dashboard';
    }, []);
        return (
            <div>
                <Header title={'Notes'}/>
                <div className={'content'}>
                    <div className={'content-container'}>
                        <div className={'notes-container__row'}>
                            {/*<h3 className={'notes-container__row--title'}>Notes</h3>*/}
                            <div className={'notes-container__row--add'}>
                                <img id={'add'} src={(require('../img/add.svg'))} alt={'add'} onClick={openForm}/>
                            </div>
                        </div>
                        <Notes apiLink={process.env.REACT_APP_API_NOTES}/>
                        <DialogNotes apiLink={process.env.REACT_APP_API_NOTES}/>
                    </div>
                </div>
            </div>
        );
    };

export default PageNotes;
