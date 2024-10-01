import React from 'react';
import HeroSection from '../components/herosection';
import AuthorTrendingSection from '../components/herotwo';
import TopBooksSection from '../components/topbooks';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div >
      
      <HeroSection />
      <AuthorTrendingSection/>
      <TopBooksSection/>
      <Footer/>
    </div>
  );
};

export default Home;
