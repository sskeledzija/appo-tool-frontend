import React, { useState } from 'react';
//import './../App.css';
import { withRouter } from 'react-router-dom'


export const AppHeader = withRouter(({history}) => {

    const [search, setSearchText] = useState({searchType: '', searchText: ''})
    
    const handleLogout = e => {
        history.push('/logout')
    }

    const handleSearch = e => {
            console.log('#######' + e.target.value)
            const target = e.target.value
            setSearchText({...search, searchText: target})
        if (target.length > 2) {
            // search
            console.log('Searching for "' + target + '"...')
            history.push('/search/'+search.searchText)
        }
    }

    const startSearch = () => {
        
        history.push('/search/'+search.searchText)
    }

    return (
       <div style={{  textAlign: 'left', fontSize: 25, maxHeight: 100, backgroundColor: '#1F4B8C '}} /* className="App" */>
           <a href="/" style={{float: 'left', color: 'white', cursor: 'pointer'}}>My Appo Tool</a>
            <div style= {{display: 'flex !important', overflow: 'hidden'}} >
                <div style={{float: 'right'}}>
                    <input style={{margin: '3px',   height: '2.5rem', boxSizing: 'border-box', textAlign: 'start', padding: '.35rem', fontWeight: 400, border: '1px solid #ced4da', borderRadius: '.25rem'}}
                    onChange={handleSearch}
                    ></input>
                    <button onClick={startSearch} style={{margin: '3px',   borderRadius: '.25rem', fontSize: '1.5rem', border: '1px solid #ced4da'}} >Search</button>
                    <button onClick={handleLogout}  style={{margin: '3px',   borderRadius: '.25rem', fontSize: '1.0rem', border: '1px solid #ced4da'}} >logout</button>
                </div>
            </div>
            
      </div>
    );
  }
)
  export default AppHeader
