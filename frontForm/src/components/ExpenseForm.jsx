import React from "react";
import { useState } from "react";
import styles from './ExpenseForm.module.css'

const ExpenseForm = () => {
    const [form, setForm] = useState(
        {
            dateTime: '',
            sum: '',
            category: '',
            comment: '',
        }
    );

    const [error, setError] = useState('');
    const categories = ['Food', 'Taxi', 'Shopping'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(form);
        if (form.sum <= 0) {
        setError("Суммa должна быть больше 0")
        return; 
    }

    try {
        setError('');
        const response = await fetch('http://localhost:5000/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            const newTransaction = await response.json();
            setForm({
                dateTime: '',
                sum: '',
                category: '',
                comment: '',
            });
            alert('Транзакция добавлена');
            console.log(newTransaction);
        } else {
            setError('Ошибка при добавлении');
        }
    } catch (error) {
        setError('Ошибка при соединении с сервером');
    }
};
    
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && <p className={styles.error}>{error}</p>}
            <label className={styles.label}>
                Date:
                <input type="datetime-local" name="dateTime" value={form.dateTime} onChange={handleChange} className={styles.input} required />
            </label>

            <label className={styles.label}>
                Sum:
                <input type="number" name="sum" value={form.sum} onChange={handleChange} className={styles.input} required />
            </label>

            <label className={styles.label}>
                Category:
                <select name="category" value={form.category} onChange={handleChange} className={styles.select} required>
                    <option value="">Select category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </label >

            <label className={styles.label}>
                Comment:
                <input type="text" name="comment" value={form.comment} onChange={handleChange} className={styles.input} required />
            </label>
            <button className={styles.button}>Добавить расходы</button>
    </form>
);
};

export default ExpenseForm;

