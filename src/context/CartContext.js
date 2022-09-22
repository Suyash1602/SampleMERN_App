import React from 'react'
import { useState } from 'react'

//create cartContext 
export let cartContext = React.createContext()

function addToCartContextProvider(props) {
    let [cart, setCart] = useState([])

    let addToCart = (newItem) => {
        setCart([...cart, newItem])
    }

    return (
        <cartContext.Provider value={{ cart, addToCart }}>
            {props.children}
        </cartContext.Provider>
    )
}

export default addToCartContextProvider