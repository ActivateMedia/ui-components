import { NextPage } from 'next';
import { FunctionComponent, Fragment, PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { mergeCls } from '../../utils/helper';
import Metadata from '../../components/seo/metadata';
import Header from '../Header';
import Sidebar from '../Sidebar';

export type UnknownProps = Record<string, any>;

export interface BaseLayoutProps {
  title: string;
  description: string;
  className?: string;
  page?: string;
}

/**
 * This is higher order component. its contains basic layout of project
 * We can use global component here
 * @param props
 * @returns
 */
export const BaseLayout: FunctionComponent<
  PropsWithChildren<BaseLayoutProps>
> = (props) => {
  const { children, className, title, description, page } = props;
  const { t } = useTranslation('common');
  return (
    <Fragment>
      <Metadata title={t(title)} description={t(description)} />
      <div className={mergeCls(['flex flex-col min-h-screen', className])}>
        {page ? (
          <>
            <Header />
            <div className="flex flex-1 mt-[52px]">
              <Sidebar source={page} />
              <div
                className={mergeCls([
                  'flex-1 mx-auto static w-[calc(100vw-264px)] ml-[264px]'
                ])}
              >
                {children}
              </div>
            </div>
          </>
        ) : (
          <div className={mergeCls(['flex-1 mx-auto'])}>{children}</div>
        )}
      </div>
    </Fragment>
  );
};
export default BaseLayout;

/**
 * Higher-order component that wraps the provided component in a `<MainLayout>` component.
 * Of course, you can create your new Layout with this template!
 * @param PageComponent - The page component to wrap with the layout
 * @param layoutProps - The props to pass to the layout
 * @returns - NextPage
 */
export const withBaseLayout = <T extends UnknownProps>(
  PageComponent: NextPage<T>,
  layoutProps: BaseLayoutProps | ((pageProps: T) => BaseLayoutProps)
) => {
  const LayoutPage: FunctionComponent<T> = (pageProps) => {
    const layoutPropsWithPageProps = useMemo(() => {
      return typeof layoutProps === 'function'
        ? layoutProps(pageProps)
        : layoutProps;
    }, [pageProps]);

    return (
      <BaseLayout {...layoutPropsWithPageProps}>
        <PageComponent {...pageProps} />
      </BaseLayout>
    );
  };
  return LayoutPage;
};
