export interface PageStackParams {
  onPushed?: (newURL: URL, oldURL?: URL) => void
  onPopped?: (url: URL) => void
}

class PageStack {

  protected items: URL[] = [];

  peek(): URL | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }


  constructor(private params?: PageStackParams) {

  }

  exists(url: URL) {
    return this.items.some(item => item.href === url.href)
  }

  handleURLChanged(url: URL) {
    let temp = this.peek()
    if (temp && temp.href === url.href) {
      return;
    }

    if (this.exists(url)) {
      while (!this.isEmpty()) {
        temp = this.peek();
        if (temp && temp.href === url.href) {
          break
        } else {
          this.pop();
          this.params?.onPopped?.(temp!)
        }
      }
    } else {
      this.push(url)
      this.params?.onPushed?.(url, temp)
    }
  }

  push(element: URL): void {
    this.items.push(element);
  }

  pop(): URL | undefined {
    return this.items.pop();
  }

  plain(): string[] {
    return this.items.map(item => item.href)
  }

}


export function listen(params?: PageStackParams) {
  const states = {
    stack: new PageStack(params),
    destroy: () => {
    },
  }

  let previousUrl: null | URL = null;
  const observer = new MutationObserver(function (mutations) {
    if (!previousUrl || location.href !== previousUrl.href) {
      previousUrl = new URL(location.href);
      states.stack.handleURLChanged(previousUrl)
    }
  });
  const config = {subtree: true, childList: true};
  observer.observe(document, config);

  states.destroy = observer.disconnect
  return states;
}

