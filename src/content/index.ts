
const init = () => {
  const addIframe = () => {
    const app = document.createElement('div')
    app.id = 'chrome-monitor-outer'

    app.attachShadow({
      mode: 'open'
    })


    const dom = document.createElement('div')
    dom.id = 'chrome-monitor'
    app.shadowRoot!.appendChild(dom)

    // const contentPageJs = chrome.runtime.getURL('/contentPage.js');
    const contentPageCss = chrome.runtime.getURL('/assets/contentPage.css');
    
    // const scriptElem = document.createElement('script');
    // scriptElem.src = contentPageJs;
    // scriptElem.type = "module";
    // scriptElem.crossOrigin = "crossorigin";
    
    const linkElem = document.createElement('link');
    linkElem.rel = "stylesheet";
    linkElem.href = contentPageCss;
    linkElem.crossOrigin = "crossorigin";
    
    app.shadowRoot!.appendChild(linkElem);
    // app.shadowRoot!.appendChild(scriptElem);

    document.body.appendChild(app)

    import(chrome.runtime.getURL('/contentPage.js'))
  }

  addIframe()

  // const getAllTabs = async () => {
  //   let tabs = await chrome
  // }

  // getAllTabs()
  
  console.log(chrome, 'chrome in init function')
}

init()
