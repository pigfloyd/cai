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

function selectRecipe(index) {
  currentIndex = index;
  showImage(index);

  var items = recipeListEl.querySelectorAll('.recipe-item');
  items.forEach(function (item, i) {
    item.classList.toggle('active', i === index);
  });

  hideSidebar();
}

function showImage(index) {
  var recipe = recipes[index];
  var img = document.createElement('img');
  img.src = recipe.image;
  img.alt = recipe.name;
  img.className = 'fade-in';

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

// 点击背景图片隐藏列表
bgLayerEl.addEventListener('click', function () {
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
