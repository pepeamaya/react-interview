import "./styles.css";
import { useEffect, useState } from "react";

// https://randomuser.me/api

export default function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  function getName({ name }) {
    return `${name.title} ${name.first} ${name.last}`;
  }

  function getImage({ picture }) {
    return `${picture.large}`;
  }

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://randomuser.me/api/?page=${pageNumber}&results=1`
      );
      const data = await res.json();
      const userStorage = [...users, ...data.results];
      setUsers(userStorage);
      console.log("data", userStorage);
      console.log("page", data.info.page);
      setPageNumber(data.info.page + 1);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="App">
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increase counter</button>
      <button onClick={fetchData}>Reload</button>
      <div style={{ paddingTop: "1rem" }}>
        {users.map((info, index) => (
          <div key={index}>
            <img src={getImage(info)} alt="user" />
            <h1>Name: {getName(info)}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
