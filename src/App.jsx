// import { useState } from 'react'
// import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

// import './App.css'
// import Header from './components/Header/Header'

// function App() {
  

//   return (
//     <>
    
//     </>
//   )
// }

// export default App








import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import './App.css'
import Header from './components/Header/Header'

const API_BASE = 'https://loyalty-backend-java.onrender.com/api/auth';

function App() {

  //Keep server awake
  useEffect(() => {
    const keepAlive = () => {
      fetch(`${API_BASE}/health`, { 
        method: 'GET',
        credentials: 'include'
      }).catch(() => {
      });
    };

    keepAlive();

    // Then every 14 minutes (Render sleeps after ~15 mins inactivity)
    const interval = setInterval(keepAlive, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    
    </>
  )
}

export default App
