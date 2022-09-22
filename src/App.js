import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom'
// importing routes
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile/UserProfile';
import Products from './components/products/Products'
import Cart from './components/Cart'
import { useSelector, useDispatch } from 'react-redux'
import { clearState } from './store/slices/userLoginSlice';

function App() {

  let { isSuccess } = useSelector(
    (state) => state.userLogin
  );
  let dispatch = useDispatch();
  const userLogOut = () => {
    // remove token from local storage
    localStorage.removeItem("token")
    // reset userslice
    let actionObj = clearState();
    dispatch(actionObj)

  }


  return (
    <>
      <div className='d-flex flex-column min-vh-100'>


        {/* Navigation bar */}
        <nav className="navbar navbar-expand bg-dark navbar-dark">
          <div className="container-fluid">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfgTS3DanyDhzb8V6bnpZivIsRxKWzf-Q1Q&usqp=CAU" width="90px" alt="logo" />
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                {isSuccess ? <>
                  <li className="nav-item px-3">
                    <NavLink className="nav-link fw-bold" aria-current="page" to="/products">Products</NavLink>
                  </li>
                  <li className="nav-item px-3">
                    <NavLink className="nav-link fw-bold" aria-current="page" to="/cart">Cart</NavLink>
                  </li>
                  <li className="nav-item px-3">
                    <NavLink onClick={userLogOut} className="nav-link fw-bold" aria-current="page" to="/signin">Sign Out</NavLink>
                  </li>
                </> :
                  <>


                    {/* link for home */}
                    < li className="nav-item px-3">
                      <NavLink className="nav-link fw-bold" aria-current="page" to="/">Home</NavLink>
                    </li>

                    {/* link for SignIn */}
                    <li className="nav-item px-3">
                      <NavLink className="nav-link fw-bold" aria-current="page" to="/signin">SignIn</NavLink>
                    </li>



                    {/* link for SignUp */}
                    <li className="nav-item px-3">
                      <NavLink className="nav-link fw-bold" aria-current="page" to="/signup">SignUp</NavLink>
                    </li>

                    {/* link for About */}
                    <li className="nav-item px-3">
                      <NavLink className="nav-link fw-bold" aria-current="page" to="/about">About</NavLink>
                    </li>
                  </>

                }
              </ul>
            </div>
          </div>
        </nav>


        {/* Creating routes */}
        <Routes>
          {/* Creating route for home */}
          <Route path='/' element={<Home />} />
          {/* Creating route for about */}
          <Route path='/about' element={<About />} />
          {/* Creating route for signin */}
          <Route path='/signin' element={<SignIn />} />
          {/* Creating route for signup */}
          <Route path='/signup' element={<SignUp />} />
          {/* Creating route for userprofile */}
          <Route path='/userprofile/:username' element={<UserProfile />} />
          {/* Creatrin route for products */}
          <Route path='/products' element={<Products />} />
          {/* Creatrin route for cart */}
          <Route path='/cart' element={<Cart />} />
        </Routes>

        {/* footer */}
        <footer className="mt-auto">

          {/* <!-- Copyright --> */}
          <div className="footer-copyright text-center py-3 bg-primary text-white">
            2022 © Suyash
          </div>
          {/* <!-- Copyright --> */}

        </footer>
      </div >

    </>
  );
}

export default App;
