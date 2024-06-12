import React, {
  ReactNode,
  FunctionComponent,
  useState,
  useEffect
} from 'react';

interface InfiniteScrollProps {
  fetchData: () => any;
  children: ReactNode | ReactNode[];
  loader: ReactNode;
  endMessage?: ReactNode;
  hasMore?: boolean;
  className?: string;
}

const InfiniteScroll: FunctionComponent<InfiniteScrollProps> = ({
  loader,
  children,
  fetchData,
  hasMore = true,
  endMessage = null
}) => {
  const [isCall, setIsCalling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isCall
      ) {
        return;
      }
      setIsCalling(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCall]);

  useEffect(() => {
    if (!isCall || !hasMore) return;
    fetchData();
    setIsCalling(false);
  }, [isCall, hasMore, fetchData]);

  return (
    <div className="mb-3">
      {children}
      {hasMore && loader}
      {!hasMore && endMessage}
    </div>
  );
};

export default InfiniteScroll;
