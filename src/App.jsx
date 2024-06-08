import React, { useState }  from 'react';
import Navbar from './components/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';


const App = () => {

  const [sidebar,setSidebar]= useState(true);
  
  return (
    <div>
      <Navbar setSidebar = {setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar = {sidebar} />} />
        <Route path= '/video/:categoryId/:videoId' element = {<Video/>} />

        
      </Routes>
      <Video/>
     
    </div>
  );
}

export default App;
// import React from "react";
// import Video from "./Pages/Video/Video";

// const App=()=>{
// return (<>
// <Video/>
// </>)
// }
// export default App;
