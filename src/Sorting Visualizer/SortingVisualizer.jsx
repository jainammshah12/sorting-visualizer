import React from 'react';
import './SortingVisualizer.css';

class SortingVisualizer extends React{
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
        const arr = [];
        for(let i = 0; i < 100; i++){
            arr.push(randomIntFromIntervals(5, 1000));
        }
        this.setState({arr});
    }

    render(){
        const {array} = this.state;
        return (
            <>
                {array.map((value, idx) =>(
                    <div className='array-bar' key={idx}>
                        {value}
                    </div>
                ))}
            </>
        );
    }
}

const randomIntFromIntervals = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;