let skioData = null;
let selectedVariants = [];
let variantQuantities = new Map();
let percentDiscountTier = null;
let subscriptionDiscount = 0;

function refreshCart() {
  fetch('/cart.js', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(cart => {
      // Update your cart UI here. For example, updating a cart drawer:
      document.getElementById('cart-content').innerHTML = `
      <p>Total Items: ${cart.item_count}</p>
      <p>Total Price: ${cart.total_price / 100}</p>
    `;
      console.log('Cart refreshed:', cart);
    })
    .catch(error => {
      console.error('Error refreshing cart:', error);
    });
}

function updateVariantQuantity(variant, increment = true) {
  const currentQty = variantQuantities.get(variant.platformId) || 0;
  const bundleSize = parseInt(document.querySelector('.bundle-btn.selected').textContent);
  const totalSelected = Array.from(variantQuantities.values()).reduce((a, b) => a + b, 0);

  if (increment && totalSelected >= bundleSize) return;

  const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);

  if (newQty === 0) {
    variantQuantities.delete(variant.platformId);
    const index = selectedVariants.findIndex(v => v.platformId === variant.platformId);
    if (index > -1) selectedVariants.splice(index, 1);
  } else {
    variantQuantities.set(variant.platformId, newQty);
    const existingIndex = selectedVariants.findIndex(v => v.platformId === variant.platformId);
    if (existingIndex === -1) {
      selectedVariants.push({
        platformId: variant.platformId,
        productVariantTitle: variant.productVariantTitle,
        imageSrc: '',
        price: variant.price,
        inventory: variant.inventory
      });
    }
  }

  updateAllQuantityDisplays();
}

function updateSelectedVariantsList() {
  const listContainer = document.querySelector('.selected-variants-list');
  if (!listContainer) return;

  if (selectedVariants.length === 0) {
    listContainer.innerHTML = '<p class="empty-selection">No flavors selected</p>';
    return;
  }

  const variantsList = selectedVariants.map(variant => `
    <div class="selected-variant-item">
      <div class="variant-color-block-small"></div>
      <div class="variant-details">
        <span class="variant-name">${variant.productVariantTitle}</span>
        <div class="quantity-controls">
          <button class="qty-btn minus" data-variant-id="${variant.platformId}">-</button>
          <span class="qty-display">${variantQuantities.get(variant.platformId)}</span>
          <button class="qty-btn plus" data-variant-id="${variant.platformId}">+</button>
        </div>
      </div>
    </div>
  `).join('');

  listContainer.innerHTML = variantsList;

  listContainer.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const variantId = e.target.dataset.variantId;
      const isIncrement = e.target.classList.contains('plus');
      const variant = skioData.DynamicBox.selectableProductVariants[0].productVariants
        .find(v => v.platformId === variantId);

      updateVariantQuantity(variant, isIncrement);
    });
  });
}

function updatePricesForVariant(variantId) {
  if (!skioData) return;
  const selectedVariant = skioData.DynamicBox.selectableProductVariants[0].productVariants
    .find(v => v.platformId === variantId);
  if (selectedVariant) {
    const bundleSize = document.querySelector('.bundle-btn.selected').textContent;
    updatePrices(bundleSize, skioData.DynamicBox.selectableProductVariants[0].productVariants[0].price);
  }
}

function getBundleDiscount(quantity) {
  // Get bundle discount from percentDiscountTier or use defaults
  if (percentDiscountTier && percentDiscountTier[quantity]) {
    console.log('Using custom discount for', quantity, 'items');
    return percentDiscountTier[quantity] / 100;
  }
  
  // Default fallback discounts
  const defaultDiscounts = {
    1: 0,      // No bundle discount for 1
    2: 0.05,   // 5% off for 2
    3: 0.10,   // 10% off for 3
    4: 0.15    // 15% off for 4
  };
  
  return defaultDiscounts[quantity] || 0;
}

