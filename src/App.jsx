import react from "react";
import './App.css'
import PhotoGallery from "./components/photoGallery.jsx";
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

