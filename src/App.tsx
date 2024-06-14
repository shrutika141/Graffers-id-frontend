import React from 'react';
import { Routing } from './routes/index.tsx';
import { Header } from './views/Header/index.tsx';
import "./App.scss"

const App = () => {
  return (
    <>
      <Header />
      <Routing />
    </>
  )
}

export default App