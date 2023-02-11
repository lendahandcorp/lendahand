import React, {useState, useEffect} from 'react';
import SignIn from './components/SignIn';
import Register from './components/Register';
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

          <div id="main-content">
          <Routes>
              
              {/* This is the homepage */}
              {/* <Route path='/' element={<Main />}/> */}

              {/* This is the navbar */}
              {/* <Route path='/signin' element={<SignIn updateNav={updateNav}/> }/> */}
              
              {/* Raw signin page, to be removed */}
              <Route path='/signin' element={<SignIn />}/>

              {/* routes that require token */}
              {/* <Route element={<ProtectedRoutes/>}>
                <Route path='/create' element={<CreatePokemon />}/>
                <Route path='/update/:id' element={<EditPokemon />}/>
              </Route> */}

              <Route path='/register' element={<Register />}/>
              <Route path='*' element={<NotFound />}/>
            </Routes>
          </div>
          {/* Footer goes here */}
          {/* <Footer /> */}
        </BrowserRouter>
      </React.Fragment>
    )
}
const NotFound = () =>{
  return <h1>Not Found</h1>
}

export default App;
