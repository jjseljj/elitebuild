import React from 'react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
  return (
    <div>
      <div>
      <button onClick={onClose}>Закрыть</button>
        <h2>Оплата</h2>
        <form>
          <div>
            <label htmlFor="email">Эл. почта</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@yandex.ru"
              required
            />
          </div>
          <div>
            <label>Метод оплаты</label>
            <div>
              <input
                type="radio"
                id="visa"
                name="paymentMethod"
                value="Visa"
                required
              />
              <label htmlFor="visa">Visa</label>

              <input
                type="radio"
                id="mastercard"
                name="paymentMethod"
                value="Mastercard"
              />
              <label htmlFor="mastercard">Mastercard</label>

              <input
                type="radio"
                id="mir"
                name="paymentMethod"
                value="МИР"
              />
              <label htmlFor="mir">МИР</label>
            </div>
          </div>
          <div>
            <label htmlFor="card-number">Номер карты</label>
            <input
              type="text"
              id="card-number"
              name="cardNumber"
              placeholder="1234 1234 1234 1234"
              required
            />
          </div>
          <div>
            <label htmlFor="expiry-date">Срок действия</label>
            <input
              type="text"
              id="expiry-date"
              name="expiryDate"
              placeholder="MM / ГГ"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv">Код CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              required
            />
          </div>
          <div>
            <label htmlFor="card-holder">Имя владельца карты</label>
            <input
              type="text"
              id="card-holder"
              name="cardHolder"
              placeholder="Имя Фамилия"
              required
            />
          </div>
          <div>
            <label htmlFor="billing-address">Адрес выставления счета</label>
            <input
              type="text"
              id="billing-address"
              name="billingAddress"
              placeholder="Введите адрес"
              required
            />
          </div>
          <div>
            <label htmlFor="phone-number">Телефон</label>
            <input
              type="text"
              id="phone-number"
              name="phoneNumber"
              placeholder="+7 (XXX) XXX-XX-XX"
              required
            />
          </div>
          <button type="submit" className="payment-modal__submit-button">Оплатить</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;



