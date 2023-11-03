import { useState, useEffect } from 'react';

function UserInput (props) {
    const [weights, setWeights] = useState({});
    const [inputMaxWeight, setInputMaxWeight] = useState('');
    const [inputMinWeight, setInputMinWeight] = useState('');
    const [inputNumberSets, setInputNumberSets] = useState('');

    const rackWeights = (e) => {
        e.preventDefault();
        setWeights({
            maxWeight: inputMaxWeight, 
            minWeight: inputMinWeight,
            numberSets: inputNumberSets,
        });
        console.log(weights);
    };

    useEffect(() => {
        // Log the updated state whenever it changes
        console.log(weights);   
        //add function to cal
    }, [weights]);

    return (
    <div>
    <form onSubmit={rackWeights}>  
        <input 
        type="text" 
        value={inputMaxWeight}
        placeholder='Enter your maximum weight'
        className='border-2'
        onChange={(e) => setInputMaxWeight(e.target.value)}
        />
        <input
        type="text"
        value={inputMinWeight}
        placeholder='Enter your minimum weight'
        className='border-2'
        onChange={(e) => setInputMinWeight(e.target.value)}
        />
        <input
        type="text"
        value={inputNumberSets}
        placeholder='Enter your number of sets'
        className='border-2'
        onChange={(e) => setInputNumberSets(e.target.value)}
        />
        <button type="submit" className='border-1 px-3 m-2'>Rack My Weight!</button>
    </form>
    </div>
    )
}

//add function to calculate rack weights

export default UserInput;