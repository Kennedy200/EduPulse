import React from 'react';
import Header from '../../components/Header/Header';
import Comparison from '../../components/Comparison/Comparison';
import Steps from '../../components/Steps/Steps';
import Testimonial from '../../components/Testimonial/Testimonial';
import DashboardPreview from '../../components/DashboardPreview/DashboardPreview';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Comparison />
      <Steps />
      <Testimonial />
      <DashboardPreview />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;