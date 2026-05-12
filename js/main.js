// ===== 主逻辑 =====

var currentIndex = 0;
var recipeListEl = document.getElementById('recipeList');
var illustrationEl = document.getElementById('illustration');

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
  showIllustration(index);

  var items = recipeListEl.querySelectorAll('.recipe-item');
  items.forEach(function (item, i) {
    item.classList.toggle('active', i === index);
  });
}

function showIllustration(index) {
  var recipe = recipes[index];
  illustrationEl.classList.remove('fade-in');
  void illustrationEl.offsetWidth;

  illustrationEl.innerHTML = '<img src="' + recipe.image + '" alt="' + recipe.name + '">';
  illustrationEl.classList.add('fade-in');
}

function init() {
  if (recipes.length === 0) {
    illustrationEl.innerHTML =
      '<div class="empty-state"><span class="empty-icon">&#127858;</span><p>请在 data.js 中添加菜谱</p></div>';
    return;
  }
  renderList();
  selectRecipe(0);
}

init();
