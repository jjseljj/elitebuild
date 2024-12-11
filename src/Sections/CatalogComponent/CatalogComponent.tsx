import React, { useState } from 'react';
import { catalogData } from '@/src/source';
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";

const CatalogComponent: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <div className="catalog">
      <div className="catalog__left">
        {catalogData.map((categoryData, index) => (
          <div
            key={index}
            className={`catalog__category ${
              activeCategoryIndex === index ? 'active' : ''
            }`}
            onClick={() => setActiveCategoryIndex(index)}
          >
            {categoryData.category}
          </div>
        ))}
      </div>
      <div className="catalog__right">
        <div className="catalog__category-container">
          <h3 className="catalog__category-title">
            {catalogData[activeCategoryIndex].category}
          </h3>
          <Link href={`/category/${encodeURIComponent(catalogData[activeCategoryIndex].category)}`}
          className="catalog__category-link"
          >
          <FaArrowRightLong />
          </Link>
        </div>
        <div className="catalog__subcategory-container">
          {catalogData[activeCategoryIndex].subcategories.map((subcategory, subIndex) => (
            <div key={subIndex} className="catalog__subcategory">
              <h4 className="catalog__subcategory-title">{subcategory.name}</h4>
              <ul className="catalog__product-list">
                {subcategory.products.map((product) => (
                  <li key={product.id} className="catalog__product-item">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogComponent;


