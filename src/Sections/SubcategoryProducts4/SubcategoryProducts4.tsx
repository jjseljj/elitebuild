import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { productData, manufacturers, colors, dryMixes, categorySubcategoriesData } from '@/src/source';
import Link from 'next/link';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckboxSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io"; 
import { IoStarSharp } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { saveProduct, removeProduct, getSavedProducts } from '@/services/storageHelpers';
import { getCartItems, saveCartItem, removeCartItem } from "@/services/cartHelpers";

// КАТЕГОРИЯ 

interface SubcategoryProducts4Props {
  categoryData: {
    category: string;
    subcategories: {
      name: string;
      subcategory2: {
        name: string;
        products: {
          id: number;
          name: string;
        }[];
      }[];
    }[];
  };
  categoryName: string;
}
const SubcategoryProducts4: React.FC<SubcategoryProducts4Props> = ({ categoryData, categoryName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>(
    productData.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {} as Record<number, number>)
  );

  const [quantities, setQuantities] = useState<Record<number, number>>(
    productData.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {} as Record<number, number>)
  );

  const handleImageChange = (productId: number, direction: 'prev' | 'next') => {
    const product = productData.find((p) => p.id === productId);
    if (!product || !product.imageThumbnails) return;

    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]:
        direction === 'prev'
          ? (prev[productId] - 1 + product.imageThumbnails.length) % product.imageThumbnails.length
          : (prev[productId] + 1) % product.imageThumbnails.length,
    }));
  };

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

  const [selectedManufacturers, setSelectedManufacturers] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);

  const toggleManufacturer = (index: number) => {
    setSelectedManufacturers((prev) =>
      prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
  };

  const toggleColor = (index: number) => {
    setSelectedColors((prev) =>
      prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
  };

  const [sortBy, setSortBy] = useState<'price' | 'popularity' | 'rating'>('price');
  const [activeSort, setActiveSort] = useState<'price' | 'popularity' | 'rating'>('price');

  const handleSortChange = (sortKey: 'price' | 'popularity' | 'rating') => {
    setActiveSort(sortKey);
    setSortBy(sortKey);
  };

  const sortedProductData = [...productData].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'popularity') {
      return b.salesCount - a.salesCount;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const filteredProductData = productData.filter((product) => {
    const matchesManufacturer =
      selectedManufacturers.length === 0 ||
      selectedManufacturers.includes(manufacturers.indexOf(product.manufacturer));

    const matchesColor =
      selectedColors.length === 0 ||
      product.availableColors.some((color) => selectedColors.includes(colors.indexOf(color)));

    return matchesManufacturer && matchesColor;
  });

  const sortedAndFilteredProductData = [...filteredProductData].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'popularity') {
      return b.salesCount - a.salesCount;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const [maxPrice, setMaxPrice] = useState(9999999);

  const handlePriceChange = (value: number) => {
    setMaxPrice(value);
  };

  const filteredByPriceProductData = sortedAndFilteredProductData.filter((product) => {
    return product.price <= maxPrice;
  });

  const [activeTabs, setActiveTabs] = useState<Record<number, string>>(
    productData.reduce((acc, product) => {
      acc[product.id] = "description"; // Изначально вкладка "Описание"
      return acc;
    }, {} as Record<number, string>)
  );
  
  const handleTabChange = (productId: number, tab: string) => {
    setActiveTabs((prev) => ({
      ...prev,
      [productId]: tab,
    }));
  };
  
  


  const getTabContent = (product: any) => {
    switch (activeTabs[product.id]) {
        case "description":
            return product.description[0].split("<br><br>");
        case "instruction":
            return product.instruction || ["Информация отсутствует."];
        case "delivery":
            return product.deliveryOptions || ["Информация отсутствует."];
        default:
            return [];
    }
};


// Состояние для сохранённых товаров
const [likedProducts, setLikedProducts] = useState<Record<number, boolean>>({});
const [savedProducts, setSavedProducts] = useState<any[]>([]);

// При загрузке получаем сохранённые товары из локального хранилища
useEffect(() => {
  const saved = getSavedProducts();
  setSavedProducts(saved);
  const liked = saved.reduce((acc: Record<number, boolean>, product: any) => {
    acc[product.id] = true;
    return acc;
  }, {});
  setLikedProducts(liked);
}, []);

// Функция переключения лайка
const toggleLike = (product: any) => {
  const isLiked = likedProducts[product.id];

  if (isLiked) {
    removeProduct(product.id); // Удаляем из локального хранилища
    setLikedProducts((prev) => ({ ...prev, [product.id]: false }));
    setSavedProducts((prev) => prev.filter((p) => p.id !== product.id));
  } else {
    saveProduct(product); // Сохраняем в локальное хранилище
    setLikedProducts((prev) => ({ ...prev, [product.id]: true }));
    setSavedProducts((prev) => [...prev, product]);
  }
};
  
  //добавление товаров в корзину
  const handleAddToCart = (product: any) => {
    saveCartItem(product); // Сохранение товара в корзине
    alert(`Товар "${product.name}" добавлен в корзину.`); // Уведомление для пользователя
  };


  const [isManufacturerVisible, setIsManufacturerVisible] = useState(true);
  const [isColorsVisible, setIsColorsVisible] = useState(true);

  //переключение видимости списка производителей.
  const toggleManufacturerVisibility = () => {
    setIsManufacturerVisible((prev) => !prev);
  };

  //переключение видимости списка цветов.
  const toggleColorsVisibility = () => {
    setIsColorsVisible((prev) => !prev);
  };

  return (
    <section className="subcategory-products4">
      <div className="subcategory-products4__breadcrumb">
        <Link href="/">Главная</Link>
        {" / "}
        <Link href="/catalog">
          <span>Каталог</span>
        </Link>
        {" / "}
        <Link href={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}>
          <span>{categoryName}</span>
        </Link>
        {" / "}
        <Link href="/subcategory2">
          <span>Подкатегория</span>
        </Link>
      </div>
      <h2 className="subcategory-products4__title">{categoryName}</h2>


      {/*<h2 className="subcategory-products4__title">Сухие смеси</h2>*/}

      <div className="subcategory-products4__card2">
        {categoryData.subcategories.map((subcategory, index) => (
          <div key={index} className="subcategory-products4__item2">
            <h3 className="subcategory-products4__item-title">{subcategory.name}</h3>
          </div>
        ))}
      </div>


      <div className="subcategory-products4__container">
        <div className="subcategory-products4__left">
          <div className="subcategory-products4__price-range">
            <div className="subcategory-products4__price-title">Цена, ₽</div>
            <div className="subcategory-products4__price-inputs">
              <div className="subcategory-products4__price-min">от 110</div>
              <div className="subcategory-products4__price-divider">–</div>
              <div className="subcategory-products4__price-max">{maxPrice}</div>
            </div>
            <div className="subcategory-products4__price-slider">
              <input
                type="range"
                min="110"
                max="5000"
                value={maxPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="subcategory-products3__slider"
              />
            </div>
          </div>

          <div className="subcategory-products4__manufacturers">
            <div
              className="subcategory-products4__manufacturer-title"
              onClick={toggleManufacturerVisibility}
            >
              Производитель <IoIosArrowDown className={`icon-dropdown ${isManufacturerVisible ? 'rotated' : ''}`} />
            </div>
            {isManufacturerVisible && (
              <>
                {manufacturers.map((manufacturer, index) => (
                  <div
                    key={index}
                    className="subcategory-products4__manufacturer-item"
                    onClick={() => toggleManufacturer(index)}
                  >
                    {selectedManufacturers.includes(index) ? (
                      <IoCheckboxSharp className="subcategory-products4__icon-checked" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="subcategory-products4__icon-unchecked" />
                    )}
                    {manufacturer}
                  </div>
                ))}
              </>
            )}
          </div>


          <div className="subcategory-products4__colors">
            <div
              className="subcategory-products4__colors-title"
              onClick={toggleColorsVisibility}
            >
              Цвет <IoIosArrowDown className={`icon-dropdown ${isColorsVisible ? 'rotated' : ''}`} />
            </div>
            {isColorsVisible && (
              <>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="subcategory-products4__color-item"
                    onClick={() => toggleColor(index)}
                  >
                    {selectedColors.includes(index) ? (
                      <IoCheckboxSharp className="subcategory-products4__icon-checked" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="subcategory-products4__icon-unchecked" />
                    )}
                    {color}
                  </div>
                ))}
              </>
            )}
          </div>


        </div>

        <div className="subcategory-products4__wrapper">
          <div className="subcategory-products4__sort">
            <p className="subcategory-products4__sort-title">Сортировать:</p>
            <div className="subcategory-products4__sort-options">
              <button
                className={`subcategory-products4__sort-price ${activeSort === 'price' ? 'active' : ''}`}
                onClick={() => handleSortChange('price')}
              >
                по цене
              </button>
              <button
                className={`subcategory-products4__sort-popularity ${activeSort === 'popularity' ? 'active' : ''}`}
                onClick={() => handleSortChange('popularity')}
              >
                по популярности
              </button>
              <button
                className={`subcategory-products4__sort-rating ${activeSort === 'rating' ? 'active' : ''}`}
                onClick={() => handleSortChange('rating')}
              >
                по рейтингу
              </button>
            </div>
          </div>

          <div className="subcategory-products4__list">
            {filteredByPriceProductData.slice(0, 4).map((product) => (
                <div key={product.id} className="subcategory-products4__card">          
                  <div className="subcategory-products4__image-wrapper">
                    <img
                    src={product.imageThumbnails[currentImageIndex[product.id]] || "/placeholder-image.jpg"}
                    alt={product.name}
                    className="subcategory-products4__image"
                    />
                  </div>      
                  <div className="subcategory-products4__right">             
                    <h3 className="subcategory-products4__name">{product.name}</h3>
                    <p className="subcategory-products4__article">Артикул: {product.article}</p>
                    <div className="subcategory-products4__rating">
                    {Array.from({ length: Math.round(product.rating) }).map((_, index) => (
                        <IoStarSharp key={index} className="subcategory-products4__star" />
                    ))}
                    </div>                         
                  </div>

                  <div className="subcategory-products4__actions">
                    <div className="subcategory-products4__price-container">
                      <p className="subcategory-products4__price">
                        {product.price} {product.currency}
                      </p>                      
                    </div>
                    <div className="subcategory-products4__quantity-container">
                      <div className="subcategory-products4__quantity">
                        <button className="subcategory-products4__quantity-button" onClick={() => decreaseQuantity(product.id)}>-</button>
                        <span className="subcategory-products4__quantity-value">{quantities[product.id]}</span>
                        <button className="subcategory-products4__quantity-button" onClick={() => increaseQuantity(product.id)}>+</button>
                      </div>                      
                    </div>
                    <div className="subcategory-products4__add-to-cart-container">
                        <button className="subcategory-products4__add-to-cart"
                        onClick={() => handleAddToCart(product)}
                        >
                          В корзину
                        </button>
                    </div>
                    <div className="subcategory-products4__icons-container">
                        <button
                        className="subcategory-products4__heart-button"
                        onClick={() => toggleLike(product)}
                        >
                        {likedProducts[product.id] ? (
                            <IoHeart className="subcategory-products4__heart-icon active" />
                        ) : (
                            <IoIosHeartEmpty className="subcategory-products4__heart-icon" />
                        )}
                        </button>
                        <div className="subcategory-products4__comparison-image">
                        <img src="/images/сравнение.svg" alt="Дополнительное изображение" />
                        </div>
                    </div>
                  </div>    
                </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default SubcategoryProducts4;