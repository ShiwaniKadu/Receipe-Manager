import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateReceipe from './pages/CreateReceipe';
import DeleteReceipe from './pages/DeleteReceipe';
import EditReceipe from './pages/EditReceipe';
import ShowReceipe from './pages/ShowReceipe';

const App = () =>{
  return ( 
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/receipe/create' element={<CreateReceipe/>}/>
      <Route path='/receipe/edit/:id' element={<EditReceipe/>}/>
      <Route path='/receipe/delete/:id' element={<DeleteReceipe/>}/>
      <Route path='/receipe/details/:id' element={<ShowReceipe/>}/>

    </Routes>)
}

export default App