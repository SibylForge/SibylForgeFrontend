import { useEffect, useState } from 'react';

export default function useScroll(ref: React.RefObject<HTMLDivElement>) {
  const [scroll, setScroll] = useState<boolean | null>(null); // for scrolling

  const scrollListToEnd = () => {
    ref.current?.scrollTo({
      behavior: 'smooth',
      top: 250
    });
    setScroll(false);
  };

  useEffect(() => {
    scroll && scrollListToEnd();
  });

  return { setScroll };
}
