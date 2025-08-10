import { useEffect } from 'react';
import { createTimeline, stagger, text } from 'animejs';

const AnimatedText = () => {
  useEffect(() => {
    const { words, chars } = text.split('#animated-p', {
      words: { wrap: 'clip' },
      chars: true,
    });

    createTimeline({
      loop: false, 
      defaults: {
        ease: 'easeInOutSine',
        duration: 800,
      },
    })
      .add(
        words,
        {
          y: [$el => (+$el.dataset.line % 2 ? '100%' : '-100%'), '0%'],
          opacity: [0, 1],
        },
        stagger(180)
      )
      .add(
        chars,
        {
          y: '0%',
          opacity: [0, 1],
        },
        stagger(10, { from: 'center' })
      )
      .init();
  }, []);

  return (
    <p
      id="animated-p"
      className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white text-center leading-tight tracking-wide"
    >
      TETSUO ART<br />
      <span className="text-3xl sm:text-4xl font-light">Arte en madera</span>
    </p>
  );
};

export default AnimatedText;
