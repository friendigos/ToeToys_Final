import React from 'react'
import "./Quote.css"

const Quote = () => {
    return (
        <>
            <div className="ParallaxVideo">
                <video autoPlay muted loop>
                    <source
                    src="/video/para.mp4"
                    type="video/mp4"
                    />
                </video>
            </div>
        </>
    )
}

export default Quote