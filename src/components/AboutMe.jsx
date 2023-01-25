import { useState } from 'react'


function AboutMe() {
    const [count, setCount] = useState(0)

    return (
        <div className="AboutMe">
            <h5>Cześć, nazywam się</h5>
            <h1>Kamil Więcek</h1>
            <h6>React / Tailwind CSS / Vite</h6>
        </div>
    )
}

export default AboutMe
