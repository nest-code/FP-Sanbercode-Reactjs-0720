import React from 'react';

const NotFound404 = () => {
    const style = {
        position: "relative",
        transform: "translateY(-50%)",
        top: "40%"
    }

    return (
        <>
            <section>
                <div style={style}>
                    <h1> 404 </h1>
                    <h2> Page not found </h2>
                </div>
            </section>
        </>
    )
}

export default NotFound404
