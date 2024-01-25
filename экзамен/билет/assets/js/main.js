class App {
    constructor() {
      this.users = JSON.parse(localStorage.getItem('users')) || [];
      this.products = [
        { code: 1, name: 'Product 1', price: 29.99 },
        { code: 2, name: 'Product 2', price: 19.99 },
      ];
      this.cart = {
        products: [],
        totalPrice: 0,
      };
    }
  
    run() {
      const hasAccount = confirm('У вас есть аккаунт?');
  
      if (hasAccount) {
        this.login();
      } else {
        this.register();
      }
    }
  
    register() {
      console.log('Регистрация:');
      const name = prompt('Введите имя:');
      const email = prompt('Введите email:');
      const password = prompt('Введите пароль:');
  
      const user = { name, email, password };
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
      console.log('Регистрация успешна.');
      this.showCatalog();
    }
  
    login() {
      console.log('Вход:');
      const email = prompt('Введите email:');
      const password = prompt('Введите пароль:');
  
      const user = this.users.find((u) => u.email === email && u.password === password);
      if (user) {
        console.log('Вход успешен.');
        this.showCatalog();
      } else {
        console.log('Неверные учетные данные.');
      }
    }
  
    showCatalog() {
      console.log('Каталог продуктов:');
      this.products.forEach((product) => {
        console.log(`${product.code}. ${product.name} - ${product.price} руб.`);
      });
  
      const productCode = prompt('Выберите товар для добавления в корзину (введите код товара):');
      const selectedProduct = this.products.find((p) => p.code === parseInt(productCode));
      
      if (selectedProduct) {
        this.addToCart(selectedProduct);
        this.showCart();
      } else {
        console.log('Неверный код товара.');
        this.showCatalog();
      }
    }
  
    addToCart(product) {
      this.cart.products.push(product);
      this.cart.totalPrice += product.price;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  
    showCart() {
      console.log('Корзина:');
      this.cart.products.forEach((product) => {
        console.log(`${product.name} - ${product.price} руб.`);
      });
      console.log(`Итого: ${this.cart.totalPrice} руб.`);
  
      const answer = confirm('Желаете перейти к оформлению заказа?');
  
      if (answer) {
        this.checkout();
      } else {
        this.showCatalog();
      }
    }
  
    checkout() {
      console.log('Оформление заказа:');
      const cardNumber = prompt('Введите номер банковской карты:');
      const expirationDate = prompt('Введите дату истечения срока действия карты:');
      const cvv = prompt('Введите CVV-код:');
  
      console.log('Заказ успешно оформлен и оплачен!');
      this.resetCart();
    }
  
    resetCart() {
      this.cart = {
        products: [],
        totalPrice: 0,
      };
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
  
  const app = new App();
  app.run();
  