import React from 'react';

class TimeNow extends React.Component {
    state={
        curDT : new Date().toLocaleString(),
    }
    render(){
        return (
            <div className="App">
                <p className="text-xl pt-5">Dziś jest: {this.state.curDT}</p>
                <button type="button" className="btn button">Zarejestruj czas wejścia</button>
                <button type="button" className="btn button">Zarejestruj czas wyjścia</button>
            </div>
        );
    }
}

export default TimeNow;