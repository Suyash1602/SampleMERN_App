import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProducts } from '../../store/slices/cartSlice'


function Products() {

    const dispatch = useDispatch();
    let { selectedProducts } = useSelector(state => state.cart);

    let addProduct = (product) => {
        let actionObj = addProducts(product);
        console.log(actionObj);
        dispatch(actionObj);
    }


    // let [cart, setCart] = useState([])

    let [products, setProducts] = useState([])

    let productsData = async () => {
        let res = await axios.get('/product/getProducts')
        setProducts(res.data.payload)
        // console.log(res.data.payload)
    }
    useEffect(() => {
        productsData();
        // console.log(products)
    }, [])

    // let addToCart = (newItem) => {
    //     setCart([...cart, newItem])
    // }
    // console.log(cart)


    return (
        <>
            <h1 className="text-center bg-primary p-3 text-white ">Products page</h1>
            <div className="container">
                <h3 className="bg-warning w-25 p-2 text-center rounded mx-auto">All Products</h3>

                <div className='container row bg-light text-center shadow-lg rounded text-dark fw-bold p-4'>
                    {products?.map((obj, i) => {
                        return (<div class="col-sm-4 my-3">
                            <div class="card " key={i}>
                                <div class="card-body">
                                    <h5 class="card-title display-5 fw-bold">{obj.name}</h5>
                                    <p class="card-text fw-semibold"> <span className='fw-bold text-success' >Price : </span>{obj.price}</p>
                                    {/* <button className='btn btn-warning'>Add to Cart</button> */}
                                    <button onClick={() => addProduct(obj)} className='btn btn-warning'>Add to Cart</button>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        </>
    )
}

export default Products