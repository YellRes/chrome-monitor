import  { useRef, useState, useCallback, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import { Drawer, Empty  } from 'antd'
import { useDraggable } from '@neodrag/react'
import MonitorSvg from './assets/monitor.svg?react'
// 打包后 css不会生成单独的文件
import './index.css'

function App() {
  const draggableRef = useRef(null)
  const [tabInfos, setTabInfos] = useState({})
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const onclose = useCallback(() => {
    setIsOpenDrawer(false)
  }, [])

  const openDrawer = useCallback(() => {
    setIsOpenDrawer(true)
  }, [])

  useEffect(() => { 
    const port = chrome.runtime.connect({ name: 'getTabsInfo' })
    port.postMessage({ type: 'getTabsInfo' })
    port.onMessage.addListener((msg: any) => { 
      if (msg.type === 'getTabsInfo') { 
        setTabInfos(msg.value)
        // console.log(msg.value, 'all tabs')
      }
    })
  }, [])

  useDraggable(draggableRef, {
    axis: "y",
  })

  return (
    <>
      <div onClick={openDrawer} ref={draggableRef} className='group fixed top-[100px] right-0 p-2 bg-white flex items-center border border-[#ededed] rounded-s-lg shadow hover:cursor-pointer '>
        <MonitorSvg className='w-[20px] h-[20px]'/>
        <div className='ml-[4px] hidden group-hover:inline'>显示tab占用内存</div>
      </div>

      <Drawer title="当前tab占用内存情况" onClose={onclose} open={isOpenDrawer}>
        <Empty description="暂无内容"/>
      </Drawer>
    </>
  )
}

// npm run dev 时候该代码不打包
if (import.meta.env.PROD) { 
    const app = document.getElementById('chrome-monitor-outer')!.shadowRoot!.getElementById('chrome-monitor')
  ReactDOM.createRoot(app!).render(
    <App />
  ,
  )
}

export default App