function updatePrices(bundleSize, variantPrice) {
  const quantity = parseInt(bundleSize);
  const regularPrice = (variantPrice * quantity).toFixed(2);
  
  // Calculate discounts
  const bundleDiscount = getBundleDiscount(quantity);
  
  // Calculate both prices
  const oneTimePrice = bundleDiscount > 0 
    ? (regularPrice * (1 - bundleDiscount)).toFixed(2)
    : regularPrice;

  const subscriptionPrice = (oneTimePrice * (1 - subscriptionDiscount)).toFixed(2);

  // Always update both price displays
  document.querySelector('.price').innerHTML = 
    `<del>$${oneTimePrice}</del> <strong>$${subscriptionPrice}</strong>`;
  document.querySelector('.one-time-price').textContent = `$${oneTimePrice}`;

  // Update save tag with best possible savings
  const saveTag = document.querySelector('.save-tag');
  if (saveTag) {
    const maxSavingsPercent = Math.round((1 - (subscriptionPrice / regularPrice)) * 100);
    saveTag.textContent = `SAVE ${maxSavingsPercent}% ON FIRST ORDER`;
  }
}

function updateAllQuantityDisplays() {
  document.querySelectorAll('.variant-row').forEach(row => {
    const variantId = row.dataset.variantId;
    const qty = variantQuantities.get(variantId) || 0;
    const qtyDisplay = row.querySelector('.qty-display');
    const minusBtn = row.querySelector('.qty-btn.minus');
    if (qtyDisplay) qtyDisplay.textContent = qty;
    if (minusBtn) minusBtn.disabled = qty === 0;
  });
  updateSelectedVariantsList();
  updateButtons();
}

