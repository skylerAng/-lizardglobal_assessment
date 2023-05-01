import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Categories from './categories/Categories';
import Navbar from "./navbar/Navbar";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import "../styles/style.scss";
import { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../context/darkModeContext";

function App() {
  const [data, setData]=useState([]);
  const [visible, setVisible]=useState(5);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const uniqueCategories = new Set();
  
  const handleSetVisible = (newValue) => {

    setVisible(newValue);
  }
  
  const handleCategoryChange = (newValue) => {

    setSelectedCategory(newValue);
    console.log('argument from MultiSelect: ', newValue);
    console.log('Saved category: ', selectedCategory);
  };

  const getData = (filter = null) => {
      //const response = await fetch (`/api/posts`);
      //const data = await response.json();
      fetch('/api/posts')
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        // Filter data based on selected categories
        if(filter.length !== 0){
          const categoryNames = filter.map((item) => {
              console.log(item.value);
              uniqueCategories.add(item.value);
              return item.value;
          })
          const filteredData = jsonData.posts.filter((item) => {
            return Array.from(uniqueCategories).every((categoryName) => {
              return item.categories.some((category) => category.name === categoryName);
            });
          });
          setData(filteredData);

        }else{
          setData(jsonData.posts);
        }
      
        // const filteredData = jsonData.posts.filter((post) =>
        //   selectedCategory.includes(post.category)
        // );
        // setData(jsonData.posts);
    
      })
      .catch((err) => console.log(err));

  }
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    getData(selectedCategory);
  }, [selectedCategory]);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar 
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange} 
        />
        <div style={{ display: "flex" }}>
       
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
   
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout />
      ),
      children: [
        {
          path: "/",
          element: <Home 
            visible={visible} 
            handleSetVisible={handleSetVisible} 
            category={selectedCategory}
            data={data}
            />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );

}

export default App;
