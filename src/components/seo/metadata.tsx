import { ReactNode, FunctionComponent, PropsWithChildren } from 'react';
import NextHead from 'next/head';

export interface Props {
  title: string;
  description: string;
  children?: ReactNode | ReactNode[];
}

const Metadata: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { title, description, children } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content={media} /> */}
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      {/* <meta
        property="og:url"
        content={`${process.env.loginUrl}${router.asPath}`}
      /> */}
      <meta property="og:site_name" content={title} />
      {/* <link rel="canonical" href={`${process.env.loginUrl}${router.asPath}`} /> */}
      <meta name="twitter:site" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@careermocha" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      {children}
    </NextHead>
  );
};

export default Metadata;
