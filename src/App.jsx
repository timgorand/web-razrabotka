import { useState, useEffect } from 'react';
import './App.css';
import ToDoForm from "./AddTask";
import ToDo from "./Task";
import axios from 'axios';

const STORAGE_KEY = 'finance_todos_data';

function App() {
  const [gold_price, get_gold_price] = useState('Загрузка, подождите...');
  const [eth_price, get_eth_price] = useState('Загрузка последней цены...');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
       try {
        const res = await axios.get('https://api.gold-api.com/price/XAU/USD');
        get_gold_price(`$${res.data.price}`);
      } catch (err) {
        get_gold_price('Ошибка данных.');
      }
      try {
      const crypt = await axios.get('https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=Ethereum');
      get_eth_price(`$${crypt.data.ethereum.usd}`);
      } catch (err) {
      	get_eth_price('Ошибка данных, нет связи с сервером.');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setTodos(parsed);
      } catch (e) {
        setTodos([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTask = (text) => {
    if (text.trim()) {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        task: text,
        complete: false
      };
      setTodos([...todos, newTask]);
    }
  };

  const removeTask = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, complete: !t.complete } : t
      )
    );
  };

  return (
    <div className="App">
      <div className='dashboard'>
        <div className='widget w_metal'>
          <h3>Курс золота 999 пробы</h3>
			<p>{gold_price}</p>
        </div>
          <div className="widget w_crypt">
            <h3>Курс эфириума (ETH)</h3>
			<p>{eth_price}</p>
          </div>
      </div>
      
      <header>
        <h1>Финансовые задачи: {todos.length}</h1>
      </header>
      <ToDoForm addTask={addTask} />
      {todos.map((todo) => (
        <ToDo
          todo={todo}
          key={todo.id}
          toggleTask={handleToggle}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
}

