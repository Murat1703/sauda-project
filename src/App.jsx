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
import { AccountLayout, AccountResponsiveLayout } from './components/AccountLayout'
import { OrdersPage } from './pages/Account/OrdersPage'
import { OrderPage } from './pages/Account/OrdersPage'
import { ReviewsPage } from './pages/Account/ReviewsPage'
import { AccountDetailsPage } from './pages/Account/AccountDetailsPage'
import { useAuthModal } from './hooks/useAuthModal.js'
import { ToastContainer } from 'react-toastify';
import { ProductPage } from './pages/ProductPage'
import { MobileAccountPage } from './pages/Account/MobileAccountPage'
import { useMediaQuery } from 'react-responsive'
import { MainAccountMainPage } from './pages/Account/MobileAccountMainPage'



const ProtectedRoutes = () =>{
  const { openAuthModal } = useAuthModal();
  const location = useLocation();
  const {isAuth} = useAuth();
  const isMobile = useMediaQuery({
    maxWidth: 768
  })

  useEffect(() => {
    if (!isAuth && !isMobile) {
      openAuthModal();
    } 

  }, [isAuth]);


  if (!isAuth && isMobile){
    return <Navigate to="/login" />
  }



  if (!isAuth && !isMobile){
    return null
  }


  // return isAuth ? <Outlet />: <Navigate to={'/'} />;  
  return <Outlet />
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
              <Route path='/login' element={<MobileAccountPage />}/>

              
              <Route element={<ProtectedRoutes />}>                

                <Route element={<AccountResponsiveLayout />} >
                  <Route path='/account/orders' element={<OrdersPage />}/>
                  <Route path={`/account/orders/:id`} element={<OrderPage />}/>
                  <Route path='/account/favorites' element={<FavoritesPage />}/>
                  <Route path='/account/reviews' element={<ReviewsPage />}/>
                  <Route path='/account/profile' element={<AccountDetailsPage />}/>
                  <Route path='/account' element={<MainAccountMainPage />} />
                </Route>
                <Route path='/cart' element={<CartPage />}/>
              </Route>
              <Route path={`/product/:id`} element={<ProductPage />}/>          
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
