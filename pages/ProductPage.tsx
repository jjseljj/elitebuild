import React from 'react'
import Navbar from '@/src/Sections/Navbar/Navbar'
import ProductInfo from '../src/Sections/ProductInfo/ProductInfo'
import RelatedProducts from '../src/Sections/RelatedProducts/RelatedProducts'
import Footer from '../src/Sections/Footer/Footer'

const ProductPage = () => {
  return (
    <>
      <Navbar/>
      <ProductInfo  /> 
      <RelatedProducts />      
      <Footer />    
    </>
  )
}

export default ProductPage

/*
http://localhost:3000/ProductPage
*/