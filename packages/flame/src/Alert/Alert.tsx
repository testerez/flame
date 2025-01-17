import * as React from 'react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { space, variant, SpaceProps } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { Box } from '../Core';
import { Text } from '../Text';

const alertStyles = variant({
  key: 'alertVariants',
  prop: 'type',
});

const AlertWrapper = styled('div')<{ type: string }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06), 0 3px 6px 0 rgba(0, 0, 0, 0.03),
    0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border-top: 4px solid;
  border-radius: ${themeGet('radii.radius-2')};
  padding: ${themeGet('space.2')} ${themeGet('space.3')};
  ${space}
  ${alertStyles}
`;

AlertWrapper.defaultProps = {
  type: 'info',
};

const CloseButton = styled('button')`
  font-size: ${themeGet('fontSizes.text')};
  color: ${themeGet('colors.textHeading')};
  background-color: ${props => transparentize(0.9, themeGet('colors.textHeading', '#000')(props))};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  width: 1em;
  height: 1em;
  padding: 0;
  position: relative;

  &:focus {
    outline: none;
  }
`;

CloseButton.displayName = 'CloseButton';

export interface AlertProps {
  /** CSS class name */
  className?: string;
  /** Enum for preset Alert types */
  type?: 'info' | 'success' | 'warning' | 'danger' | string;
  /** Function called when Close button is tapped */
  onClose?: Function;
  /** Whether a Close button appears */
  noCloseBtn?: boolean;
  /** Text for the alert's title */
  title?: string;
}
export interface AlertState {
  closed: boolean;
}
class Alert extends React.Component<AlertProps & SpaceProps, AlertState> {
  constructor(props: any) {
    super(props);

    this.state = {
      closed: false,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e: React.MouseEvent<HTMLElement>) {
    this.setState(prevState => {
      if (this.props.onClose && typeof this.props.onClose === 'function') this.props.onClose(e);

      return {
        closed: !prevState.closed,
      };
    });
  }

  render() {
    if (this.state.closed) return null;
    const { children, type, title, noCloseBtn, ...restProps } = this.props;

    return (
      <AlertWrapper type={type} {...restProps}>
        <Box flex="1">
          {title && (
            <Text color="textHeading" fontWeight="bold" fontSize="text" mt={0} mr={0} mb={1} ml={0}>
              {title}
            </Text>
          )}
          <Box fontSize="text-s">{children}</Box>
        </Box>
        {!noCloseBtn && (
          <CloseButton type="button" onClick={this.handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 8"
              css={{
                width: '0.5em',
                height: '0.5em',
                fill: 'black',
                position: 'absolute',
                top: '0.25em',
                left: '0.25em',
                right: '0',
                bottom: '0',
              }}
            >
              <g fillRule="evenodd" transform="translate(-4 -4)">
                <path
                  fillOpacity=".5"
                  d="M9.414 8l2.122-2.121a1 1 0 1 0-1.415-1.415L8 6.586 5.879 4.464A1 1 0 0 0 4.464 5.88L6.586 8l-2.122 2.121a1 1 0 0 0 1.415 1.415L8 9.414l2.121 2.122a1 1 0 0 0 1.415-1.415L9.414 8z"
                />
              </g>
            </svg>
          </CloseButton>
        )}
      </AlertWrapper>
    );
  }
}

(Alert as any).defaultProps = {
  type: 'info',
};

export { Alert };
