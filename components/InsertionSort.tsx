import { range, shuffle } from "lodash";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  memo,
  useEffect,
} from "react";
import { tween } from "tweening-js";

import styles from "../styles/InsertionSort.module.css";

import Board from "./Board";

import browserBeep from "browser-beep";
import { ARRAY_SIZE, DURATION } from "../constant";

type TSetArr = Dispatch<SetStateAction<number[]>>;
type TSetIdx = Dispatch<SetStateAction<number>>;
type TSet = Dispatch<SetStateAction<any>>;

interface IPropsBoard {
  arrayExample: number[];
}
const areArrEqual = (oldProps: IPropsBoard, props: IPropsBoard) =>
  oldProps.arrayExample === props.arrayExample;

const MemorizedBoard = memo(Board, areArrEqual);

const InsertionSort = () => {
  const getArr = () => shuffle(range(1, ARRAY_SIZE + 1));
  const initArr = range(1, ARRAY_SIZE + 1).map(() => 1);

  const [indexI, setIndexI] = useState(1);
  const [indexJ, setIndexJ] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [arrayExample, setArrayExample] = useState(initArr);
  const [browserWidth, setBrowserWidth] = useState(0);

  const getX = (idx: number) => idx * ((browserWidth - 40) / ARRAY_SIZE) + 2;

  useEffect(() => {
    setArrayExample(getArr());
    setBrowserWidth(
      Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      )
    );
  }, []);

  const handleShuffle = useCallback(() => {
    setArrayExample(getArr());
    setIndexJ(1);
    setIndexI(1);
  }, [setArrayExample, setIndexJ, setIndexI]);

  const handleSort = useCallback(async () => {
    const swap = (arr: number[], a: number, b: number) => {
      const beep = browserBeep({ frequency: 150 });
      const tmp = arr[a];
      arr[a] = arr[b];
      arr[b] = tmp;
      beep(1);
    };
    const delaySet = (value: number[], setValue: TSet) =>
      new Promise((resolve) => {
        setValue(value);
        setTimeout(resolve, DURATION);
      });

    const sorting = async (
      arrayExample: number[],
      setArrayExample: TSetArr,
      setIndexI: TSetIdx,
      setIndexJ: TSetIdx
    ) => {
      const beep = browserBeep({ frequency: 830 });
      let i = 1;
      let j = 1;
      const newArray = [...arrayExample];

      while (i < newArray.length) {
        await tween(i, j, setIndexJ).promise();
        j = i;
        while (j > 0 && newArray[j - 1] > newArray[j]) {
          swap(newArray, j, j - 1);
          await delaySet([...newArray], setArrayExample);
          await tween(j, j - 1, setIndexJ).promise();
          j = j - 1;
        }
        beep(1);
        await tween(i, i + 1, setIndexI).promise();
        i = i + 1;
      }
      return newArray;
    };
    setIsRunning(true);
    await sorting(arrayExample, setArrayExample, setIndexI, setIndexJ);
    setIsRunning(false);
  }, [arrayExample, setArrayExample, setIndexI, setIndexJ, setIsRunning]);

  console.log(browserWidth);

  return (
    <div className={styles.insertionWrapper}>
      <MemorizedBoard arrayExample={arrayExample} getX={getX} />
      <div
        className={styles.indexI}
        style={{
          transform: `translateX(${getX(indexI)}px)`,
        }}
      />

      <div
        className={styles.indexJ}
        style={{
          transform: `translateX(${getX(indexJ)}px)`,
        }}
      />
      <div className={styles.btnBox}>
        {!isRunning && (
          <button onClick={handleSort} className={styles.button}>
            <div className={styles.eff}></div>
            <a> sort </a>
          </button>
        )}
        {!isRunning && (
          <div onClick={handleShuffle} className={styles.button}>
            <div className={styles.eff}></div>
            <a>shuffle</a>
          </div>
        )}

        {isRunning && (
          <div className={styles.loadingBtn}>
            <span className={styles.loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InsertionSort;
