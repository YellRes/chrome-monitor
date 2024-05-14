async function getAllTab() { 
    const tabs = await chrome.tabs.query({})
    return tabs
}

console.log('bg.js')
chrome.runtime.onConnect.addListener((port: any) => { 
    port.onMessage.addListener(async (msg: any) => { 
        if (msg.type === 'getTabsInfo') { 
            const tabs = await getAllTab()
            port.postMessage({
                type: 'getTabsInfo',
                value: tabs
            })
        }
    })  
})