import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from './Form';


function MyApp() {
  const [characters, setCharacters] = useState([]); 
  
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then((res) => {if(res.status !== 201){Promise.reject(res.status)}
          else{res.json();}
        })
      .then((json) => setCharacters([...characters, json]))
      .catch((error) => {
        console.log(error);
      })
  }

  // function del(index) { 
  //   removeOneCharacter(index)
  //     .then((res) => {if(res.status !== 204){Promise.reject(res.status)}})
  //     .then((json) => setCharacters([...characters, json]))
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  function removeOneCharacter (index) {
    // const promise = fetch("Http://localhost:8000/users", {
    //   method: "DELETE"})
      
    const updated = characters.filter((character, i) => {
        return i !== index
    });
    setCharacters(updated);

    // return promise;
	}

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  
  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}


export default MyApp;