// Addボタンのクリックイベントを設定
document.querySelector('#push').onclick = function () {
  // 入力値のバリデーション
  if (document.querySelector('#newtask input').value.length == 0) {
    alert('Please Enter a Task');
  } else {
    // 新しいタスク要素をDOMに追加
    // テンプレートリテラルで入力値を埋め込む
    document.querySelector('#tasks').innerHTML += `
      <div class="task">
        <span id="taskname">
          ${document.querySelector('#newtask input').value}
        </span>
        <button class="delete">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    `;

    // 全ての削除ボタンに対してイベントリスナーを再設定
    let current_tasks = document.querySelectorAll('.delete');
    for (let i = 0; i < current_tasks.length; i++) {
      // this: クリックされた削除ボタン自身
      // parentNode: その親要素(.task)を削除
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
      };
    }

    // 全てのタスク要素に対してクリックイベントを設定
    let tasks = document.querySelectorAll('.task');
    // tasksの数だけループ
    for (let i = 0; i < tasks.length; i++) {
      // completedクラスの付け外しで完了状態を切り替え
      tasks[i].onclick = function () {
        this.classList.toggle('completed');
      };
    }

    // 入力欄をクリア
    document.querySelector('#newtask input').value = '';
  }
};
