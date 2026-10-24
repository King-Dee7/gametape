/* ========================================================
   GAME TAPE FUNNEL HELPERS
   Shared by the after-checkout pages. Remembers what the buyer
   picked so the thank-you page can show the order. This is a
   prototype: in HighLevel the order comes from the payment, not
   from the browser.
   ======================================================== */

const ORDER_KEY = 'gt_order';

function readOrder() {
  try {
    return JSON.parse(localStorage.getItem(ORDER_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveOrder(changes) {
  const order = Object.assign(readOrder(), changes);
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch (e) {}
  return order;
}

function goTo(page, changes) {
  if (changes) saveOrder(changes);
  window.location.href = page;
}

// Fill in the buyer's first name wherever data-first-name appears.
// data-prefix (e.g. ", ") is added only when there is a name.
function fillFirstName() {
  const name = (readOrder().name || '').trim().split(' ')[0];
  document.querySelectorAll('[data-first-name]').forEach(el => {
    el.textContent = name ? (el.dataset.prefix || '') + name : '';
  });
}

document.addEventListener('DOMContentLoaded', fillFirstName);
