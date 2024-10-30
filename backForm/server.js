const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let transactions = []; // временное хранилище для данных

// Порт сервера
const PORT = 5000;

// Маршрут для получения всех транзакций
app.get('/api/transactions', (req, res) => {
    res.json(transactions);
});

// Маршрут для добавления новой транзакции
app.post('/api/transactions', (req, res) => {
    const transaction = { id: Date.now(), ...req.body };
    transactions.push(transaction);
    res.status(201).json(transaction);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
