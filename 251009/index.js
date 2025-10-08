const download = document.querySelector('.download');  // ダウンロードボタンの要素を取得して download定数に格納
const dark = document.querySelector('.dark');  // QRコードの暗い色を選択するカラーピッカーの要素を取得
const light = document.querySelector('.light');  // QRコードの明るい色を選択するカラーピッカーの要素を取得
const qrContainer = document.querySelector('#qr-code');  // QRコードを表示するコンテナ要素を取得（idが"qr-code"の要素)
const qrText = document.querySelector('.qr-text');  // QRコードに変換するテキストを入力する入力欄の要素を取得
const shareBtn = document.querySelector('.share-btn');  // 共有ボタンの要素を取得
const sizes = document.querySelector('.sizes');  // QRコードのサイズを選択するセレクトボックスの要素を取得

dark.addEventListener('input', handleDarkColor);  // 暗い色のカラーピッis_followはなーに inputイベントを設定し、変更時に handleDarkColor関数を実行
light.addEventListener('input', handleLightColor);  // 明るい色のカラーピッカーに inputイベントを設定し、変更時に handleLightColor関数を実行
qrText.addEventListener('input', handleQRText);  // テキスト入力欄に inputイベントを設定し、入力時に handleQRText関数を実行
sizes.addEventListener('change', handleSize);  // サイズセレクトボックスに changeイベントを設定し、変更時に handleSize関数を実行
shareBtn.addEventListener('click', handleShare);  // 共有ボタンに clickイベントを設定し、クリック時に handleShare関数を実行

const defaultUrl = 'https://youtube.com/@AsmrProg';  // デフォルトのURLを定数として定義（YouTubeチャンネルのURL）
let colorLight = '#fff',  // 明るい色の初期値を白石（#fff)に設定
  colorDark = '#000',  // 暗い色の初期値の黒色（#000)に設定
  text = defaultUrl,  // QRコードに変換するテキストの初期値をデフォルトURLに設定
  size = 300;  // QRコードのサイズの初期値を300ピクセルに設定

function handleDarkColor(e) {  // 暗い色が変更された時の処理を行う関数を定義（引数 eはイベントオブジェクト）
  colorDark = e.target.value;  // イベントが発生した要素（カラーピッカー）の値を colorDark変数に代入
  generateQRCode();  // 新しい色で QRコードを再生成する関数を呼び出し
}

function handleLightColor(e) {  // 暗い色が変更された時の処理を行う関数を定義（引数 eはイベントオブジェクト）
  colorLight = e.target.value;  // イベントが発生した要素（カラーピッカー）の値を colorLight変数に代入
  generateQRCode();  // 新しい色で QRコードを再生成
}

function handleQRText(e) {  // テキスト入力欄の内容が変更された時の処理を行う関数を定義
  const value = e.target.value;  // 入力された値を value定数に取得
  text = value;  // 入力された値を text変数に代入
  if (!value) {  // 入力された値が空（falsy）かどうかチェック
    text = defaultUrl;  // 値がからの場合、textをデフォルトURLに戻す
  }
  generateQRCode();  // 新しいテキストで QRコードを再生成
}

async function generateQRCode() { // QRコードを生成する非同期関数を定義
  qrContainer.innerHTML = '';  // 既存のQRコードを削除するため、コンテナの中身を空にする
  new QRCode('qr-code', {  // QRCodeライブラリを使って新しい QRコードを生成開始（第一引数は要素のID）
    text,   // QRコードに変換するテキストを指定
    height: size,   // QRコードの高さを指定
    width: size,    // QRコードの幅を指定
    colorLight,   // QRコードの明るい部分の色を指定
    colorDark,    // QRコードの暗い部分の色を指定
  });
  download.href = await resolveDataUrl();   // QRコードの画像URLを非同期で取得し、ダウンロードリンクの href属性に設定
}

async function handleShare() {    // 共有ボタンがクリックされた時の処理を行う非同期関数を定義
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], 'QRCode.png', {
        type: blob.type,
      });
      await navigator.share({
        files: [file],
        title: text,
      });
    } catch (error) {
      alert("Your browser doesn't support sharing.");
    }
  }, 100);
}

function handleSize(e) {
  size = e.target.value;
  generateQRCode();
}

function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector('#qr-code img');
      if (img.currentSrc) {
        resolve(img.currentSrc);
        return;
      }
      const canvas = document.querySelector('canvas');
      resolve(canvas.toDataURL());
    }, 50);
  });
}
generateQRCode();
