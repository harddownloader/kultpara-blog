import React from 'react';
import Header from './Header';
import Footer from "./Footer";

export interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;