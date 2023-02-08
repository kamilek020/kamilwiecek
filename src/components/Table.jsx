import React from 'react';
import $ from 'jquery';

function Table() {
    return (
        <div className="Table">
            <h1 className="text-2xl">Godziny zarejestrowane:</h1>
            <div className="TableWithDate mt-20 flex justify-center flex-wrap">
                <button type="button" className="btn button">08.02.2023</button>
                <div className="ShowMoreInformation hidden">
                    <p>Godzina zaczęcia: 10:00</p>
                    <p>Godzina zakończenia: 15:00</p>
                </div>
                <button type="button" className="btn button">07.02.2023</button>
                <button type="button" className="btn button">06.02.2023</button>
                <button type="button" className="btn button">05.02.2023</button>
                <button type="button" className="btn button">04.02.2023</button>
                <button type="button" className="btn button">03.02.2023</button>
                <button type="button" className="btn button">02.02.2023</button>
                <button type="button" className="btn button">01.02.2023</button>
            </div>
        </div>
    )
}
$(document).ready(function() {
    $('.button').on('click', function () {
        $('.ShowMoreInformation').toggle();
    });
});

export default Table;