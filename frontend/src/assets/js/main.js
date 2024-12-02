/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');

  this.scrollY >= 350
    ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

/*=============== SHOW DROPDOWN ===============*/
const showDropdown = (btn, dropdownId) => {
  const dropdownBtn = document.getElementById(btn);
  const dropdownList = document.getElementById(dropdownId);

  dropdownBtn.addEventListener('click', () => {
    dropdownList.classList.toggle('show-dropdown');
  });
};

showDropdown('account', 'dropdown__list');
