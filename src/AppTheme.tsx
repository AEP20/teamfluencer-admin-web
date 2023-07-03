import React from 'react';
import { useEffect, PropsWithChildren } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from './redux/store/index';
import { IRootState } from './redux/store/index';
import {
  toggleRTL,
  toggleTheme,
  toggleLocale,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
} from './redux/store/themeConfigSlice';

function AppTheme({ children }: PropsWithChildren) {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
    dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
    dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
    dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
    dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
    dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
    dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
  }, [
    dispatch,
    themeConfig.theme,
    themeConfig.menu,
    themeConfig.layout,
    themeConfig.rtlClass,
    themeConfig.animation,
    themeConfig.navbar,
    themeConfig.locale,
    themeConfig.semidark,
  ]);

  return (
    <div
      className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${
        themeConfig.layout
      } ${themeConfig.rtlClass} main-section antialiased relative font-nunito text-sm font-normal`}
    >
      {children}
    </div>
  );
}

export default AppTheme;
