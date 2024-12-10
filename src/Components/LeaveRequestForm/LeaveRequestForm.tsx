import React, { useState } from "react";

const LeaveRequestForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Заявка отправлена:", { name, phone, message });
  };

  return (
    <div className="leave-request-form">
      <div className="leave-request-form__outer-wrapper">
        <h2 className="leave-request-form__title">Оставить заявку</h2>
       
        <form className="leave-request-form__form-container" onSubmit={handleSubmit}>
            <div className="leave-request-form__form-group">
                <input
                type="text"            
                className="leave-request-form__input leave-request-form__name"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
            <div className="leave-request-form__form-group">
                <input
                type="tel"             
                className="leave-request-form__input leave-request-form__phone"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                />
            </div>
            <div className="leave-request-form__form-group">
                <textarea             
                className="leave-request-form__textarea leave-request-form__message"
                placeholder="С чем могу помочь?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                />
            </div>
            <div className="leave-request-form__button-wrapper">
                <button className="leave-request-form__button" type="submit">Отправить</button>
            </div>
        </form>    
      </div>
      <div className="leave-request-form__right">
        <img src="/images/менеджер.png" alt="Оператор" />
      </div>
    </div>
  );
};

export default LeaveRequestForm;

