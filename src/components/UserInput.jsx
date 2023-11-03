import { useState, useEffect } from 'react';

function UserInput (props) {
    const [weights, setWeights] = useState({});
    const [inputMaxWeight, setInputMaxWeight] = useState('');
    const [inputMinWeight, setInputMinWeight] = useState('');
    const [inputNumberSets, setInputNumberSets] = useState('');

    const rackWeights = (e) => {
        e.preventDefault();
        setWeights({
            maxWeight: Number(inputMaxWeight), 
            minWeight: Number(inputMinWeight),
            numberSets: Number(inputNumberSets),
        });
    };

    function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    function calculateWeights(weights) {
        if (!isObjectEmpty(weights)) {
            let increments = (weights.maxWeight - weights.minWeight) / (weights.numberSets - 1);
            let setData = {};
            let setName = "Set 1";
            setData[setName] = {"weight": weights.minWeight};
            setData[setName]['plate loadout'] = calculatePlates(setData[setName]["weight"]);
            for (let i = 2; i <= weights.numberSets; i++) {
                let setName = "Set " + String(i); 
                setData[setName] = {"weight": weights.minWeight + (i - 1) * increments}
                setData[setName]['plate loadout'] = calculatePlates(setData[setName]["weight"]);//each set should have a plate object
            }
            console.log(setData);
        } else {
            console.error("Weights have not been entered yet.")
        }
    }

    function calculatePlates(weight) {
        const barWeight = 45;
        weight -= barWeight; //Subtract the weight of the bar first

        const plates = [45, 35, 20, 10, 5, 2.5];
        let plateObj = {};
        let remainingWeight = weight / 2;
        for (let i = 0; i < plates.length; i++) {
            let number_plates = Math.floor(remainingWeight / plates[i]);
            plateObj[plates[i]] = number_plates * 2;
            remainingWeight -= number_plates * plates[i];
        }   
        return plateObj;
    }

    useEffect(() => {
        // Log the updated state whenever it changes
        console.log(weights); 
        console.log(calculateWeights(weights));  
        //calculate rack weights function call
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

export default UserInput;