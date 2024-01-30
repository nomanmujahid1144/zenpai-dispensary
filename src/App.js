import React from "react";
import { Routes, Route } from "react-router-dom";
import { HeroSection } from "./components/major-components/HeroSection";
import { Navbar } from "./components/major-components/Navbar";
import { SignIn } from "./components/major-components/SignIn"
import { SignUp } from "./components/major-components/SignUp"
import { PhoneNo } from "./components/major-components/PhoneNo"
import { Otp } from "./components/major-components/Otp"
import { Agevalidation } from "./components/major-components/AgeConformation"
import { ResetPassword } from "./components/major-components/ResetPassword"
import { ConformPassword } from "./components/major-components/Conform_Password"
import { AllProducts } from "./components/major-components/AllProducts"
import { SingleProduct } from "./components/major-components/SingleProduct"
import { Checkout } from "./components/major-components/Checkout"
import { Account } from "./components/major-components/Account"
import { Berbix } from "./components/major-components/Berbix"
import { Blogs } from "./components/major-components/Blogs"
import { OrderDetail } from "./components/major-components/OrderDetail"
import { AboutUs } from "./components/major-components/AboutUs";
import { MailDelivery } from "./components/major-components/MailDelivery";
import { FAQPage } from "./components/major-components/Faq";
import { Delivery } from "./components/major-components/Delivery";
//--------------Noty CSS----------------------
import "./assets/sass/app.scss";
import "./components/fontawesomeIcons"
import Layout from "./components/layout/Layout";
import { BlogDetails } from "./components/minor-components/BlogDetails";

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-password/:token" element={<ConformPassword />} />
        <Route path="/accounts" element={<Account />} />
        <Route path="/age-verification" element={<Agevalidation />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/brand/:brandName" element={<SingleProduct />} />
        <Route path="/order/:orderid" element={<OrderDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/mail-delivery" element={<MailDelivery />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Layout>
  )
}
