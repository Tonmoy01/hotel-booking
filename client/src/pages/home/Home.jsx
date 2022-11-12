import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';

import './home.css';
import Featured from '../../components/featured/Featured';
import PropertyList from '../../components/propertyList/PropertyList';
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className='home-container'>
        <Featured />

        <h1 className='home-title'>Browse by property type</h1>
        <PropertyList />
        <h1 className='home-title'>Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Home;
