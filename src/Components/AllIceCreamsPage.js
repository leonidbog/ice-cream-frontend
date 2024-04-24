import React, {useEffect, useState} from "react";

const AllIceCreamsPage = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        // Функция для загрузки списка товаров с сервера
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:8080/allIcecreams');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error(error);
            }
        };

        // Вызываем функцию загрузки списка товаров при монтировании компонента
        fetchItems();
    }, []);

    return (
        <div>
            <h1>ALL ICECREAMS</h1>
            <ul>
                {
                    items.map((item, index) => (
                        <li key={index}>
                            <h3>{item.name}</h3>
                            <p>{item.brand}</p>
                            <p>{item.type}</p>
                            <p>{item.price}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default AllIceCreamsPage;