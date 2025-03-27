import React, { FunctionComponent } from 'react';
import SVG from 'react-inlinesvg';
import svgMap from './svgMap';
import { Props as SVGProps } from 'react-inlinesvg';

export type SvgPros = SVGProps & {
  alt?: string;
  height?: number;
  width?: number;
  className?: string;
  onClick?: (e: any) => void;
};

const Index: FunctionComponent<SvgPros> = (props) => {
  // Extract the file name from the src path
  const fileName = props.src.split('/').pop() || ''; // Fallback to empty string if undefined

  // Look up the SVG in the map
  const svgSrc = svgMap[fileName] || '';
  const { ...svgProps } = props;
  return <SVG {...svgProps} src={svgSrc} />;
};

Index.defaultProps = {
  title: '',
  height: 32,
  width: 32,
  className: 'none',
  description: 'SVG Fallback Image',
  loader: 'Loading...',
  alt: 'SVG Fallback Image',
  cacheRequests: true,
  uniquifyIDs: true,
  uniqueHash: `${new Date().getTime()}`,
  onError: () => void 0,
  onClick: () => void 0,
  onLoad: () => void 0
};

export default Index;
