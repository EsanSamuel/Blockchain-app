import React from "react"


import { Navbar, Footer, Loader, Services, Transactions, Welcome } from "./components"


const App = () => {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />

    </div>
  )
}

export default App
