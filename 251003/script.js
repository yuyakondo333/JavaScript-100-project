/**
 * 主な処理の流れ:

- 商品データ定義 → 8つの商品情報を配列で保持
- 商品カード生成 → 各商品のHTML要素を動的に作成して画面に追加
- フィルタリング機能 → カテゴリーボタンで商品を絞り込み表示
- 検索機能 → 商品名で検索して該当商品のみ表示
- 初期表示 → ページ読み込み時にすべての商品を表示
 */

// 商品データ格納オブジェクト
let products = {
  data: [
    {
      productName: 'Regular White T-Shirt',
      category: 'Topwear',
      price: '30',
      image: 'white-tshirt.jpg',
    },
    {
      productName: 'Beige Short Skirt',
      category: 'Bottomwear',
      price: '49',
      image: 'short-skirt.jpg',
    },
    {
      productName: 'Sporty SmartWatch',
      category: 'Watch',
      price: '99',
      image: 'sporty-smartwatch.jpg',
    },
    {
      productName: 'Basic Knitted Top',
      category: 'Topwear',
      price: '29',
      image: 'knitted-top.jpg',
    },
    {
      productName: 'Black Leather',
      category: 'Jacket',
      price: '129',
      image: 'black-leather-jacket.jpg',
    },
    {
      productName: 'Stylish Pink Trousers',
      category: 'Bottomwear',
      price: '89',
      image: 'pink-trousers.jpg',
    },
    {
      productName: "Brown Men's Jacket",
      category: 'Jacket',
      price: '189',
      image: 'brown-jacket.jpg',
    },
    {
      productName: 'Comfy Gray Pants',
      category: 'Bottomwear',
      price: '49',
      image: 'comfy-gray-pants.jpg',
    },
  ],
};

// 商品データの配列をループ処理(iには各商品オブジェクトが入る)
for (let i of products.data) {
  // 商品カード全体を入れるdiv要素を作成
  let card = document.createElement('div');
  // cardに'card'クラス、カテゴリー名のクラス、'hide'クラスを追加
  card.classList.add('card', i.category, 'hide');

  // 画像を入れるコンテナのdiv要素を作成
  let imgContainer = document.createElement('div');
  // imgContainerに'image-container'クラスを追加
  imgContainer.classList.add('image-container');

  // 画像を入れるコンテナのdiv要素を作成
  let image = document.createElement('img');
  // imgContainerに'image-container'クラスを追加
  imgContainer.appendChild(image);
  // img要素を作成
  image.setAttribute('src', i.image);
  // cardの子要素としてimgContainerを追加
  card.appendChild(imgContainer);
  
  // 商品情報（名前と価格）を入れるコンテナのdiv要素を作成
  let container = document.createElement('div');
  // containerに'container'クラスを追加
  container.classList.add('container');

  // 商品名を表示するh5要素を作成
  let name = document.createElement('h5');
  // nameに'product-name'クラスを追加
  name.classList.add('product-name');
  // nameのテキストに商品名を大文字で設定
  name.innerText = i.productName.toUpperCase();
  // containerの子要素としてnameを追加
  container.appendChild(name);

  // 価格を表示するh6要素を作成
  let price = document.createElement('h6');
  // priceのHTMLに'$'記号と価格を設定
  price.innerHTML = '$' + i.price;
  // containerの子要素としてpriceを追加
  container.appendChild(price);

  // cardの子要素としてcontainerを追加
  card.appendChild(container);
  // id='products'の要素の子要素としてcardを追加（画面に表示）
  document.getElementById('products').appendChild(card);
}

// カテゴリーでフィルタリングする関数（valueは選択されたカテゴリー名）
function filterProduct(value) {
  // 全てのカテゴリーボタンを取得
  let buttons = document.querySelectorAll('.button-value');
  // 各ボタンに対してループ処理
  buttons.forEach((button) => {
    // 引数のvalueとボタンのテキストを大文字で比較
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      // 一致する場合は'active'クラスを追加（選択状態にする）
      button.classList.add('active');
    } else {
      // 一致しない場合は'active'クラスを削除（非選択状態にする）
      button.classList.remove('active');
    }
  });

  // 全ての商品カードを取得
  let elements = document.querySelectorAll('.card');

  // 各商品カートに対してループ処理
  elements.forEach((element) => {
    // 'all'が選択された場合
    if (value == 'all') {
      // 全てのカードから'hide'クラスを削除（表示する）
      element.classList.remove('hide');
    } else {
      // 特定のカテゴリーが選択された場合
      // カードが選択されたカテゴリーのクラスを持っているか確認
      if (element.classList.contains(value)) {
        // 持っている場合は'hide'クラスを削除（表示する）
        element.classList.remove('hide');
      } else {
        // 持っていない場合は'hide'クラスを追加（非表示にする）
        element.classList.add('hide');
      }
    }
  });

  // 検索ボタンにクリックイベントリスナーを追加
  document.getElementById('search').addEventListener('click', () => {
    // 検索入力欄の値を取得
    let searchInput = document.getElementById('search-input').value;
    // 全ての商品名要素を取得
    let elements = document.querySelectorAll('.product-name');
    // 全ての商品カードを取得
    let cards = document.querySelectorAll('.card');

    // 各商品名要素に対してループ処理（indexは配列のインデックス番号）
    elements.forEach((element, index) => {
      // 商品名に検索ワードが含まれているか確認（大文字で比較）
      if (element.innerText.includes(searchInput.toUpperCase())) {
        // 含まれている場合は対応するカードから'hide'クラスを削除（表示）
        cards[index].classList.remove('hide');
      } else {
        // 含まれていない場合は対応するカードに'hide'クラスを追加（非表示）
        cards[index].classList.add('hide');
      }
    });
  });
}
// ページ読み込み完了時に実行される関数
window.onload = () => {
  // 初期表示で全ての商品を表示する
  filterProduct('all');
};
