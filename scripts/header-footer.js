document.querySelector('.site-header').innerHTML = `
  <div class="left-section-header">
    <a class="brand" href="index.html" aria-label="First eshop αρχική">
      <img class="logo" src="../images/first-eshop-logo.svg" alt="First eshop">
    </a>
    <button class="menu-toggle" id="menuToggle" aria-label="Άνοιγμα μενού" aria-expanded="false">☰</button>
  </div>

  <div class="search-box">
    <input class="search-bar" type="text" placeholder="Αναζήτηση">
    <button class="search-button" aria-label="Αναζήτηση">
      <img class="search-icon" src="../images/search-button.png" alt="">
    </button>
  </div>

  <nav class="main-nav" id="mainNav" aria-label="Κύριο μενού">
    <a class="nav1" href="index.html">Αρχική</a>
    <a class="nav1" href="discounts.html">Προσφορές</a>
    <a class="nav1" href="#categories">Κατηγορίες</a>
    <a href="#cart">Καλάθι <span id="cartBadge" class="js-cart-quantity">0</span></a>
  </nav>
`;

document.querySelector('.site-footer').innerHTML = `
  <div class="footer-section">
    <h3>First eshop</h3>
    <p>Demo e-shop με παπούτσια, προσφορές και γρήγορη αποστολή σε όλη την Ελλάδα.</p>
  </div>

  <div class="footer-section">
    <h4>Μενού</h4>
    <a href="index.html">Αρχική</a>
    <a href="discounts.html">Προσφορές</a>
    <a href="#categories">Κατηγορίες</a>
    <a href="#cart">Καλάθι</a>
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
