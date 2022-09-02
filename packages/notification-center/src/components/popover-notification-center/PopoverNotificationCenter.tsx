import React from 'react';
import { PopoverProps } from '@mantine/core';
import { IMessage, IMessageAction, ButtonTypeEnum } from '@novu/shared';
import { NotificationCenter } from '../notification-center';
import { INotificationBellProps } from '../notification-bell';
import { Popover } from './components/Popover';
import { INovuThemePopoverProvider } from '../../store';
import { useDefaultTheme, useUnseenCount } from '../../hooks';
import { ColorScheme, ListItem, ITab } from '../../index';

interface IPopoverNotificationCenterProps {
  onUrlChange?: (url: string) => void;
  onNotificationClick: (notification: IMessage) => void;
  onUnseenCountChanged?: (unseenCount: number) => void;
  children: (props: INotificationBellProps) => JSX.Element;
  header?: () => JSX.Element;
  footer?: () => JSX.Element;
  listItem?: ListItem;
  colorScheme: ColorScheme;
  theme?: INovuThemePopoverProvider;
  onActionClick?: (templateIdentifier: string, type: ButtonTypeEnum, message: IMessage) => void;
  actionsResultBlock?: (templateIdentifier: string, messageAction: IMessageAction) => JSX.Element;
  tabs?: ITab[];
  showUserPreferences?: boolean;
  onTabClick?: (tab: ITab) => void;
  position?: PopoverProps['position'];
  placement?: PopoverProps['placement'];
}

export function PopoverNotificationCenter({ children, ...props }: IPopoverNotificationCenterProps) {
  const { theme } = useDefaultTheme({ colorScheme: props.colorScheme, theme: props.theme });
  const { setUnseenCount, unseenCount } = useUnseenCount();

  function handlerOnUnseenCount(count: number) {
    if (isNaN(count)) return;

    setUnseenCount(count);

    if (props.onUnseenCountChanged) {
      props.onUnseenCountChanged(count);
    }
  }

  return (
    <Popover
      theme={theme}
      bell={(bellProps) => children({ ...bellProps, unseenCount, theme })}
      position={props.position}
      placement={props.placement}
    >
      <NotificationCenter
        onNotificationClick={props.onNotificationClick}
        onUnseenCountChanged={handlerOnUnseenCount}
        onUrlChange={props.onUrlChange}
        header={props.header}
        footer={props.footer}
        colorScheme={props.colorScheme}
        theme={props.theme}
        onActionClick={props.onActionClick}
        actionsResultBlock={props.actionsResultBlock}
        listItem={props.listItem}
        tabs={props.tabs}
        showUserPreferences={props.showUserPreferences}
        onTabClick={props.onTabClick}
      />
    </Popover>
  );
}
