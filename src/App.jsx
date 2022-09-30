import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Router, Routes } from 'react-router-dom'
import UserInput from './components/UserInput'
import Character from './components/Character'
import CharacterDetail from './components/CharacterDetail'
import ProtectedRoutes from './components/ProtectedRoutes'
import Loading from './components/Loading'
import { setIsLoading } from './store/slices/isLoading.slice'


function App() {
  
  return ( 
    <HashRouter>
      <div className='App'>
        <Loading />
        <div className='ball-background'></div>
          <Routes> 
            <Route path='/' element={<UserInput />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/character' element={<Character />} />
              <Route path='/characterDetail/:id' element={<CharacterDetail />} />
            </Route>
          </Routes>
      </div>
    </HashRouter>
  )
}

export default App
