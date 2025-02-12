document.addEventListener("DOMContentLoaded", function () {
  fetch('exs/text.txt')
    .then(response => response.text())
    .then(textContent => {
      const container = document.getElementById("text");

      // HTMLエスケープ処理
      function escapeHTML(str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      }

      // 文字ごとに分割してHTMLに追加
      textContent.split("").forEach((char) => {
        if (char === "\n") {
          container.appendChild(document.createElement("br")); // 改行を追加
        } else if (char === "\t") {
          const tabSpan = document.createElement("span");
          tabSpan.textContent = "    "; // タブをスペース4つに変換
          container.appendChild(tabSpan);
        } else {
          const span = document.createElement("span");
          span.innerHTML = escapeHTML(char);
          span.classList.add("char");
          container.appendChild(span);
        }
      });

      const chars = document.querySelectorAll(".char");
      const totalChars = chars.length;

      // 画面全体のスクロール進行度に応じて文字を表示
      window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;

        // 画面のスクロール進行度を計算
        const progress = scrollTop / (scrollHeight - clientHeight);

        // 進行度に応じて左側の文字を表示
        const charsToShow = Math.floor(progress * totalChars);
        chars.forEach((char, index) => {
          if (index < charsToShow) {
            char.classList.add("visible");
          } else {
            char.classList.remove("visible");
          }
        });
      });

      // ボタンでエリアの割合を変更
      let isLeftWide = false;

      const button = document.getElementById("resize-button");
      button.addEventListener("click", () => {
        const background = document.querySelector(".background");
        const scrollArea = document.querySelector(".scroll-area");

        if (isLeftWide) {
          // 左エリアを小さく、右エリアを大きく
          background.style.width = "30vw";  // 左エリアの幅を30%
          scrollArea.style.width = "70vw";   // 右エリアの幅を70%
        } else {
          // 左エリアを大きく、右エリアを小さく
          background.style.width = "50vw";  // 左エリアの幅を50%
          scrollArea.style.width = "50vw";  // 右エリアの幅を50%
        }

        // 状態を切り替え
        isLeftWide = !isLeftWide;
      });
    })
    .catch(error => {
      console.error("テキストファイルの読み込みに失敗しました:", error);
    });
});
