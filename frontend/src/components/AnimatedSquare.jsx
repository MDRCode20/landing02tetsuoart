import { useEffect } from "react";
import { createAnimatable, utils } from "animejs";

export default function AnimatedSquare() {
  useEffect(() => {
    const $square = document.querySelector(".square");

    const bounds = {
      width: window.innerWidth,
      height: window.innerHeight,
      left: 0,
      top: 0,
    };

    const animatableSquare = createAnimatable($square, {
      x: 0,
      y: 0,
      ease: "out(3)",
    });

    const target = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      const hw = bounds.width / 2;
      const hh = bounds.height / 2;

      const dx = e.clientX - bounds.left - hw;
      const dy = e.clientY - bounds.top - hh;

      target.x = utils.clamp(dx * 0.6, -hw, hw); 
      target.y = utils.clamp(dy * 0.6, -hh, hh);
    };

    const update = () => {
      animatableSquare.x(utils.lerp(animatableSquare.x(), target.x, 0.09)); 
      animatableSquare.y(utils.lerp(animatableSquare.y(), target.y, 0.05));
      requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMouseMove);
    update();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="square w-5 h-5 bg-yellow-500 rounded-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none" />
  );
}
