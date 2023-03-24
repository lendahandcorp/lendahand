import React from 'react';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Profile from './components/Profile';
import PostDetails from './components/PostDetails';
import PostCreate from './components/PostCreate';
<<<<<<< HEAD
import ProtectedRoutes from './components/ProtectedRoutes';
=======
import ProtectedRoutes from './components/ProtectedRoutes';
import PostEdit from './components/PostEdit';
>>>>>>> TAP-28-postpage
import './css/app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import authService from './services/authService';



const App = () => {

  // For reloading navbar
  // const [authUser, setAuthUser] = useState(authService.isAuthenticated())
 
  // const updateNav = () => {
  //   setAuthUser(authService.isAuthenticated())
  //}

    return (
      <React.Fragment>
        <BrowserRouter>

          {/* Include navbar here */}
          {/* <NavBar authUser={authUser} updateNav={updateNav}/> */}
          <Header/>
          <div id="main-content">
          <Routes>
              
              {/* This is the homepage */}
              {/* <Route path='/' element={<Main />}/> */}
              <Route path='/' element={<Home />}/>
              
              {/* This is the About us Page */}
              <Route path='/about' element={<About />}/>

              {/* This is the navbar */}
              {/* <Route path='/signin' element={<SignIn updateNav={updateNav}/> }/> */}
              
              {/* Raw signin page, to be removed */}
              <Route path='/signin' element={<SignIn />}/>

              <Route element={<ProtectedRoutes />}>
                <Route path='/profile/:UserId' element={<Profile />}/>
              </Route>
              

              <Route path='/postdetails/:id' element={<PostDetails />}/>
              <Route path='/postedit/:id' element={<PostEdit />}/>
              <Route path='/postcreate' element={<PostCreate />}/>


              {/* routes that require token */}
              {/* <Route element={<ProtectedRoutes/>}>
                <Route path='/create' element={<CreatePokemon />}/>
                <Route path='/update/:id' element={<EditPokemon />}/>
              </Route> */}

              <Route path='/register' element={<Register />}/>
              <Route path='*' element={<NotFound />}/>
            </Routes>
          </div>
          <Footer/>
          {/* Footer goes here */}
          {/* <Footer /> */}
        </BrowserRouter>
      </React.Fragment>
    )
  }
  const NotFound = () =>{
    return (
      <div className="container text-center">
          <h1>Page Not Found !</h1>
          <h2>You may have entered the wrong url or clicked on a broken link.</h2>
      </div>
    )
}

export default App;
