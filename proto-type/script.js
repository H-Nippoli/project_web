// テキストファイルを読み込んで表示
fetch('exs/text.txt')
  .then((response) => response.text())
  .then((textContent) => {
    const container = document.getElementById("text");

    // 文字を分割してHTMLに挿入
    textContent.split("").forEach((char) => {
      if (char === "\n") {
        const br = document.createElement("br");
        container.appendChild(br); // 改行を挿入
      } else {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("char");
        container.appendChild(span);
      }
    });

    const chars = document.querySelectorAll(".char");
    const totalScrollHeight = document.body.scrollHeight - window.innerHeight;

    // スクロール量に応じて文字を表示
    document.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const progress = scrollTop / totalScrollHeight; // スクロール進行度（0～1）
      const charsToShow = Math.floor(progress * chars.length); // 表示する文字数

      chars.forEach((char, index) => {
        if (index < charsToShow) {
          char.classList.add("visible");
        } else {
          char.classList.remove("visible");
        }
      });
    });
  })
  .catch((error) => {
    console.error("テキストファイルの読み込みに失敗しました:", error);
  });
