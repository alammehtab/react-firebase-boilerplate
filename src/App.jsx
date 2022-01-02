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
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  const [lastDocState, setLastDocState] = useState();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const usersCollection = collection(db, "users");

  useEffect(() => {
    getUsers();
  }, []);

  const setUser = async () => {
    await addDoc(usersCollection, { name: name, number: number });
    setName("");
    setNumber("");
  };

  // query the first page of docs
  const getUsers = async () => {
    // first query for getting first batch
    const firstBatch = query(
      collection(db, "users"),
      orderBy("name"),
      limit(3)
    );
    const data = await getDocs(firstBatch);
    const users = data.docs.map((doc) => doc.data());

    // Get the last visible document
    const lastDoc = data.docs[data.docs.length - 1];

    setListOfUsers(users);
    setLastDocState(lastDoc);
  };

  const getMore = async () => {
    setLoading(true);
    // Construct a new query starting at this document,
    // get the next 3 users.
    const next = query(
      collection(db, "users"),
      orderBy("name"),
      startAfter(lastDocState),
      limit(3)
    );
    const data = await getDocs(next);
    const isListEmpty = data.size === 0;

    if (!isListEmpty) {
      const users = data.docs.map((doc) => doc.data());
      // Get the last visible document
      const lastDoc = data.docs[data.docs.length - 1];

      setListOfUsers([...listOfUsers, ...users]);
      setLastDocState(lastDoc);
    } else {
      setIsEmpty(true);
    }
    // in both cases it should be false
    setLoading(false);
  };

  // if the users are not fetching or zero users in firestore
  if (listOfUsers.length === 0) {
    return <h1>Loading...</h1>;
  }

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
      {listOfUsers.map((user, index) => (
        <p key={index}>{user.name}</p>
      ))}
      {loading && <h1>Loading...</h1>}
      {!loading && !isEmpty && <button onClick={getMore}>Get More</button>}
      {isEmpty && <h1>There is no more data to be loaded!</h1>}
    </div>
  );
};

export default App;
