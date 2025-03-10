import React, { useEffect } from 'react';
import { useState } from 'react';
import { getStockPrices } from './api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; 

const StockChart = ({symbol}) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStockPrices(symbol);
            if (data && data["Time Series (Daily)"]) {
                const key = data["Time Series (Daily)"];

                const formattedData = Object.keys(key).map(date => ({
                    date,
                    open: parseFloat(key[date]["1. open"]),
                    high: parseFloat(key[date]["2. high"]),
                    low: parseFloat(key[date]["3. low"]),
                    close: parseFloat(key[date]["4. close"]),
                    volume: parseInt(key[date]["5. volume"], 10),
                }));
                formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));
                setChartData(formattedData);
            } else {
                setError(true);
            }
            setLoading(false);
        };
        fetchData();
    }, [symbol]);

    if (loading) {
        return <p>Loading data for {symbol}...</p>;        
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div>
            <h2>{symbol} Stock Price Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
    <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(date) => date.substring(5)} />
        <YAxis domain={['dataMin', 'dataMax']} />
        <YAxis yAxisId="right" orientation="right" />

        <Tooltip />
        <Line type="monotone" dataKey="open" stroke="#ff7300" dot={false} />
        <Line type="monotone" dataKey="high" stroke="#00c49f" dot={false} />
        <Line type="monotone" dataKey="low" stroke="#ff0000" dot={false} />
        <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
        <Line
            type="monotone"
            dataKey="volume"
            stroke="#888888"
            dot={false}
            yAxisId="right"
        />
    </LineChart>
</ResponsiveContainer>

        </div>
    );
};

export default StockChart;