module.exports = function () {
    const css = `.info-3pQQBb::before {
        display: block;
        content: "CatCord 🐈‍⬛" !important;
        color: var(--text-muted);
        font-weight: bold;
        font-size: 14px;
        padding-bottom: 8px;
        margin-bottom: 6px;
      }`
      const element = document.createElement("style")
      element.id = "catcord.internal.info"
      element.innerHTML = css
      document.head.appendChild(element)
}