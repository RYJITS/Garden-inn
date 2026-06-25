
import React from 'react';
import DynamicHero from '../components/DynamicHero';
import { APP_VERSION } from '../constants/version';

const slidesData = [
    { image: `/images/home/1.webp?v=${APP_VERSION}`, titleKey: "homePage.slides.0.title", subtitleKey: "homePage.slides.0.subtitle", subtitleFirst: true },
    { image: `/images/home/2.webp?v=${APP_VERSION}`, titleKey: "homePage.slides.1.title", subtitleKey: "homePage.slides.1.subtitle" },
    { image: `/images/home/3.webp?v=${APP_VERSION}`, titleKey: "homePage.slides.2.title", subtitleKey: "homePage.slides.2.subtitle" },
    { image: `/images/home/4.webp?v=${APP_VERSION}`, titleKey: "homePage.slides.3.title", subtitleKey: "homePage.slides.3.subtitle" },
    { image: `/images/home/5.webp?v=${APP_VERSION}`, titleKey: "homePage.slides.4.title", subtitleKey: "homePage.slides.4.subtitle" }
];

const HomePage: React.FC = () => {
  return (
    <div className="relative h-[calc(100vh-72px)] w-full">
      <DynamicHero slides={slidesData} />
    </div>
  );
};

export default HomePage;
