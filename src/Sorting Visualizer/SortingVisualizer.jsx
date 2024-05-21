import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort.js';


const animation_speed = 10;

const array_bars = 310;

const primary_color = 'turquoise';

const secondary_color = 'red';


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
        console.log(this.state.array);
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneId, barTwoId] = animations[i];
            const barOneStyle = arrayBars[barOneId].style;
            const barTwoStyle = arrayBars[barTwoId].style;
            const color = i % 3 === 0 ? secondary_color : primary_color;
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
        const animations = getQuickSortAnimations(this.state.array);
        console.log(animations);        
        for (let i = 0; i < animations.length; i++) {
            const isColorChange =
                animations[i][0] === "comparison1" ||
                animations[i][0] === "comparison2";
            const arrayBars = document.getElementsByClassName("array-bar");
            if (isColorChange === true) {
                const color =
                animations[i][0] === "comparison1"
                ? secondary_color
                : primary_color;
                const [, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * animation_speed);
            } else {
                const [, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * animation_speed);
            }
        }
                
    }    
    bubbleSort(){

    }
    heapSort(){

    }
    render(){
        const {array} = this.state;
        return (
            <div className='array-container'>
                {array.map((value, idx) =>(
                    <div className='array-bar' key={idx} style={{height: `${value}px`}}>
                    </div>
                ))}
                <div className='buttons'>
                    <button className='gen' onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className='quick' onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className='merge' onClick={() => this.mergeSort()}>Merge Sort</button> 
                </div>
            </div>
        );
    }
}

const randomIntFromInterval = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const arraysAreEqual = (x, y) => {
    if(x.length !== y.length) return false;
    
    for(let i = 0; i < x.length; i++){
        if(x[i] !== y[i]) return false;
    }
    return true;
}