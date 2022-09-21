import React from 'react'

function Home() {
    return (
        <>
            {/* title of the page */}
            <h1 className="text-center bg-primary p-3 text-white">Home page</h1>
            <div className="container-fluid bg-dark text-white mb-2">
                {/* middle body content */}


                <div className="row">
                    <div className="col-xl-6 text-center p-3">
                        <img src="https://w0.peakpx.com/wallpaper/840/897/HD-wallpaper-garage-rally-car-ecoboost-2016-ford-fiesta-ford.jpg" alt="" />
                    </div>
                    <div className="col-xl-6 text-center p-3">
                        <h1 className="text-center text-info">This is home of our website</h1>
                        <p className="text-white p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo molestias voluptates error blanditiis nulla provident eius commodi, nesciunt eveniet magnam harum, placeat quas ducimus earum fugiat, id veritatis nihil sit.</p>

                        <h3 className="text-center text-info">Some information about page</h3>
                        <p className="text-white display-6 text-info p-5">We don't pray for love. We just pray for cars.</p>
                    </div>
                </div>
                {/* closure */}
                <div className="container">
                    <p className="display-3 text-warning ">This page is all about cars all u find in this page is cars cars and cars. </p>
                </div>
            </div>
        </>
    )
}

export default Home