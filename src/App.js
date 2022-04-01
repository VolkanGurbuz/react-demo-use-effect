import React, {useState, useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./store/auth-context";

function App() {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (storedUserLoggedInfo === '1') {
            setIsLoggedIn(true);
        }
    }, [])

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        //1 login 0 not logged, we store the data
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    //the new context object will be passed down to all listening(consuming) components
    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn,}}>
            <MainHeader onLogout={logoutHandler}/>
            <main>
                {!isLoggedIn && <Login onLogin={loginHandler}/>}
                {isLoggedIn && <Home onLogout={logoutHandler}/>}
            </main>
        </AuthContext.Provider>
    );
}

export default App;
