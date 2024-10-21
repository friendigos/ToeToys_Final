import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterUpProps {
  start?: number;
  end: number;
  duration?: number;
}

const CounterUp: React.FC<CounterUpProps> = ({ start = 0, end, duration = 2000 }) => {
  const [count, setCount] = useState<number>(start);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, start, end, duration]);

  return (
    <div ref={ref} className="text-5xl font-bold text-blue-600">
      {count}
    </div>
  );
};

export default CounterUp;
