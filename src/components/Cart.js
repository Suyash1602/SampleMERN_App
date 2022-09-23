import React from 'react'
import { useSelector } from 'react-redux'

function Cart(props) {
    let { selectedProducts } = useSelector(state => state.cart);
    { console.log(selectedProducts.length) }
    return (
        <>
            <h1 className="text-center bg-primary p-3 text-white ">Cart page</h1>
            <div className="container">
                {
                    (selectedProducts.length == 0) ? <>
                        <h3 className="bg-warning p-2 w-50 text-center rounded mx-auto">The cart is empty!!</h3>
                    </> : <>
                        <div>
                            <h3 className="bg-warning p-2 w-50 text-center rounded mx-auto">Your Products</h3>
                            <table className='table table-stripped  my-3'>
                                <thead className='bg-white text-dark fw-bold'>
                                    <tr>
                                        <th>Products</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedProducts.map((obj, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{obj.name}</td>
                                                    <td>{obj.price}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default Cart