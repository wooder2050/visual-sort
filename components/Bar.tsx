import { FC } from "react";
import styles from "../styles/Bar.module.css";

import { DURATION, BAR_WIDTH } from "../constant";
interface IPropsBar {
  arrayValue: number;
  styleX: number;
  randomNum: number[];
}

const Bar: FC<IPropsBar> = ({ arrayValue, styleX, randomNum }) => {
  const generateImage = (randomNum) => {
    const direction = Math.round(randomNum[0] * 360);
    const r1 = Math.round(randomNum[1] * 255);
    const g1 = Math.round(randomNum[2] * 255);
    const b1 = Math.round(randomNum[3] * 255);
    const a1 = Math.round(randomNum[4] * 10) / 10;
    const r2 = Math.round(randomNum[5] * 255);
    const g2 = Math.round(randomNum[6] * 255);
    const b2 = Math.round(randomNum[7] * 255);
    const a2 = Math.round(randomNum[9] * 10) / 10;
    return `linear-gradient(${direction}deg, rgba(${r1},${g1},${b1},${a1}), rgba(${r2},${g2},${b2},${a2}))`;
  };
  const style = {
    height: arrayValue * 10,
    transform: `translateX(${styleX}px)`,
    transition: `transform ${DURATION}ms ease-in-out`,
    background: `${generateImage(randomNum)}`,
    width: BAR_WIDTH,
  };
  return <div style={style} className={styles.bar} />;
};

export default Bar;
