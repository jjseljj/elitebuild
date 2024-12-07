import React from 'react';
import Link from 'next/link';

const ReturnsInfo = () => {
  return (
    <section className="returns-info">
      <div className="returns-info__breadcrumb">
        <Link href="/">
            Главная
        </Link>
        {" / "}
        <Link href="/Returns">
            Возврат
        </Link>
       </div>
      <h1 className="returns-info__title">Возврат</h1>
      <div className="returns-info__content">
        <h2 className="returns-info__subtitle">Основные правила возврата товара</h2>
        <p className='return-text'>
          Возврат товара возможен в следующих случаях:
        </p>
        <ol className="returns-info__list">
            <li>Товар не соответствует заявленным характеристикам или имеет дефекты.</li>
            <li>Товар не был доставлен в указанный срок.</li>
            <li>Вы получили не тот товар, который заказывали.</li>
            </ol>
        <p className='return-text'>
          Для возврата товара необходимо:
        </p>
        <ol className="returns-info__steps">
          <li>Связаться с нашей службой поддержки и сообщить о причине возврата.</li>
          <li>Предоставить документы, подтверждающие покупку (чек, квитанцию или иной документ, подтверждающий оплату).</li>
          <li>Вернуть товар в оригинальной упаковке и сохранить его товарный вид.</li>
        </ol>
        <p>
          После получения информации о возврате товара наша служба поддержки свяжется с вами и сообщит дальнейшие действия.
        </p>
        <p>
          Обращаем ваше внимание, что некоторые товары не подлежат возврату или обмену, так как входят в перечень товаров надлежащего качества, не подлежащих возврату или обмену на аналогичный товар других размера, формы, габарита, фасона, расцветки или комплектации (утверждён Постановлением Правительства Российской Федерации от 31 декабря 2020 г. № 2463). Перед покупкой ознакомьтесь с информацией о товаре и его свойствах.
        </p>
        <h2 className="returns-info__subtitle">Ограничения по возврату товара</h2>
        <p>
          Некоторые товары не подлежат возврату или обмену на основании статьи 25 закона «О защите прав потребителей». Это товары надлежащего качества, которые входят в перечень, утверждённый Постановлением Правительства Российской Федерации от 31 декабря 2020 года № 2463.
        </p>
        <p className='return-text'>            
            К таким товарам, как правило, относятся:
        </p>
        <ul className="returns-info__restrictions">           
          <li>товары бытовой химии;</li>
          <li>товары, отпускаемые на метраж (лента, ткань, линолеум, провода, кабели и другие);</li>
          <li>технически сложные товары бытового назначения, на которые установлены гарантийные сроки не менее одного года;</li>
          <li>животные и растения;</li>
          <li>бытовая мебель.</li>
        </ul>
      </div>
    </section>
  );
};

export default ReturnsInfo;
