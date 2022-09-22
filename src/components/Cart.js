import React from 'react'

function Cart(props) {
    return (
        <>
            <h1 className="text-center bg-primary p-3 text-white ">Cart page</h1>
            <div className="container">
                {
                    props.length <= 0 ? <h3 className="bg-warning w-25 text-center rounded mx-auto">Your Cart is empty !</h3> : <h3 className="bg-warning w-25 text-center rounded mx-auto">Your Cart has {props.length} product!</h3>
                }

            </div>
        </>
    )
}

export default Cart