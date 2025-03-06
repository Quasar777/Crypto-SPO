import React, { useEffect, useState } from 'react';

function App() {
    const [cryptoAssets, setCryptoAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8054/api/user')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                return response.json(); // Парсим JSON
            })
            .then((data) => {
                setCryptoAssets(data.cryptoAssets);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div className="App">
            <h1>Криптоактивы</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoAssets.map((asset) => (
                        <tr key={asset.id}>
                            <td>{asset.id}</td>
                            <td>{asset.amount}</td>
                            <td>${asset.price.toLocaleString()}</td>
                            <td>{new Date(asset.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;