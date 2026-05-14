import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { HomePage } from './pages/HomePage'
import { FavoritesPage } from './pages/Account/FavoritesPage'
import { AuthProvider } from './auth/AuthProvider'
import { useAuth } from './hooks/useAuth.js'
import { CartPage } from './pages/Account/CartPage'
import { AuthModalProvider } from './auth/AuthModalProvider/AuthModalProvider.jsx'
import { AccountLayout } from './components/AccountLayout'
import { OrdersPage } from './pages/Account/OrdersPage'
import { ReviewsPage } from './pages/Account/ReviewsPage'
import { AccountDetailsPage } from './pages/Account/AccountDetailsPage'

const ProtectedRoutes = () =>{
  const {isAuth} = useAuth();
  return isAuth ? <Outlet />: <Navigate to={'/'}  />
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
              {/* <Route path='/account/favorites' element={<FavoritesPage />}/> */}
              <Route path='/cart' element={<CartPage />}/>
              <Route element={<ProtectedRoutes />}>

                <Route element={<AccountLayout />} >
                  <Route path='/account/orders' element={<OrdersPage />}/>
                  <Route path='/account/favorites' element={<FavoritesPage />}/>
                  <Route path='/account/reviews' element={<ReviewsPage />}/>
                  <Route path='/account/profile' element={<AccountDetailsPage />}/>
                </Route>
                <Route path='/cart' element={<CartPage />}/>
              </Route>



            </Route>          
          </Routes>
        </BrowserRouter>
      </AuthModalProvider>
    </AuthProvider>
    </>
  )
}

export default App
