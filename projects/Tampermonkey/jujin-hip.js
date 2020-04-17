// ==UserScript==
// @name         juejin-hip
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       MonchiLin
// @match        https://juejin.im/*
// @grant        none
// ==/UserScript==

// TODO 切换黑名单显示 - 1. 仍然会显示但是显示为 “被屏蔽” 2.直接隐藏
// TODO 添加黑名单

if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
    function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;
      do {
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== el) {
        }
      } while ((i < 0) && (el = el.parentElement));
      return el;
    };
}

(function () {
  'use strict';

  const poller = (condition) => {
    return new Promise(resolve => {
      let timer = setInterval(() => {
        if (condition()) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  }
  const id = i => i

  const BLOCKS_KEY = "JUJIN:HIP:BLOCKS_KEY"

  const DOMCreator = {
    blocker() {
      const blocker = document.createElement("div")
      const text = document.createElement("span")
      text.innerText = "根据黑名单设置，该用户已被屏蔽"
      blocker.appendChild(text)

      blocker.style = `
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      color: #0000004d;
    `

      return blocker
    },
    close() {
      const node = document.createElement("img")
      node.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADWElEQVRIie1VTWwTVxD+5u3aGy92bFACSUggkEYhIUDs8HeFtIfS9tgD5dZD6akqEgghRBQBkfi5wAUhIbXHKqqEkHKoKiIsDggksOM2Ki0laewYETAprGNnHdvZN1ywtU7sDXcYaaXdN99838y892aBj1bDMmNNPalwo9e+pq4WxMwUeZbbq1jWVyxoCxjrQUgB/J8gZXRXq+chETEAGGMtn0nw75qljAA4XOIgJ4FoIjvAwGUCgk4wZj7R3+67kwo3ejVLucGEm4GBF786ijAzjc+YZwAeWi2RUgiYBoOb9WEi4lM/jx9it3L/wpGdbwBbu4bCYbU43dA8/O2OZGzGHAR4iKXE7OTfWDTSNdnrAn40f9JNJMS58YQJAOelYPYULF5RyemfJtqkWDr89YHOCIDbLC2KXb+KrvkCDDNTVaDJ64fH7cEDdxF93/8IEkIK5k/72n1hO66iFcxM0ZmFCAHB2SePEbg1Cq/iwta16x17lcwaiH8+gI3beiAIsd6Neqh0GABA2MHReG5faZML2XmYeXNVAQBYWDSRz6RhSUbR4r5Y0txt91eIkGIdqkX0pyeHhMwCAFJqEX+o2bKvTnVVYCXLL2qKQFJnLZGGvMBcdyMeFF8h2VEPb16WfcaiWYElquSpEGHCOk2tfmJbpAbrcRKhY9+gMJFAh1Jf9rkUpQLLjIaaIsT4f2tjHTS1skAASFhZoKsFE1dH4O7dhOeUL/syhdxy+KuaIt6lv9JPnhvIL0kst6zfjdapefQr67Dh6WvMe1cmYqtl0v5Vvoz56JEekb5y1ND2IOn7bkXY9qy7/N7KOlD96pRyH61aiVsrzDAwsuDaPq0uPYPbWw9d0zFlpJzYMPnmJdZoa6D5/KWlR6FNetSOWbHLkXjmIBGNsZQUu37F8cYDQED34V9/HXYd/QEkhITgg6E2311HEQCIxhfOgPgsS4kXT/9BLm3UFPH4A2jq3AYSAi6eG+5+ffKeGhr5zY6p+j8JbtbPjydMJiHONnf1vM8Ulkw02Ju+eM0C9i93OhLE4pkDkugygH4H2CMIPr68RXarWklpIve1+y4x855Y0tzNLL9kUAcBGxh4SeApkBgNtukR+zB8bxHXlrnZ4nTDLwDwjuDhu+cDt7fSDVC6j4eimgAAAABJRU5ErkJggg==`
      node.style.cursor = "pointer"
      node.setAttribute("title", "移除")
      return node
    },
    add() {
      const node = document.createElement("img")
      node.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAABXklEQVQokZWRP0sjARTEfy8bjUk8hVh4txsULBMRtIwgwnlXXXsguqiVH+GKs7Mx38EupyB+AsGQyj+dlSYn19zBxj0ULcQkbtzdZ7EYTKyccngzb5iBd0J6Cdf1cr4vBQDD0GPTTNTuy9Y34HZooX4afzm8utKUans7CFgSUQDCEHUcb9f/a29U/kyn4CcdgWp7+8nzluqVPahXo9dWXqzPi/bjxI6cl0/WOpFc18sFARf/DkqM3ZyRSH9AUNrNJs7oDNmvtoqQM83E7xiA70tBBKhXGUiluR4c4X8yQ38yCW4NVURVZoEokmEQi8cFpLsDEfCDsIuLAWSuf0wFLVc1m6fVaDLauOVj647GQxOyeQCF8KirVsfxfgXBk+1U9lHnInIbm8Sa/06fISUzm17tRIpa6l83DHT8y7L9ykiBUuZua/PNcMXi4TDAysrcJ9VoOAiPLWvgsnfcd+EZjXuFzxGB0PEAAAAASUVORK5CYII="
      node.style.cursor = "pointer"
      node.setAttribute("title", "加入")
      return node
    },
  }

  class HIP {
    blocker = DOMCreator.blocker()

    modal
    modalVisible = false

    constructor() {

    }

    set blocks(val) {
      try {
        localStorage.setItem(BLOCKS_KEY, JSON.stringify(val))
      } catch (e) {
        localStorage.setItem(BLOCKS_KEY, JSON.stringify([]))
      }
    }

    get blocks() {
      try {
        return JSON.parse(localStorage.getItem(BLOCKS_KEY))
      } catch (e) {
        return []
      }
    }

    handlePin = () => {
      const pins = document.querySelector(".pin-list")
      console.log(pins)
    }

    handleArticle = async () => {
      await poller(() => document.querySelector(".entry-list"))
      const target = document.querySelector(".entry-list");
      const observe = new MutationObserver((mutations, observe) => {
        [...target.childNodes]
          // 节点里面有一些注释（Comment）节点，直接过滤掉
          .filter(node => node.childNodes.length > 0)
          .map(node => node.querySelector(".meta-row .meta-list"))
          // TODO 有可能是推荐沸点，这里先过滤掉不处理
          .filter(id)
          // 副作用，为每一个文章添加一个加入黑名单按钮
          .map(node => {
            const lastChild = node.children[node.children.length - 1]
            // 用户名节点
            const nameNode = node.querySelector(".username")
            const username = nameNode.textContent

            if (lastChild.tagName !== "IMG") {
              const addBtn = DOMCreator.add()
              addBtn.addEventListener("click", (e) => {
                e.stopPropagation()
                e.preventDefault()
                const blocks = this.blocks
                if (!blocks.includes(username)) {
                  this.blocks = [...blocks, username]
                  alert("刷新页面后生效")
                }
              })
              node.appendChild(addBtn)
            }
            return node
          })
          .map(node => node.querySelector(".username"))
          .filter(node => {
            // 用户名
            const username = node.textContent
            return this.blocks.includes(username)
          })
          .forEach(node => {
            // console.log("[ ", node.innerText, " ]已被屏蔽")
            const article = node.closest("li[data-growing-title='entryList']")
            article.innerHTML = ""
            article.appendChild(this.blocker)
          })
      });
      observe.observe(target, {childList: true});
    }

    async loadSetting() {
      await poller(() => document.querySelector(".main-container nav ul.nav-list"))
      const navigation = this.navigation || (this.navigation = document.querySelector(".main-container nav ul.nav-list"))
      const newNode = navigation.childNodes[0].cloneNode(true)
      newNode.className = "nav-item"
      newNode.childNodes[0].textContent = "黑名单设置"
      navigation.appendChild(newNode)

      newNode.addEventListener("click", (e) => {
        e.stopPropagation()
        e.preventDefault()

        if (!this.modalVisible) {
          this.showModal()
        } else {
          this.closeModal()
        }
        return false
      })
    }

    renderBlockList() {
      const blockContainer = document.createElement("div")

      blockContainer.style = `
        display: flex;
        width: 100%;
        height: 100%;
        overview-y: scroll;
        flex-wrap: wrap;
        overflow-y: scroll;
        align-items: flex-start;
      `
      const blocks = this.blocks

      for (const uname of blocks) {
        const textNode = document.createElement("p")
        textNode.style = `
          color: black;
          padding-left: 10px;
          display: flex;
          align-items: center;
        `
        textNode.innerText = uname

        const closeNode = DOMCreator.close()
        textNode.appendChild(closeNode)

        closeNode.addEventListener("click", () => {
          textNode.style.display = "none"
          this.blocks = this.blocks.filter(name => name !== uname)
        })

        blockContainer.appendChild(textNode)
      }

      return blockContainer
    }

    closeModal() {
      this.modal.style.display = "none"
      this.modalVisible = false
    }

    showModal() {
      if (this.modal) {
        this.modal.innerHTML = ""
        this.modal = document.createElement("div")
      } else {
        this.modal = document.createElement("div")
      }
      const modal = this.modal

      let title = document.createElement("p")
      title.innerText = "黑名单列表"
      title.style.color = "black"

      modal.style = `
        display: flex;
        align-items: center;
        height: 200px;
        color: rgba(197, 197, 197, 0);
        position: fixed;
        width: 400px;
        margin: 0px;
        left: calc(50% - 200px);
        right: 0px;
        top: calc(50% - 100px);
        bottom: 0px;
        background-color: #ffffff;
        border-radius: 5%;
        border: 1px dashed gray;
        flex-direction: column;
        padding: 10px;
      `

      modal.appendChild(title)
      modal.appendChild(this.renderBlockList())
      document.body.appendChild(modal)

      this.modalVisible = true
    }

    run() {
      const pathname = document.location.pathname
      const kind = pathname.split("/")[1]

      switch (kind) {
        case 'timeline':
          return this.handleArticle()
        case "pins":
          return this.handlePin()
        case "user":
          if (pathname.split("/")[2] === "settings") {
            return this.loadSetting()
          }
      }

    }

  }

  const hip = new HIP()
  hip.run()

  let url = location.href;

  document.body.addEventListener('click', () => {
    requestAnimationFrame(() => {
      if (url !== location.href) {
        hip.run()
        url = location.href
      }
    });
  }, true);

})();

