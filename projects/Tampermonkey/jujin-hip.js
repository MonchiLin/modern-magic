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

  const generateBlocker = () => {
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
  }

  class HIP {

    constructor() {
      // localStorage.setItem(JSON.stringify(["张三", "李四"]))
    }


    set blocks(val) {
      try {
        localStorage.setItem("BLOCKS_KEY", JSON.stringify(val))
      } catch (e) {
        localStorage.setItem("BLOCKS_KEY", JSON.stringify([]))
      }
    }

    get blocks() {
      try {
        return JSON.parse(localStorage.getItem(BLOCKS_KEY))
      } catch (e) {
        return []
      }
    }

    blocker = generateBlocker()

    modal
    blockContainer
    modalVisible = false

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

    loadSetting() {
      const navigation = this.navigation || (this.navigation = document.querySelector(".main-container nav ul.nav-list"))
      const newNode = navigation.childNodes[0].cloneNode(true)
      newNode.className = "nav-item"
      newNode.childNodes[0].textContent = "黑名单设置"
      navigation.appendChild(newNode)

      newNode.addEventListener("click", (e) => {
        e.stopPropagation()

        if (!this.modalVisible) {
          this.showModal()
        } else {
          this.closeModal()
        }

        e.preventDefault()
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

        const closeNode = document.createElement("img")
        closeNode.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADWElEQVRIie1VTWwTVxD+5u3aGy92bFACSUggkEYhIUDs8HeFtIfS9tgD5dZD6akqEgghRBQBkfi5wAUhIbXHKqqEkHKoKiIsDggksOM2Ki0laewYETAprGNnHdvZN1ywtU7sDXcYaaXdN99838y892aBj1bDMmNNPalwo9e+pq4WxMwUeZbbq1jWVyxoCxjrQUgB/J8gZXRXq+chETEAGGMtn0nw75qljAA4XOIgJ4FoIjvAwGUCgk4wZj7R3+67kwo3ejVLucGEm4GBF786ijAzjc+YZwAeWi2RUgiYBoOb9WEi4lM/jx9it3L/wpGdbwBbu4bCYbU43dA8/O2OZGzGHAR4iKXE7OTfWDTSNdnrAn40f9JNJMS58YQJAOelYPYULF5RyemfJtqkWDr89YHOCIDbLC2KXb+KrvkCDDNTVaDJ64fH7cEDdxF93/8IEkIK5k/72n1hO66iFcxM0ZmFCAHB2SePEbg1Cq/iwta16x17lcwaiH8+gI3beiAIsd6Neqh0GABA2MHReG5faZML2XmYeXNVAQBYWDSRz6RhSUbR4r5Y0txt91eIkGIdqkX0pyeHhMwCAFJqEX+o2bKvTnVVYCXLL2qKQFJnLZGGvMBcdyMeFF8h2VEPb16WfcaiWYElquSpEGHCOk2tfmJbpAbrcRKhY9+gMJFAh1Jf9rkUpQLLjIaaIsT4f2tjHTS1skAASFhZoKsFE1dH4O7dhOeUL/syhdxy+KuaIt6lv9JPnhvIL0kst6zfjdapefQr67Dh6WvMe1cmYqtl0v5Vvoz56JEekb5y1ND2IOn7bkXY9qy7/N7KOlD96pRyH61aiVsrzDAwsuDaPq0uPYPbWw9d0zFlpJzYMPnmJdZoa6D5/KWlR6FNetSOWbHLkXjmIBGNsZQUu37F8cYDQED34V9/HXYd/QEkhITgg6E2311HEQCIxhfOgPgsS4kXT/9BLm3UFPH4A2jq3AYSAi6eG+5+ffKeGhr5zY6p+j8JbtbPjydMJiHONnf1vM8Ulkw02Ju+eM0C9i93OhLE4pkDkugygH4H2CMIPr68RXarWklpIve1+y4x855Y0tzNLL9kUAcBGxh4SeApkBgNtukR+zB8bxHXlrnZ4nTDLwDwjuDhu+cDt7fSDVC6j4eimgAAAABJRU5ErkJggg==`
        closeNode.style.cursor = "pointer"

        textNode.appendChild(closeNode)

        closeNode.click = () => {
          blockContainer.parentNode.remove(textNode)
          this.blocks = this.blocks.filter(name => name === uname)
        }

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
            this.loadSetting()
          }
      }

    }

  }

  const hip = new HIP()
  hip.run()

  // window.addEventListener("hashchange", () => {
  //   console.log("???")
  // }, false);

})();

