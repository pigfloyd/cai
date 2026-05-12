// ===== 主逻辑 =====

var currentIndex = 0;
var recipeListEl = document.getElementById('recipeList');
var bgLayerEl = document.getElementById('bgLayer');
var sidebarEl = document.getElementById('sidebar');
var toggleBtn = document.getElementById('menuToggle');

function renderList() {
  recipeListEl.innerHTML = '';

  recipes.forEach(function (recipe, index) {
    var item = document.createElement('button');
    item.className = 'recipe-item';
    item.innerHTML =
      '<span class="recipe-num">' + String(index + 1).padStart(2, '0') + '</span>' +
      '<span class="recipe-name">' + recipe.name + '</span>';
    item.addEventListener('click', function () {
      selectRecipe(index);
    });
    recipeListEl.appendChild(item);
  });
}

function selectRecipe(index, direction) {
  currentIndex = index;
  showImage(index, direction);

  var items = recipeListEl.querySelectorAll('.recipe-item');
  items.forEach(function (item, i) {
    item.classList.toggle('active', i === index);
  });

  hideSidebar();
}

function showImage(index, direction) {
  var recipe = recipes[index];
  var img = document.createElement('img');
  img.src = 'images/' + recipe.name + '.png';
  img.alt = recipe.name;
  img.className = direction === 'left' ? 'slide-left' : direction === 'right' ? 'slide-right' : 'fade-in';

  bgLayerEl.innerHTML = '';
  bgLayerEl.appendChild(img);
}

function hideSidebar() {
  sidebarEl.classList.add('hidden');
  toggleBtn.classList.add('visible');
}

function showSidebar() {
  sidebarEl.classList.remove('hidden');
  toggleBtn.classList.remove('visible');
}

function toggleSidebar() {
  if (sidebarEl.classList.contains('hidden')) {
    showSidebar();
  } else {
    hideSidebar();
  }
}

toggleBtn.addEventListener('click', toggleSidebar);

// 点击背景图片隐藏列表（滑动时不触发）
var touchStartX = 0;
var touchStartY = 0;
var touchMoved = false;

bgLayerEl.addEventListener('touchstart', function (e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchMoved = false;
});

bgLayerEl.addEventListener('touchmove', function () {
  touchMoved = true;
});

bgLayerEl.addEventListener('touchend', function (e) {
  if (!touchMoved) return;
  var dx = e.changedTouches[0].clientX - touchStartX;
  var dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
  if (dx < 0) {
    selectRecipe((currentIndex + 1) % recipes.length, 'left');
  } else {
    selectRecipe((currentIndex - 1 + recipes.length) % recipes.length, 'right');
  }
});

bgLayerEl.addEventListener('click', function () {
  if (touchMoved) return;
  if (!sidebarEl.classList.contains('hidden')) {
    hideSidebar();
  }
});

function init() {
  if (recipes.length === 0) return;
  renderList();
  selectRecipe(0);
}

init();
