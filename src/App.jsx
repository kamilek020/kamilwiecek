import react from "react";
import './App.css'
import Gallery from "./components/gallery/gallery.jsx";
import ImportantInfoSection from "./components/infoSection/importantInfoSection.jsx";
import Footer from "./components/footer/footer.jsx";
import Header from "./components/header/header.jsx";


function App() {

  return (
    <div className="App">
        <Header />
        <Gallery />
        <div className="mt-10">
        </div>
        <ImportantInfoSection />
        <Footer/>
    </div>
  )
}

export default App

