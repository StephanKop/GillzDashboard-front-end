import React from 'react';
import './App.scss';
import {Sidebar} from './components/comp_sidebar';
import Header from './components/comp_header';

function App() {
  return (
        <div className="main">
            <div>
                {/*<Header/>*/}
                <Sidebar/>
            </div>
        </div>
  );
}

export default App;
