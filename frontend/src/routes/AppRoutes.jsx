import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../components/UserRegister';
import UserLogin from '../components/UserLogin';
import FoodPartnerRegister from '../components/FoodPartnerRegister';
import FoodPartnerLogin from '../components/FoodPartnerLogin';
import Home from '../general/Home';
import CreateFood from '../food-partner/CreateFood';
import Profile from '../food-partner/Profile';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFood/>} />
        <Route path="/food-partner/:id" element={<Profile/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
