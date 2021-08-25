import React, { ReactNode, useEffect, useState } from 'react';
import { notification, Button } from 'antd';
import Iframe from 'react-iframe';
import ResizeMoveDialog from '@/components/ResizeMoveDialog';
import './IM.less';
export interface RlyPropos {
  bounds?: string;
  contactsList?: [any];
  userInfo?: { userId: string; userName: string };
  size?: { width: number; height: number };
  limitSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
}
const info = {
  message: '信息',
  audio: '语音通话',
  video: '视频通话',
};

export default function IM({ bounds, size, maxSize, limitSize }: RlyPropos) {
  const [toggle, setToggle] = useState(false);

  const close = () => {
    setToggle(false);
  };

  const open = () => {
    setToggle(true);
  };

  useEffect(() => {
    const handle = (res: any) => {
      const data = (res && res.data) || { type: '', name: '' };
      if (toggle) return;
      notification.destroy();
      notification.info({
        message: `${data.name}发送${info[data.type]}过来`,
        placement: 'bottomRight',
        bottom: 0,
        duration: 30,
        btn: (
          <Button
            type="primary"
            size="small"
            onClick={() => {
              open();
              notification.destroy();
            }}>
            打开对话框
          </Button>
        ),
      });
    };
    window.addEventListener('message', handle);

    return () => window.removeEventListener('message', handle);
  }, [toggle]);

  return (
    <>
      <Button style={{ position: 'absolute', top: 10, left: 20 }} onClick={open}>
        答案开
      </Button>
      <ResizeMoveDialog
        limitSize={limitSize || { width: 300, height: 300 }}
        maxSize={maxSize || { width: 900, height: 600 }}
        size={size || { width: 900, height: 600 }}
        close={close}
        bounds={bounds || 'body'}
        toggle={toggle}>
        <Iframe
          url="im/index.html"
          width={'100%'}
          height={'100%'}
          allow="geolocation;microphone;camera;midi;encrypted-media"
          id="RlyChat-Im"
          onLoad={() => {
            (window as any).ChatLogin.init(() => {
              const contentWindow = (document.getElementById('RlyChat-Im') as any).contentWindow;
              if (contentWindow) {
                contentWindow.IM.loginCallBack('15071046271', '我是一个名字', [
                  { id: 15071046271, name: '我是一个名字' },
                  { id: 'aa11', name: 'hepeu' },
                  { id: 'bb11', name: '何佩' },
                ]);
              }
            });
          }}
        />
      </ResizeMoveDialog>
    </>
  );
}