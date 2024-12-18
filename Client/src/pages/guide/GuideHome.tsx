import React from 'react';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import GuideBanner from '../../components/guide/GuideBanner';

const GuideHome:React.FC = () => {
    return (
        <div className='w-full h-full'>
            <Header color='white' showPromoCarousel={false}/>
            <GuideBanner/>
            <Footer />
        </div>
    );
}

export default GuideHome;
