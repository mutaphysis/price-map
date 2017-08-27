import * as React from 'react';
import styled from 'styled-components';

interface IMapIconProps {
  className?: string;
  size: number;
  path: string;
  onClick?: () => {};
}

class MapIcon extends React.PureComponent<IMapIconProps> {
  public render(): JSX.Element {
    const {onClick} = this.props;
    const style = {
      backgroundImage: 'url(' + this.props.path + ')',
      width: this.props.size + 'px',
      height: this.props.size + 'px',
    };
    return (
      <a
        className={this.props.className || ''}
        onClick={onClick}
        style={style} />
    );
  }
}

export default styled(MapIcon) `
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: block;
  cursor: pointer;
`;
