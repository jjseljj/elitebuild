import React, { useState } from 'react';
import { catalogData } from '@/src/source';

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
        <h3 className="catalog__category-title">
          {catalogData[activeCategoryIndex].category}
        </h3>
        <div className="catalog__subcategory-container">
        {catalogData[activeCategoryIndex].subcategories.map((subcategory, subIndex) => (
          <div key={subIndex} className="catalog__subcategory">
            <h4 className="catalog__subcategory-title">{subcategory.name}</h4>
            <ul className="catalog__product-list">
              {subcategory.products.map((product, productIndex) => (
                <li key={productIndex} className="catalog__product-item">
                  {product}
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


