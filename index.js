

let bagItems;
onLoad();


function onLoad(){
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
displayItemsOnHomePage();
displayBagIcon();
};

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagIcon();
} ;

function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag-item-count");

  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
  bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = 'hidden';
  }
};



function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector(".items-container");
  if (!itemsContainerElement) {
      return;
  }
  let innerHTML = '';
  items.forEach(item => {
      innerHTML += `  <div class="item-container">
          <img src="${item.image}" class="item-image">
          <div class="rating">
             ${item.rating.stars} ⭐  | ${item.rating.count}
          </div>
          <div class="company-name">
             ${item.company}
          </div>
          <div class="item-name">${item.item_name}</div>
          <div class="price">
              <span class="current-price">Rs ${item.current_price}</span>
              <span class="original-price">Rs ${item.original_price}</span>
              <span class="discount">${item.discount_percentage}% OFF</span>
          </div>
          <button class="btn-add-bag" onClick="addToBag(${item.id})" >Add to Bag</button>
      </div>`
  });

  itemsContainerElement.innerHTML = innerHTML;
}

const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const itemsContainerElement = document.querySelector(".items-container");

  if (!itemsContainerElement) {
      return;
  }

  const itemElements = Array.from(itemsContainerElement.getElementsByClassName('item-container'));
  itemElements.forEach(itemElement => {
      const text = itemElement.textContent.toLowerCase();
      if (text.includes(query)) {
          itemElement.style.display = '';
      } else {
          itemElement.style.display = 'none';
      }
  });
});





