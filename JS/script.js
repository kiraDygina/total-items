document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsList = document.getElementById('cartItems');
  const totalPrice = document.getElementById('totalPrice');
  const cartCounter = document.querySelector('.korz');
  let cart = [];

  function displayCart() {
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('cart-item');

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name + ' image';
      img.classList.add('cart-item-image');
      div.appendChild(img);

      const description = document.createElement('div');
      description.classList.add('cart-item-description');
      description.innerHTML = `
        <p>${item.name}</p>
        <p>Ціна: ${item.price} ua</p>
      `;
      div.appendChild(description);

      const quantityControls = document.createElement('div');
      quantityControls.classList.add('quantity-controls');

      const increaseBtn = document.createElement('button');
      increaseBtn.textContent = '+';
      increaseBtn.addEventListener('click', function() {
        increaseQuantity(item);
      });
      quantityControls.appendChild(increaseBtn);

      const quantityDisplay = document.createElement('span');
      quantityDisplay.textContent = item.quantity; // Показуємо поточну кількість товару
      quantityControls.appendChild(quantityDisplay);

      const decreaseBtn = document.createElement('button');
      decreaseBtn.textContent = '-';
      decreaseBtn.addEventListener('click', function() {
        decreaseQuantity(item);
      });
      quantityControls.appendChild(decreaseBtn);

      div.appendChild(quantityControls);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Видалити';
      deleteBtn.classList.add('delete-item');
      deleteBtn.addEventListener('click', function() {
        removeItemFromCart(item);
      });
      div.appendChild(deleteBtn);

      cartItemsList.appendChild(div);
    });

    // Оновлюємо значення лічильника
    cartCounter.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    // Розраховуємо загальну суму покупок
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Оновлюємо загальну суму у кошику
    totalPrice.textContent = 'Всього в кошику: ' + total + ' ua';
  }

  function increaseQuantity(item) {
    item.quantity += 1;
    displayCart();
  }

  function decreaseQuantity(item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      displayCart();
    }
  }

  function removeItemFromCart(item) {
    const index = cart.findIndex(cartItem => cartItem === item);
    if (index !== -1) {
      cart.splice(index, 1);
      displayCart();
    }
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const name = this.parentNode.querySelector('p').textContent;
      const price = parseInt(this.getAttribute('data-price'));
      const image = this.parentNode.querySelector('img').src;
      let item = { name, price, image, quantity: 1 }; // Створюємо новий об'єкт для кожного товару
      cart.push(item);
      displayCart();
    });
  });

  // Отримуємо посилання на кнопку "Кошик"
  const cartLink = document.getElementById('cartLink');

  // Отримуємо посилання на модальне вікно кошика
  const modal = document.getElementById('cartModal');

  // Отримуємо посилання на кнопку "Закрити" модального вікна
  const closeBtn = modal.querySelector('.close');

  // Обробник натискання на кнопку "Кошик"
  cartLink.addEventListener('click', function() {
    // Відображаємо модальне вікно кошика
    modal.style.display = 'block';

    // Оновлюємо вміст кошика
    displayCart();
  });

  // Обробник натискання на кнопку "Закрити"
  closeBtn.addEventListener('click', function() {
    // Закриваємо модальне вікно кошика
    modal.style.display = 'none';
  });
});






// Отримуємо посилання на кнопку "Оформити покупку"
const checkoutBtn = document.getElementById('checkoutBtn');

// Обробник натискання на кнопку "Оформити покупку"
checkoutBtn.addEventListener('click', function() {
  // Тут ви можете додати логіку для оформлення покупки, наприклад, перенаправлення на сторінку оформлення замовлення або відображення повідомлення про успішне оформлення.
  alert('Ваше замовлення успішно оформлено!');
});