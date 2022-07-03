import './App.css';
import React from 'react'
import Home  from './pages/HomePages/Home';
import Movie  from './pages/MoviePages/Movie';
import Trending from './pages/Trendingpages/Trending';
import TVSeries from './pages/TVSeriesPages/TvSeries';
import Search from './pages/search';
import {BrowserRouter , Route , Routes , Outlet} from "react-router-dom"
import './pages/HomePages/Home.css'
import Container from '@material-ui/core/Container';
import Navbar from "./Components/Navbar";
import AppsIcon from "@material-ui/icons/Apps";

function App() {
  const [toggleNavbar,setToggleNavbar] = React.useState(false)

    const icon = <AppsIcon 
                className="navbar--logo" 
                onClick={()=>{
                    console.log("yex")
                    setToggleNavbar(!toggleNavbar)
                }}
                />
  return (
    <>
      <div className="header">
            🎥 Entertainment Hub 📷
        </div>
      <BrowserRouter>
      {icon}
      {toggleNavbar ? <Navbar/> : ""}
      <div className='route-container '>
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/movie' element={<Movie/>}/>
          <Route path='/tvseries' element={<TVSeries/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
        </div>
      </BrowserRouter>
      {/* <Home/> */}
    </>
  );
}

export default App;
