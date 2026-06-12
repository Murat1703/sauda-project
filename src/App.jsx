import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { HomePage } from './pages/HomePage'
import { FavoritesPage } from './pages/Account/FavoritesPage'
import { useAuth } from './context/AuthContext.jsx'
import { CartPage } from './pages/Account/CartPage'
import { AccountLayout, AccountResponsiveLayout } from './components/AccountLayout'
import { OrdersPage } from './pages/Account/OrdersPage'
import { OrderPage } from './pages/Account/OrdersPage'
import { ReviewsPage } from './pages/Account/ReviewsPage'
import { AccountDetailsPage } from './pages/Account/AccountDetailsPage'
import { useAuthModal } from './context/AuthModalContext.jsx'
import { ToastContainer } from 'react-toastify';
import { ProductPage } from './pages/ProductPage'
import { MobileAccountPage } from './pages/Account/MobileAccountPage'
import { useMediaQuery } from 'react-responsive'
import { MainAccountMainPage } from './pages/Account/MobileAccountMainPage'
import { CategoryItemPage } from './pages/CategoryItemPage/CategoryItemPage.jsx'
import { NewOrderPage } from './pages/Account/NewOrderPage/'
import { PrivacyPolice } from './pages/CMSPages/PrivacyPolice'
import { TermOfUsePage } from './pages/CMSPages/TermOfUsePage'
import { CMSPageLayout } from './components/CMSPageLayout'
import { ContactsPage } from './pages/CMSPages/ContactsPage'
import { AboutPage } from './pages/CMSPages/AboutPage'
// import { useAuthStore } from './stores/useAuthStore.js'



const ProtectedRoutes = () =>{
  const { openAuthModal, closeAuthModal } = useAuthModal();
  const {pathname} = useLocation();
  const {isAuth, loading} = useAuth();
  const isMobile = useMediaQuery({
    maxWidth: 768
  })

  // useEffect(() => {
  //   if (isAuthLoading) return;

  //   const protectedRoutes = ['/account', '/cart'];
  //   const isProtected = protectedRoutes.some(route =>
  //     pathname.startsWith(route)
  //   );


  //   if (!isAuth && isMobile  ) {
  //     openAuthModal();
  //   }


  //   if (!isAuth || !isProtected ){
  //     closeAuthModal();
  //   }


  // }, [isAuthLoading, isAuth, isMobile, pathname, closeAuthModal, openAuthModal]);

  useEffect(() => {
    if (loading) return;

    if (!isAuth) {
      openAuthModal()
    }
  }, [
    loading,
    isAuth,
    openAuthModal
  ]);


  if (loading) return null;

  if (!isAuth) return null;

  return <Outlet />
}

function App() {

  
  // const {isAuth, isAuthLoading} = useAuth();
  const {isAuth, loading, fetchUser} = useAuth();

  const [isMobileScroll, setIsMobileScroll] = useState(false);


  return (
    <>
        <BrowserRouter>
          <Routes >
            <Route 
              element={
                <MainLayout 
                  setIsMobileScrolled={setIsMobileScroll}
                />
              }
            >
              <Route path='/' element={<HomePage />}/>
              {/* <Route element={<AccountLayout />}>
                <Route path="/account/favorites" element={<FavoritesPage />} />
              </Route> */}

              <Route path='/cart' element={<CartPage isAuth={isAuth}/>}/>
              <Route path='/login' element={<MobileAccountPage />}/>

              <Route element={<CMSPageLayout/>}>
                <Route path='/privacy-police' element={<PrivacyPolice />}/>
                <Route path='/terms-of-use' element={<TermOfUsePage />}/>
                <Route path='/contacts' element={<ContactsPage />}/>
                <Route path='/about' element={<AboutPage />}/>
              </Route>


              <Route element={<AccountResponsiveLayout />} >
                  <Route path='/account/orders' element={<OrdersPage isAuth={isAuth}/>}/>
                  <Route path='/account/favorites' element={<FavoritesPage isAuth={isAuth}/>}/>
                  <Route path='/account/reviews' element={<ReviewsPage isAuth={isAuth}/>}/>
                  <Route path='/account/new-order' element={<NewOrderPage />}/>


              </Route>
              <Route element={<ProtectedRoutes />}>   
                <Route element={<AccountResponsiveLayout />} >
                  {/* <Route path='/account/orders' element={<OrdersPage />}/> */}
                  <Route path={'/account/orders/:orderId'} element={<OrderPage />}/>
                  {/* <Route path='/account/favorites' element={<FavoritesPage />}/> */}
                  <Route path='/account/profile' element={<AccountDetailsPage isAuth={isAuth}/>}/>

                  <Route path='/account/reviews' element={<ReviewsPage />}/>
                  <Route path='/account' element={<MainAccountMainPage />} />
                </Route>
                {/* <Route path='/cart' element={<CartPage />}/> */}
              </Route>
              <Route path={`/products/:slug`} element={<ProductPage isMobileScroll={isMobileScroll}/>}/>     
              <Route path={`/catalog/categories/*`} element={<CategoryItemPage isMobileScroll={isMobileScroll}/>}/>  
            </Route> 
          </Routes>
          <ToastContainer 
            className="toastContainer"
            progressClassName={"progress"}
          />
        </BrowserRouter>
    </>
  )
}

export default App
