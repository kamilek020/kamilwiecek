import { useState } from "react";
import './App.css'
import Header from './components/header.jsx'
import PhotoGallery from "./components/photoGallery.jsx";
import ContactForm from "./components/ContactForm.jsx";
import ImportantInfoSection from "./components/ImportantInfoSection.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  return (
    <div className="App">
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

