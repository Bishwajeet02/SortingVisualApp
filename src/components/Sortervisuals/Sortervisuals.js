/* eslint-disable eqeqeq */
import React, { useState, useEffect, useCallback } from "react";
import ReactSlider from "react-slider";
import "./Sortervisuals.css";
import * as bs from "../../sortingAlgorithms/bubbleSort.js";
import * as is from "../../sortingAlgorithms/insertionSort.js";
import * as ss from "../../sortingAlgorithms/selectionSort.js";
import * as qs from "../../sortingAlgorithms/quickSort.js";
import * as ms from "../../sortingAlgorithms/mergeSort.js";

const Sortervisuals = () => {
  const [array, setArray] = useState([]);
  const [NOELEM, setNOELEM] = useState(20);
  const [speed, setSpeed] = useState(201 - 20);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    genArray();
  }, [NOELEM]);

  const genArray = useCallback(() => {
    const MAX_VALUE = 100;
    const MIN_VALUE = 5;
    const newArray = Array.from({ length: NOELEM }, () =>
      Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
    );
    setArray(newArray);
  }, [NOELEM]);

  const animate = useCallback((plan) => {
    const arraybarlist = document.getElementsByClassName("value-bar");
    const newArray = [...array];

    plan.pos.forEach(([pos1, pos2], move) => {
      setTimeout(() => {
        if (plan.swap[move]) {
          [newArray[pos1], newArray[pos2]] = [newArray[pos2], newArray[pos1]];
          if (move !== 0) {
            arraybarlist[plan.pos[move - 1][0]].style.backgroundColor = "blue";
            if (plan.pos[move - 1][1] >= 0) {
              arraybarlist[plan.pos[move - 1][1]].style.backgroundColor = "blue";
            }
          }
          arraybarlist[pos1].style.backgroundColor = "red";
          arraybarlist[pos2].style.backgroundColor = "red";
          setArray([...newArray]);
        } else {
          if (move !== 0) {
            arraybarlist[plan.pos[move - 1][0]].style.backgroundColor = "blue";
            arraybarlist[plan.pos[move - 1][1]].style.backgroundColor = "blue";
          }
          arraybarlist[pos1].style.backgroundColor = "green";
          if (pos2 >= 0) {
            arraybarlist[pos2].style.backgroundColor = "green";
          }
          setArray([...newArray]);
        }
      }, move * speed);
    });

    setTimeout(() => {
      setArray(plan.sorted);
      Array.from(arraybarlist).forEach((bar) => {
        bar.style.backgroundColor = "green";
      });
      setTimeout(() => {
        Array.from(arraybarlist).forEach((bar) => {
          bar.style.backgroundColor = "blue";
        });
        setRunning(false);
      }, speed * 3);
    }, plan.pos.length * speed + 20);
  }, [array, speed]);

  const bubbleSort = () => {
    if (!running) {
      setRunning(true);
      const bubbleSortPlan = bs.bubbleSort([...array]);
      animate(bubbleSortPlan);
    }
  };

  const mergeSort = () => {
    if (!running) {
      setRunning(true);
      const mergeSortPlan = ms.mergeSort([...array]);
      animate(mergeSortPlan);
    }
  };

  const quickSort = () => {
    if (!running) {
      setRunning(true);
      const quickSortPlan = qs.quickSort([...array]);
      animate(quickSortPlan);
    }
  };

  const insertionSort = () => {
    if (!running) {
      setRunning(true);
      const insertionSortPlan = is.insertionSort([...array]);
      animate(insertionSortPlan);
    }
  };

  const selectionSort = () => {
    if (!running) {
      setRunning(true);
      const selectionSortPlan = ss.selectionSort([...array]);
      animate(selectionSortPlan);
    }
  };

  const changeNum = (val) => {
    const newSpeed = 201 - val;
    if (val < 20) {
      const arraybarlist = Array.from(document.getElementsByClassName("value-bar"));
      arraybarlist.forEach((box) => {
        box.style.fontSize = `${20}px`;
      });
    } else {
      const arraybarlist = Array.from(document.getElementsByClassName("value-bar"));
      arraybarlist.forEach((box) => {
        box.style.fontSize = `${0}px`;
      });
    }
    setNOELEM(val);
    setSpeed(newSpeed);
    genArray();
  };

  return (
    <div>
      <div className="Header">
        <div className="button-container">
          <button className="button" onClick={genArray}>
            New array
          </button>
        </div>
        <div className="vl"></div>
        <div className="button-container">
          <button className="button" onClick={bubbleSort}>
            Bubble Sort
          </button>
        </div>
        <div className="button-container">
          <button className="button" onClick={mergeSort}>
            Merge Sort
          </button>
        </div>
        <div className="button-container">
          <button className="button" onClick={quickSort}>
            Quick Sort
          </button>
        </div>
        <div className="button-container">
          <button className="button" onClick={insertionSort}>
            Insertion Sort
          </button>
        </div>
        <div className="button-container">
          <button className="button" onClick={selectionSort}>
            Selection Sort
          </button>
        </div>
        <ReactSlider
          onChange={(val) => {
            if (!running) {
              changeNum(val);
            }
          }}
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          defaultValue={NOELEM}
          min={10}
          max={200}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
      </div>

      <div className="array-holder">
        {array.map((value, idx) => (
          <div
            className="value-bar"
            key={idx}
            style={{
              paddingBottom: `${value * 5}px`,
              paddingLeft: `${Math.floor(window.innerWidth / (array.length * 2) / 2)}px`,
              paddingRight: `${Math.floor(window.innerWidth / (array.length * 2) / 2)}px`,
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sortervisuals;