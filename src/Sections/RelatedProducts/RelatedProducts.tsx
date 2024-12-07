import React, { useState } from 'react';
import { recommendedProducts } from '@/src/source';

const RelatedProducts = () => {
 
   // Указываем тип для quantities: объект с числовыми ключами и значениями (количество товара)
   const [quantities, setQuantities] = useState<Record<number, number>>(
    recommendedProducts.reduce((acc, product) => {
      acc[product.id] = 1; // Начальное количество для каждого товара
      return acc;
    }, {} as Record<number, number>) // Указываем тип для начального значения
  );

  const increaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const decreaseQuantity = (productId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1,
    }));
  };

  return (
    <section className="related-products">
      <h2 className="related-products__title">С этим товаром покупают</h2>
      <div className="related-products__list">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="related-products__item">
            <img
              src={product.image}
              alt={product.name}
              className="related-products__image"
            />
            <p className="related-products__name">{product.name}</p>
            <p className="related-products__article">Артикул: {product.article}</p>
            <p className="related-products__price">
              {product.price} {product.currency}
            </p>
            <div className="related-products-actions">
              <button className="related-products-actions__add-to-cart">В корзину</button>
              <div className="related-products-actions__quantity">
                <button
                  className="related-products-actions__button"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <p className="related-products-actions__value">{quantities[product.id]}</p>
                <button
                  className="related-products-actions__button"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;

