import { FC, memo, useEffect, useState } from "react";
import { uniqueId } from "lodash";
import styles from "../styles/Board.module.css";

import Bar from "./Bar";
import { range } from "lodash";

import { ARRAY_SIZE } from "../constant";
interface IPropsBoard {
  arrayExample: number[];
  getX(index: number): number;
}
interface IPropsBar {
  arrayValue: number;
  styleX: number;
}
const areValueEqual = (oldProps: IPropsBar, props: IPropsBar) =>
  oldProps.arrayValue === props.arrayValue;

const MemorizedBar = memo(Bar, areValueEqual);

const Board: FC<IPropsBoard> = ({ arrayExample, getX }) => {
  const initRandomNums = range(ARRAY_SIZE).map(() => []);
  const getRandomNums = () =>
    range(ARRAY_SIZE).map((_) => range(10).map((_) => Math.random()));

  const [randomNums, setRandomNums] = useState(initRandomNums);
  useEffect(() => setRandomNums(() => getRandomNums()), []);
  return (
    <div className={styles.board}>
      {arrayExample.map((arrayValue, index) => (
        <MemorizedBar
          key={`${uniqueId("set")}:${index}`}
          arrayValue={arrayValue}
          styleX={getX(index)}
          randomNum={randomNums[index]}
        />
      ))}
    </div>
  );
};
export default Board;
