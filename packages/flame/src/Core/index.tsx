import * as React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { Omit } from 'type-fest';

import {
  space,
  SpaceProps,
  flexbox,
  FlexboxProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
  compose,
} from 'styled-system';
import { themeGet, flameTheme as ThemeUIFlame } from './theme-get';

import { theme as lightTheme } from './themes/oldskool';
import { theme as flameTheme } from './themes/flame';
import { theme as darkTheme } from './themes/dark';

type AsProps = { as?: string };
export type FlameBoxProps = SpaceProps &
  LayoutProps &
  FlexboxProps &
  TypographyProps &
  Omit<ColorProps, 'color'> & // Fun clashing between native color prop & styled-system color prop
  AsProps;
export const Box = styled('div')<FlameBoxProps>(
  compose(
    space,
    layout,
    typography,
    color,
    flexbox,
  ),
);

export type FlameFlexProps = FlameBoxProps & FlexboxProps;
export const Flex = styled(Box)<FlameFlexProps>({
  display: 'flex',
});

const themePicker = (themeName?: string) => {
  switch (themeName) {
    case 'experimentaldark':
      return darkTheme;
    case 'oldskool':
    case 'light':
      return lightTheme;
    case 'flame':
    default:
      return flameTheme;
  }
};

export type FlameThemeProps = {
  children: React.ReactNode;
  themeName?: string;
  themeOverrides?: any;
};
const FlameTheme: React.FunctionComponent<FlameThemeProps> = ({
  children,
  themeName,
  themeOverrides,
}) => {
  const selectedTheme = themePicker(themeName);
  return <ThemeProvider theme={{ ...selectedTheme, ...themeOverrides }}>{children}</ThemeProvider>;
};

const FlameFonts: React.FunctionComponent = () => (
  <link
    href="https://fonts.googleapis.com/css?family=Lato:400,700&subset=latin-ext"
    rel="stylesheet"
  />
);

const FlameGlobalStyles: React.FunctionComponent<{ themeName?: string }> = ({ themeName }) => {
  const selectedTheme = themePicker(themeName);

  return (
    <Global
      styles={css`
        html {
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
        body {
          font-family: ${themeGet(
            'fontFamily.sans-serif',
            'Lato, Helvetica Neue, Helvetica, Arial, sans-serif',
          )({ theme: selectedTheme })};
          padding: 0;
          margin: 0;
          background-color: ${selectedTheme.colors.bodyBg};
          color: ${selectedTheme.colors.textBody};
        }
      `}
    />
  );
};

export {
  lightTheme,
  flameTheme,
  FlameFonts,
  FlameTheme,
  FlameGlobalStyles,
  themeGet,
  ThemeUIFlame,
};
