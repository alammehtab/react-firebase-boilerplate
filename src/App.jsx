import React, { useEffect, useState } from "react";
import { db } from "./config/firebase";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  addDoc,
} from "firebase/firestore";

const App = () => {
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [users, setUsers] = useState([]);
  const usersCollection = collection(db, "users");

  useEffect(() => {
    getUsers();
  }, [users]);

  const setUser = async () => {
    await addDoc(usersCollection, { name: name, number: number });
    setName("");
    setNumber("");
  };

  const getUsers = async () => {
    const first = query(collection(db, "users"), orderBy("name"), limit(3));
    const data = await getDocs(first);
    let users = [];
    data.docs.map((doc) => {
      users.push(doc.data());
    });
    setUsers(users);
  };
  return (
    <div>
      <input
        placeholder="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder="number"
        value={number}
        onChange={(event) => setNumber(event.target.value)}
      />
      <button onClick={setUser}>Register</button>
      {users.map((user, index) => (
        <p key={index}>{user.name}</p>
      ))}
    </div>
  );
};

export default App;
