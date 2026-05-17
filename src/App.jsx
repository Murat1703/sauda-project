import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { HomePage } from './pages/HomePage'
import { FavoritesPage } from './pages/Account/FavoritesPage'
import { AuthProvider } from './auth/AuthProvider'
import { useAuth } from './hooks/useAuth.js'
import { CartPage } from './pages/Account/CartPage'
import { AuthModalProvider } from './auth/AuthModalProvider/AuthModalProvider.jsx'
import { AccountLayout } from './components/AccountLayout'
import { OrdersPage } from './pages/Account/OrdersPage'
import { OrderPage } from './pages/Account/OrdersPage'
import { ReviewsPage } from './pages/Account/ReviewsPage'
import { AccountDetailsPage } from './pages/Account/AccountDetailsPage'
import { useAuthModal } from './hooks/useAuthModal.js'
import { ToastContainer } from 'react-toastify';



const ProtectedRoutes = () =>{
  const { openAuthModal } = useAuthModal();
  const location = useLocation();
  const {isAuth} = useAuth();

  useEffect(() => {
    if (!isAuth) {
      openAuthModal();
    }
  }, [isAuth]);


  return isAuth ? <Outlet />: <Navigate to={'/'} />;  
}

function App() {

  return (
    <>
    <AuthProvider>
      <AuthModalProvider>
        <BrowserRouter>
          <Routes >
            <Route element={<MainLayout/>}>
              <Route path='/' element={<HomePage />}/>
              <Route element={<AccountLayout />}>
                <Route path="/account/favorites" element={<FavoritesPage />} />
              </Route>

              <Route path='/cart' element={<CartPage />}/>
              <Route element={<ProtectedRoutes />}>

                <Route element={<AccountLayout />} >
                  <Route path='/account/orders' element={<OrdersPage />}/>
                  <Route path={`/account/orders/:id`} element={<OrderPage />}/>
                  <Route path='/account/favorites' element={<FavoritesPage />}/>
                  <Route path='/account/reviews' element={<ReviewsPage />}/>
                  <Route path='/account/profile' element={<AccountDetailsPage />}/>
                </Route>
                <Route path='/cart' element={<CartPage />}/>
              </Route>



            </Route> 
          </Routes>
          <ToastContainer 
            className="toastContainer"
            progressClassName={"progress"}
          />
        </BrowserRouter>
      </AuthModalProvider>
    </AuthProvider>

    </>
  )
}

export default App
