import React, { useState } from "react";
import { paymentMethods, defaultContactData } from "@/src/source"; 
import Link from 'next/link';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckboxSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const CartComponent: React.FC = () => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null);
  const [contactData, setContactData] = useState(defaultContactData);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Выбранные товары

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    if (!selectedAll) {
      setSelectedItems([0, 1]); // Пример: Выбрать все товары (замените на свои ID товаров)
    } else {
      setSelectedItems([]);
    }
  };
  const handleToggleItemSelection = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
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
        <div onClick={handleSelectAll} className="cart__select-all">
          {selectedAll ? (
            <IoCheckboxSharp className="cart__icon-checked" />
          ) : (
            <MdCheckBoxOutlineBlank className="cart__icon-unchecked" />
          )}
          <label>Выделить все</label>
        </div>
        <button className="cart__delete-selected">
          <IoMdClose className="cart__icon-delete" />
          Удалить выбранное
        </button>
      </div>

      <div className="cart__items">
      <div onClick={() => handleToggleItemSelection(0)} className="cart__item-select">
            {selectedItems.includes(0) ? (
              <IoCheckboxSharp className="cart__icon-checked" />
            ) : (
              <MdCheckBoxOutlineBlank className="cart__icon-unchecked" />
            )}
          </div>
        <div className="cart__item">            
            <img src="/images/product-placeholder.png" alt="Товар" className="cart__item-image" />
            <div className="cart__item-details">              
              <p className="cart__item-name">Наименование товара</p>
              <p className="cart__item-article">Артикул</p>              
            </div>            
            <div className="cart__item-price-wrapper">
              <p className="cart__item-price">2 990 ₽</p>
            </div>
            <div className="cart__item-quantity">
              <button className="cart__quantity-decrease">-</button>
              <span className="cart__quantity-value">1</span>
              <button className="cart__quantity-increase">+</button>
            </div>                 
        </div>

        <div className="cart__summary">
          <p className="cart__weight">Вес: 2 кг</p>
          <p className="cart__total">Итого к оплате: 2 990 ₽</p>
          <button className="cart__checkout-button">Оформить заказ</button>
        </div>
      </div>


      

      <div className="cart__delivery-method">
        <h2 className="cart__section-title">Способ доставки</h2>
        <div className="cart__delivery-map">Карта пунктов выдачи СДЭК</div>
      </div>

      <div className="cart__payment-method">
        <h2 className="cart__section-title">Способ оплаты</h2>
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className="cart__payment-option"
            onClick={() => handlePaymentMethodChange(index)}
          >
            {selectedPaymentMethod === index ? (
              <IoCheckboxSharp className="cart__icon-checked" />
            ) : (
              <MdCheckBoxOutlineBlank className="cart__icon-unchecked" />
            )}
            {method}
          </div>
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
