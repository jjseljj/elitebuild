import React, { useState } from "react";
import { paymentMethods, defaultContactData } from "@/src/source"; 
import Link from 'next/link';

const CartComponent: React.FC = () => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null);
  const [contactData, setContactData] = useState(defaultContactData);

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
  };

  const handlePaymentMethodChange = (index: number) => {
    setSelectedPaymentMethod(index);
  };

  const handleContactInputChange = (field: keyof typeof contactData, value: string) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="cart">
        <div className="cart__breadcrumb">
        <Link href="/">Главная</Link>
        {" / "}
        <span>Корзина</span>
      </div>

      <h1 className="cart__title">Корзина</h1>

      <div className="cart__header">
        <label>
          <input
            type="checkbox"
            checked={selectedAll}
            onChange={handleSelectAll}
          />
          Выделить все
        </label>
        <button className="cart__delete-selected">Удалить выбранное</button>
      </div>

      <div className="cart__items">
        <div className="cart__item">
          <img src="/images/product-placeholder.png" alt="Товар" className="cart__item-image" />
          <div className="cart__item-details">
            <p className="cart__item-name">Наименование товара</p>
            <p className="cart__item-article">Артикул</p>
          </div>
          <div className="cart__item-quantity">
            <button className="cart__quantity-decrease">-</button>
            <span className="cart__quantity-value">1</span>
            <button className="cart__quantity-increase">+</button>
          </div>
          <p className="cart__item-price">2 990 ₽</p>
        </div>
      </div>

      <div className="cart__summary">
        <p className="cart__weight">Вес: 2 кг</p>
        <p className="cart__total">Итого к оплате: 2 990 ₽</p>
        <button className="cart__checkout-button">Оформить заказ</button>
      </div>

      <div className="cart__delivery-method">
        <h2 className="cart__section-title">Способ доставки</h2>
        <div className="cart__delivery-map">Карта пунктов выдачи СДЭК</div>
      </div>

      <div className="cart__payment-method">
        <h2 className="cart__section-title">Способ оплаты</h2>
        {paymentMethods.map((method, index) => (
          <label key={index} className="cart__payment-option">
            <input
              type="radio"
              name="payment-method"
              checked={selectedPaymentMethod === index}
              onChange={() => handlePaymentMethodChange(index)}
            />
            {method}
          </label>
        ))}
      </div>

      <div className="cart__contact-data">
        <h2 className="cart__section-title">Контактные данные</h2>
        <input
          type="text"
          placeholder="Имя"
          value={contactData.name}
          onChange={(e) => handleContactInputChange("name", e.target.value)}
          className="cart__contact-input"
        />
        <input
          type="tel"
          placeholder="Номер телефона"
          value={contactData.phone}
          onChange={(e) => handleContactInputChange("phone", e.target.value)}
          className="cart__contact-input"
        />
        <input
          type="email"
          placeholder="Почта"
          value={contactData.email}
          onChange={(e) => handleContactInputChange("email", e.target.value)}
          className="cart__contact-input"
        />
      </div>
    </section>
  );
};

export default CartComponent;
