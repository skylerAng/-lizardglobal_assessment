import React from 'react';
import { useState, useEffect } from 'react';

const App = () => {
  const [data, setData]=useState([]);
  debugger;
  const getData = () => {
      //const response = await fetch (`/api/posts`);
      //const data = await response.json();
      fetch('/api/posts')
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        debugger;
        setData(jsonData);
        debugger;
        // setPosts(json.posts.slice(0, next));
        // setOriginalPosts(json.posts);
      })
      .catch((err) => console.log(err));

  }
  useEffect(() => {
    getData();
   
  }, []);

  return <div>{
    /* Complete the exercise here. */
    <div className="App">
    {
        data ?.length > 0
        ? (
            <div className="container">
                {data.map((item)=>(
                
                    <p>{item.about}</p>
                ))}
            </div>
        ) : 
        (
            <div className='empty'>
                <h2>No data found</h2>
            </div>
        )
    }
    </div>
  
  }</div>;
}

export default App;
