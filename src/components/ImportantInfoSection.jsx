import React from 'react';

const ImportantInfoSection = () => {
    return (
        <section className="bg-gray-200 py-8">
            <div className="max-w-4xl mx-auto px-4 py-4">
                <h2 className="text-3xl font-semibold mb-4">Najważniejsze informacje dotyczące zamówień!</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2">Godziny otwarcia</h3>
                        <p>Poniedziałek - Piątek: 12:00 - 22:00</p>
                        <p>Sobota: zamówienia niedostępne</p>
                        <p>Niedziela: zamówienia niedostępne</p>
                        <p><strong>Zamówienia złożone do godziny 16:00 wysyłane są tego samego dnia!</strong></p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2">Wysyłka dostępna:</h3>
                        <p>- za pobraniem</p>
                        <p>- przedpłata</p>
                        <p><strong>UWAGA! Gdy zamówienie przekroczy wartość 1000zł, kwota wysyłki jest w cenie !</strong></p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2">Kontakt</h3>
                        <p>Telefon: 731-605-012</p>
                        <p>Email: kamil.wiecek.02@icloud.com</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2">Ważne informacje</h3>
                        <p>Wystawiamy fakturę VAT</p>
                        <p>Podane ceny są cenami NETTO</p>
                        <p>Gwarancja na 6 miesięcy</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImportantInfoSection;