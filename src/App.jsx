import React, { useEffect, useState } from "react";
import { db } from "./config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const App = () => {
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [users, setUsers] = useState([]);
  const usersCollection = collection(db, "users");
  const patientsCollections = collection(db, "patients");

  useEffect(() => {
    getUsers();
  }, []);

  const setUser = async () => {
    await addDoc(usersCollection, { name: name, number: number });
    alert("User Added");
  };

  const setPatient = async () => {
    await addDoc(patientsCollections, { name: name, number: number });
    console.log("patient added");
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollection);
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
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder="number"
        onChange={(event) => setNumber(event.target.value)}
      />
      <button onClick={setUser}>Register</button>
      <button onClick={setPatient}>Add Patient</button>
      {users.map((user, index) => (
        <p key={index}>{user.name}</p>
      ))}
    </div>
  );
};

export default App;
