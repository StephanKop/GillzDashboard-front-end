import React, { Component } from 'react';
import Deadlines from "../components/comp_deadlines";
import Dialog_deadlines from "../components/comp_dialog_deadlines";
import Dialog_deadlines_edit from "../components/comp_dialog_deadlines_edit";
import '../page_styles/style_deadlines.scss';
import '../App.scss';

export class Page_DeadLines extends Component {
    render() {
        function openForm() {
            const modal = (document.getElementById('deadlineModal')!);
            modal.classList.add('visible');
        }

        return (
            <div className={'content'}>
                <div className={'content-container'}>
                    <div className={'deadlines-container__row'}>
                        <h3 className={'deadlines-container__row--title'}>Deadlines</h3>
                        <div className={'deadlines-container__row--add'} onClick={openForm}>
                            <img id={'add'} src={(require('../img/add.svg'))} alt={'add'}/>
                        </div>
                    </div>
                    <Deadlines apiLink={process.env.REACT_APP_API_DEADLINES}/>
                    {/*<Dialog_deadlines apiLink={process.env.REACT_APP_API_MEMBERS}/>*/}
                    {/*<Dialog_deadlines_edit apiLink={process.env.REACT_APP_API_DEADLINES}/>*/}
                </div>
            </div>
        )
    }
}
