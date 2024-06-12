import { FunctionComponent } from 'react';
import SVG from 'react-inlinesvg';
import { Props as SVGProps } from 'react-inlinesvg';

export type SvgPros = SVGProps & {
  alt?: string;
  height?: number;
  width?: number;
  className?: string;
  onClick?: (e: any) => void;
};

/**
 * Handle inline SVG with dynamic path/url.
 * (Note: Used to handle dynamic external/internal SVG assets)
 * @example <InlineSvg src="/assets/path/to/your.svg" size={32} />
 * @see https://www.npmjs.com/package/react-inlinesvg
 */
const Index: FunctionComponent<SvgPros> = (props) => {
  const { src, ...svgProps } = props;

  return <SVG {...svgProps} src={src} />;
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
