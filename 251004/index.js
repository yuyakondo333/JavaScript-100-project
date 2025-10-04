// ============================
// DOM要素の取得
// ============================
let container = document.querySelector('.container'); // グリッドを表示するコンテナ
let gridButton = document.getElementById('submit-grid');  // グリッド作成ボタン
let clearGridButton = document.getElementById('clear-grid');  // グリッドクリアボタン
let gridWidth = document.getElementById('width-range');  // 幅のスライダー
let gridHeight = document.getElementById('height-range');  // 高さのスライダー
let colorButton = document.getElementById('color-input');  // カラーピッカー
let eraseBtn = document.getElementById('erase-btn');  // 消しゴムボタン
let paintBtn = document.getElementById('paint-btn');  // ペイントボタン
let widthValue = document.getElementById('width-value');  // 幅の値を表示する要素
let heightValue = document.getElementById('height-value');  // 高さの値を表示する要素

// ============================
// イベント定義（マウス/タッチ対応）
// ============================
let events = {
  mouse: {
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup',
  },
  touch: {
    down: 'touchstart',
    move: 'touchmove',
    up: 'touchend',
  },
};

// ============================
// グローバル変数
// ============================
let deviceType = '';  // デバイスタイプ('mouse' または 'touch')
let draw = false;  // 描画中かどうかのフラグ
let erase = false;  // 消しゴムモードかどうかのフラグ

// ============================
// デバイスタイプの判定
// ============================
const isTouchDevice = () => {
  try {
    // TouchEventが作成できればタッチデバイス
    document.createEvent('TouchEvent');
    deviceType = 'touch';
    return true;
  } catch (e) {
    // エラーが出ればマウスデバイス
    deviceType = 'mouse';
    return false;
  }
};

// 初期化時にデバイスタイプを判定
isTouchDevice();

// ============================
// グリッド作成機能
// ============================
gridButton.addEventListener('click', () => {
  // 既存のグリッドをクリア
  container.innerHTML = '';
  let count = 0;  // グリッドセルのユニークID用カウンター

  // 行を作成（縦方向のループ）
  for (let i = 0; i < gridHeight.value; i++) {
    count++;
    let div = document.createElement('div');
    div.classList.add('gridRow');  // 行クラスを追加

    // 列を作成（横方向のループ）
    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement('div');
      col.classList.add('gridCol'); // 列のクラスを追加
      col.setAttribute('id', `gridCol${count}`); // ユニークIDを設定

      // ============================
      // マウスダウン/タッチスタートイベント
      // ============================
      col.addEventListener(events[deviceType].down, () => {
        draw = true; // 編集モードオン
        // 消しゴムモードか塗りつぶしモードかで処理を分岐
        if (erase) {
          col.style.backgroundColor = 'transparent';
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });

      // ============================
      // マウスムーブ/タッチムーブイベント
      // ============================
      col.addEventListener(events[deviceType].move, (e) => {
        // カーソル位置の要素を取得
        let element = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        );
        // 要素のIDを取得（nullの場合は空文字）
        let elementId = element ? element.id : '';
        // checker関数でドラッグの中の塗りつぶし処理
        checker(elementId);
      });

      // ============================
      // マウスアップ/タッチエンドイベント
      // ============================
      col.addEventListener(events[deviceType].up, () => {
        draw = false;  // 描画モードオフ
      });

      div.appendChild(col);  // 列を行に追加
    }

    container.appendChild(div);  // 行をコンテナに追加
  }
});

// ============================
// ドラッグの中の塗りつぶしチェック
// ============================
function checker(elementId) {
  // IDが空の場合は何もしない
  if (!elementId) return;

  // 全てのグリッドセルを取得
  let gridColumns = document.querySelectorAll('.gridCol');
  gridColumns.forEach((element) => {
    // カーソル位置の要素と一致する場合
    if (elementId == element.id) {
      // 描画モードかつイベントモード
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      }
      // 描画モードかつ消しゴムモード
      else if (draw && erase) {
        element.style.backgroundColor = 'transparent';
      }
    }
  });
}

// ============================
// グリッドクリア機能
// ============================
clearGridButton.addEventListener('click', () => {
  container.innerHTML = '';  // コンテナを空にする
});

// ============================
// 消しゴムモード切り替え
// ============================
eraseBtn.addEventListener('click', () => {
  erase = true;  // 消しゴムモードオン
});


// ============================
// ペイントモード切り替え
// ============================
paintBtn.addEventListener('click', () => {
  erase = false;
});

// ============================
// 幅スライダーの値表示更新
// ============================
gridWidth.addEventListener('input', () => {
  widthValue.innerHTML =
    gridWidth.value < 10 ? `0${gridWidth.value}` : gridWidth.value;
});

// ============================
// 高さスライダーの値表示更新
// ============================
gridHeight.addEventListener('input', () => {
  // 10未満の場合は先頭に0をつける(例; 05, 09)
  heightValue.innerHTML =
    gridHeight.value < 10 ? `0${gridHeight.value}` : gridHeight.value;
});

// ============================
// 初期化処理
// ============================
window.onload = () => {
  // スライダーの初期値を0に設定
  gridHeight.value = 0;
  gridWidth.value = 0;

  // 表示値も00に設定
  widthValue.innerHTML = '00';
  heightValue.innerHTML = '00';
};
