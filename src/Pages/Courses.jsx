import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../Components/Header';
import CourseHome from '../Components/courseHome';
import Footer from '../Components/Footer';

export const Courses = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      <Header />
      <CourseHome initialCategory={category} />
      <Footer />
    </>
  );
};