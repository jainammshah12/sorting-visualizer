import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js';
//import { quickSortAnimations } from '../sortingAlgorithms/quickSort';

const animation_speed = 10;

const array_bars = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';


export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i = 0; i < array_bars; i++){
            array.push(randomIntFromInterval(5, 685));
        }
        this.setState({array});
    }
    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneId, barTwoId] = animations[i];
            const barOneStyle = arrayBars[barOneId].style;
            const barTwoStyle = arrayBars[barTwoId].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * animation_speed);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * animation_speed);
          }
        }
    }
    quickSort(){
      
    }
    bubbleSort(){

    }
    heapSort(){

    }
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
          const array = [];
          const length = randomIntFromInterval(1, 1000);
          for (let i = 0; i < length; i++) {
            array.push(randomIntFromInterval(-1000, 1000));
          }
          const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
          const quickSortedArray = getMergeSortAnimations(array.slice());
          console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
        }
      }

    render(){
        const {array} = this.state;
        return (
            <div className='array-container'>
                {array.map((value, idx) =>(
                    <div className='array-bar' key={idx} style={{height: `${value}px`}}>
                    </div>
                ))}
                <div>
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.testSortingAlgorithms()}>Test Sorting</button>
                </div>
                
            </div>
        );
    }
}

const randomIntFromInterval = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const arraysAreEqual = (x, y) => {
    if(x.length != y.length) return false;
    
    for(let i = 0; i < x.length; i++){
        if(x[i] != y[i]) return false;
    }
    return true;
}