function updateButtons() {
  const bundleSize = parseInt(document.querySelector('.bundle-btn.selected').textContent);
  const totalQuantity = Array.from(variantQuantities.values()).reduce((a, b) => a + b, 0);
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.disabled = totalQuantity !== bundleSize;
    addToCartBtn.innerHTML = `Add to Cart (${totalQuantity}/${bundleSize})`;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('https://api.skio.com/storefront-http/get-dynamic-box', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productPlatformId: '9761425097008' }),
  })
    .then((response) => response.json())
    .then((data) => {
      skioData = data;

      console.debug('Skio data:', data);

      percentDiscountTier = data.DynamicBox.percentDiscountTier;
      
      const sellingPlanGroup = data.DynamicBox.sellingPlanGroup;
      const keys = Object.keys(sellingPlanGroup);

      if (keys.length > 0) {
        const firstPlan = sellingPlanGroup[keys[0]];
        subscriptionDiscount = firstPlan.priceAdjustmentAmount / 100;
        console.log('Subscription discount:', subscriptionDiscount);
      }
    
      const variants = data.DynamicBox.selectableProductVariants[0].productVariants;
  
      // Render variants first
      renderVariants(variants);
      
      // Get initial bundle size and trigger price update
      const initialBundleSize = document.querySelector('.bundle-btn.selected').textContent;
      const initialPrice = variants[0].price;
      updatePrices(initialBundleSize, initialPrice);
    })
    .catch((error) => {
      console.error('Error fetching Skio data:', error);
    });

  function renderVariants(variantData) {
    const variantGrid = document.querySelector('.variant-grid');
    if (!variantGrid || !variantData) return;

    const variantHTML = variantData.map((variant) => {
      const currentQty = variantQuantities.get(variant.platformId) || 0;
      return `
        <div class="variant-row" 
             data-variant-id="${variant.platformId}"
             data-price="${variant.price}">
          <div class="variant-image">
            <img src="${variant.imageSrc}" alt="${variant.productVariantTitle}" 
                 width="60" height="60" loading="lazy">
          </div>
          <div class="variant-info">
            <span class="variant-name">${variant.productVariantTitle}</span>
            ${variant.inventory <= 0 ? '<span class="sold-out">Sold Out</span>' : ''}
          </div>
          <div class="variant-actions">
            <div class="quantity-controls">
              <button class="qty-btn minus" data-variant-id="${variant.platformId}" ${currentQty === 0 ? 'disabled' : ''}>-</button>
              <span class="qty-display">${currentQty}</span>
              <button class="qty-btn plus" data-variant-id="${variant.platformId}" ${variant.inventory <= 0 ? 'disabled' : ''}>+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    variantGrid.innerHTML = variantHTML;
    attachQuantityHandlers();
  }

  function attachQuantityHandlers() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const variantId = e.target.dataset.variantId;
        const isIncrement = e.target.classList.contains('plus');
        const variant = skioData.DynamicBox.selectableProductVariants[0].productVariants
          .find(v => v.platformId === variantId);
        if (!variant) return;
        updateVariantQuantity(variant, isIncrement);
      });
    });
  }

  document.querySelectorAll('.bundle-btn').forEach((button) => {
    button.addEventListener('click', function () {
      document.querySelectorAll('.bundle-btn').forEach((btn) => btn.classList.remove('selected'));
      this.classList.add('selected');
      const selectedVariantRow = document.querySelector('.variant-row.selected');
      if (selectedVariantRow) {
        updatePricesForVariant(selectedVariantRow.dataset.variantId);
      } else {
        updatePrices(this.textContent, skioData.DynamicBox.selectableProductVariants[0].productVariants[0].price);
      }
    });
  });

  ['subscribe', 'one-time'].forEach(id => {
    const radio = document.getElementById(id);
    if (radio) {
      radio.addEventListener('change', () => {
        const selectedBundle = document.querySelector('.bundle-btn.selected').textContent;
        const selectedVariantRow = document.querySelector('.variant-row.selected');
        if (selectedVariantRow) {
          updatePricesForVariant(selectedVariantRow.dataset.variantId);
        } else {
          updatePrices(selectedBundle, skioData.DynamicBox.selectableProductVariants[0].productVariants[0].price);
        }
        updateButtons();
      });
    }
  });

  async function handleSubscriptionAddToCart() {
    const items = Array.from(variantQuantities.entries()).map(([variantId, quantity]) => {
      const numericId = variantId.split('/').pop();
      const sellingPlanGroup = skioData.DynamicBox.sellingPlanGroup;
      const fullSellingPlanId = Object.keys(sellingPlanGroup)[0];
      const sellingPlanId = fullSellingPlanId.split("/").pop();
  
      return { 
        id: numericId,
        quantity: quantity,
        selling_plan: sellingPlanId,
        properties: {
          _dynamicBoxIndex: "0",
          _dynamicBoxId: skioData.DynamicBox.boxId,
          _skio_subscription: true
        } 
      };
    });
  
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
  }
  
  async function handleOneTimeAddToCart() {
    const items = Array.from(variantQuantities.entries()).map(([variantId, quantity]) => {
      const numericId = variantId.split('/').pop();
      return { 
        id: numericId,
        quantity: quantity,
        properties: {
          _dynamicBoxIndex: "0",
          _dynamicBoxId: skioData.DynamicBox.boxId,
        } 
      };
    });
  
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    })
  }
  
  document.querySelector('.add-to-cart-btn').addEventListener('click', async function() {
    if (this.disabled) return;
    const originalText = this.textContent;
    
    try {
      this.textContent = 'Adding...';
      this.disabled = true;
  
      const isSubscription = document.getElementById('subscribe').checked;
      const response = await (isSubscription ? handleSubscriptionAddToCart() : handleOneTimeAddToCart());
  
      if (!response.ok) throw new Error('Add to cart failed');

      const this_cartDrawer = document.querySelector('cart-drawer');
      this_cartDrawer.refresh(true);

      await response.json();
      this.textContent = 'Added to Cart!';
      selectedVariants = [];
      variantQuantities.clear();
      updateAllQuantityDisplays();
      
      if (typeof window.refreshCart === 'function') {
        window.refreshCart();
      }
    } catch (error) {
      console.error('Error:', error);
      this.textContent = 'Error - Try Again';
    } finally {
      setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
      }, 2000);
    }
  });
});
