document.querySelector('.site-header').innerHTML = `
  <div class="left-section-header">
    <a class="brand" href="index.html" aria-label="First eshop αρχική">
      <img class="logo" src="../images/first-eshop-logo.svg" alt="First eshop">
    </a>

    <div class="categories-menu">
      <button class="menu-toggle js-categories-button" id="menuToggle" aria-label="Άνοιγμα μενού" aria-expanded="false">☰</button>

      <div class="categories-dropdown js-categories-dropdown">
        <button data-category="all">Όλα</button>
        <button data-category="sneakers">Sneakers</button>
        <button data-category="boots">Μπότες</button>
        <button data-category="sandals">Σανδάλια</button>
        <button data-category="running">Running</button>
      </div>
    </div>
  </div>

  <div class="search-box">
    <input class="search-bar" type="text" placeholder="Αναζήτηση">
    <button class="search-button" aria-label="Αναζήτηση">
      <img class="search-icon" src="../images/search-button.png" alt="">
    </button>
  </div>

  <nav class="main-nav" id="mainNav" aria-label="Κύριο μενού">
    <a class="nav1" href="index.html">Αρχική</a>
    <a class="nav1" ">Προσφορές</a>

    <div class="nav-category-dropdown nav1">
      <a href="#categories" class="js-nav-category-toggle">Κατηγορίες</a>

      <div class="nav-category-menu js-nav-category-menu">
        <button data-category="all">Όλα</button>
        <button data-category="sneakers">Sneakers</button>
        <button data-category="boots">Μπότες</button>
        <button data-category="sandals">Σανδάλια</button>
        <button data-category="running">Running</button>
      </div>
    </div>

    <a href="cart.html">Καλάθι <span id="cartBadge" class="js-cart-quantity">0</span></a>
  </nav>
`;

const categoriesButton = document.querySelector('.js-categories-button');
const categoriesDropdown = document.querySelector('.js-categories-dropdown');

const navCategoryToggle = document.querySelector('.js-nav-category-toggle');
const navCategoryMenu = document.querySelector('.js-nav-category-menu');

categoriesButton.addEventListener('click', () => {
  categoriesDropdown.classList.toggle('active');
});

navCategoryToggle.addEventListener('click', (event) => {
  event.preventDefault();
  navCategoryMenu.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  const clickedInsideMenu =
    event.target.closest('.categories-menu') ||
    event.target.closest('.nav-category-dropdown');

  if (!clickedInsideMenu) {
    categoriesDropdown.classList.remove('active');
    navCategoryMenu.classList.remove('active');
  }
});

document.querySelectorAll('[data-category]').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    const isIndexPage = window.location.pathname.endsWith('/index.html') ||
                        window.location.pathname.endsWith('/');

    if (!isIndexPage) {
      window.location.href = `index.html?category=${category}`;
    }
  });
});



document.querySelector('.site-footer').innerHTML = `
  <div class="footer-section">
    <h3>First eshop</h3>
    <p>Demo e-shop με παπούτσια, προσφορές και γρήγορη αποστολή σε όλη την Ελλάδα.</p>
  </div>

  <div class="footer-section">
    <h4>Μενού</h4>
    <a href="index.html">Αρχική</a>
    <a>Προσφορές</a>
    <a href="#categories">Κατηγορίες</a>
    <a href="cart.html">Καλάθι</a>
  </div>

  <div class="footer-section">
    <h4>Επικοινωνία</h4>
    <p>Email: info@firsteshop.gr</p>
    <p>Τηλ: 210 000 0000</p>
    <p>Αθήνα, Ελλάδα</p>
  </div>

  <div class="footer-bottom">
    <p>© 2026 First eshop. All rights reserved.</p>
  </div>
`;
