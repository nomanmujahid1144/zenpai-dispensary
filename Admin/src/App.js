
import DashboardHeroSection from "./components/major-components/DashboardHeroSection";
import { Signup } from "./screen/Signup";
import { Login } from "./screen/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SideAndNavbar } from "./components/major-components/SideAndNavbar";
import { Products } from './components/major-components/Products'
import { Orders } from "./components/major-components/Orders";
import { Drivers } from "./components/major-components/Drivers";
import { Users } from "./components/major-components/Users";
import { Tax } from "./components/major-components/Tax";
import { Categories } from "./components/major-components/Categories";
import { Customers } from "./components/major-components/Customers";
import { SalesPromotion } from "./components/major-components/SalesPromotion";
import { Accounts } from "./components/major-components/Accounts";
import { StoreLocator } from "./components/major-components/StoreLocator";
import { WebsiteSetting } from "./components/major-components/WebsiteSetting";
import { AllShops } from "./components/major-components/AllShops";
import { Earnings } from "./components/major-components/Earnings";
import { Radius } from "./components/major-components/Radius";
import { SingleShop } from "./components/major-components/SingleShop";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "./redux/Actions/ProfileActions";
import { useJsApiLoader } from "@react-google-maps/api";
import { Account } from "./components/major-components/Account";
import { AddHeaderImage } from "./components/major-components/AddHeaderImage";



import "./components/fontawesomeIcons"
import { Layout } from "./components/minor-components/Layout";
import { WebsitePages } from "./components/major-components/WebsitePages";
import { AddAnnouncementMessage } from "./components/major-components/AddAnnouncementMessage";
import { AddAboutUs } from "./components/major-components/AddAboutUs";
import { AddBlogs } from "./components/major-components/AddBlogs";
import { FullBlog } from "./components/minor-components/FullBlog";
import { EditBlogs } from "./components/major-components/EditBlogs";
import { AddDalivery } from "./components/major-components/AddDelivery";
import { AddFaqs } from "./components/major-components/AddFaqs";
import { AddCategoryBanner } from "./components/minor-components/AddCategorybanner";
import { AddSocialLinks } from "./components/major-components/AddSocialLinks";


const places = ["places"]
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyASE7MqDo7TNZ_4fmORznk_JMBFm0d_pKY',
    libraries: places,
  });
  const dispatch = useDispatch()
  const token = useSelector(
    (state) => state.ProfileReducer
  );
  useEffect(() => {
    getToken()
  })
  const getToken = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(adminLogin(token))
    }
  }


  return (
    <>
      <Router>
        <Layout >
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={localStorage.getItem('token') ? <SideAndNavbar /> : <Login />} >
              <Route index element={<DashboardHeroSection />} />
              <Route path='/products' element={<Products />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/drivers' element={<Drivers />} />
              <Route path='/users' element={<Users />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/salesPromotion' element={<SalesPromotion />} />
              <Route path='/earnings' element={<Earnings />} />
              <Route path='/accounts' element={<Accounts />} />
              <Route path='/storelocator' element={<StoreLocator />} />
              <Route path='/tax' element={<Tax />} />
              <Route path='/all-shops' element={<AllShops />} />
              <Route path='/add-shop' element={<Radius />} />
              <Route path='/singleshop/:shopname' element={<SingleShop />} />
              <Route path='/websitesetting' element={<WebsiteSetting />} />
              <Route path='/pages' element={<WebsitePages />} />
              <Route path='/pages/header-image' element={<AddHeaderImage />} />
              <Route path='/pages/about-us' element={<AddAboutUs />} />
              <Route path='/pages/blog' element={<AddBlogs />} />
              <Route path='/pages/blog/:id' element={<FullBlog />} />
              <Route path='/pages/blog/edit/:id' element={<EditBlogs />} />
              <Route path='/pages/delivery' element={<AddDalivery />} />
              <Route path='/pages/faqs' element={<AddFaqs />} />
              <Route path='/pages/announcement' element={<AddAnnouncementMessage />} />
              <Route path='/pages/category-banner' element={<AddCategoryBanner />} />
              <Route path='/pages/social-link' element={<AddSocialLinks />} />
            </Route>
          </Routes>
        </Layout>
      </Router>

    </>
  );
}

export default App;
