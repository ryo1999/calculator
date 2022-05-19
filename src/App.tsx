import { useState, useEffect } from "react";
import "./App.css";
import { UseStyles } from "./components/UseStyles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function App() {
  const classes = UseStyles();
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [num, setNum] = useState([0]);
  const [numlist, setNumlist] = useState(["0"]);
  const [calc, setCalc] = useState("");
  const [calclist, setCalclist] = useState<string[]>([]);

  const calculate = () => {
    const sums: number[] = [];
    const ansArray: number[] = calclist.map((value, index) => {
      if (index === 0) {
        if (value === "+") {
          sums.push(num[index] + num[index + 1]);
          return num[index] + num[index + 1];
        } else if (value === "-") {
          sums.push(num[index] - num[index + 1]);
          return num[index] - num[index + 1];
        } else if (value === "×") {
          sums.push(num[index] * num[index + 1]);
          return num[index] * num[index + 1];
        } else {
          sums.push(num[index] / num[index + 1]);
          return num[index] / num[index + 1];
        }
      } else {
        if (value === "+") {
          sums.push(sums[sums.length - 1] + num[index + 1]);
          return sums[sums.length - 2] + num[index + 1];
        } else if (value === "-") {
          sums.push(sums[sums.length - 1] - num[index + 1]);
          return sums[sums.length - 2] - num[index + 1];
        } else if (value === "×") {
          sums.push(sums[sums.length - 1] * num[index + 1]);
          return sums[sums.length - 2] * num[index + 1];
        } else {
          sums.push(sums[sums.length - 1] / num[index + 1]);
          return sums[sums.length - 2] / num[index + 1];
        }
      }
    });
    setCalclist([]);
    setNum([ansArray[ansArray.length - 1]]);
    return ansArray[ansArray.length - 1];
  };

  const NumClickhandle = (i: string) => {
    if (
      flag === false &&
      (calc === "+" || calc === "-" || calc === "×" || calc === "÷")
    ) {
      setCalclist([...calclist, calc]);
    }
    if (numlist[0] === "0" || flag === false) {
      setNumlist([i]);
    } else {
      setNumlist([...numlist, i]);
    }
    if (flag === false) {
      setFlag(true);
    }
  };

  const onClickhandle = (i: string) => {
    if (i === "C") {
      setNumlist(["0"]);
      setNum([0]);
      setCalclist([]);
      setCalc("");
    } else if (i === "=") {
      setNum([...num, Number(numlist.join(""))]);
      setFlag(false);
      setFlag2(true);
    } else {
      if (flag === true) {
        if (num[0] === 0) {
          setNum([Number(numlist.join(""))]);
        } else {
          setNum([...num, Number(numlist.join(""))]);
        }
        setCalc(i);
        setFlag(false);
      } else {
        setCalc(i);
      }
    }
  };

  useEffect(() => {
    if (flag2 === true) {
      const answer: number = calculate();
      setNumlist([String(answer)]);
      setFlag2(false);
    }
  }, [flag2]);

  // console.log("num", num);
  // console.log("calclist", calclist);
  // console.log("numlist", numlist);
  // console.log("flag",flag);
  // console.log("flag2",flag2)
  // console.log("calc",calc)
  // console.log("-----------------------------");

  return (
    <div className="container">
      <Box className={classes.box}>{calc}</Box>
      <Box className={classes.box}>{numlist}</Box>
      <div className="number">
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("9")}
        >
          {"9"}
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("8")}
        >
          {"8"}
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("7")}
        >
          {"7"}
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => onClickhandle("÷")}
        >
          {"÷"}
        </Button>
      </div>
      <div className="number">
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("6")}
        >
          {"6"}
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("5")}
        >
          {"5"}
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("4")}
        >
          {"4"}
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => onClickhandle("×")}
        >
          {"×"}
        </Button>
      </div>
      <div className="number">
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("3")}
        >
          {"3"}
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("2")}
        >
          {"2"}
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("1")}
        >
          {"1"}
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => onClickhandle("-")}
        >
          {"-"}
        </Button>
      </div>
      <div className="number">
        <Button
          variant="contained"
          color="inherit"
          onClick={() => NumClickhandle("0")}
        >
          {"0"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickhandle("C")}
        >
          {"C"}
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => onClickhandle("=")}
        >
          {"="}
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => onClickhandle("+")}
        >
          {"+"}
        </Button>
      </div>
    </div>
  );
}

export default App;
