import react from "react";
import './App.css'
import PhotoGallery from "./components/photoGallery.jsx";
import ImportantInfoSection from "./components/ImportantInfoSection.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/header.jsx";

function App() {

  return (
    <div className="App">
        <Header></Header>
        <PhotoGallery />
        <div className="mt-10">
            {/*<ContactForm */}
        </div>
        <ImportantInfoSection />
        <Footer/>
    </div>
  )
}

export default App

