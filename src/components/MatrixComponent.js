import { useState } from 'react';

const MatrixComponent = () => {
    const [colors, setColors] = useState(Array(9).fill('bg-gray-900'));
    const [texts, setTexts] = useState(Array(9).fill(''));
    const [clicks, setClicks] = useState([]);
    const [allClicked, setAllClicked] = useState(false);

    const handleClick = (index) => {
        if (allClicked) return;


        const clickedColors = [...colors];
        clickedColors[index] = 'bg-green-400';


        const clickedText = [...texts];
        clickedText[index] = 'X';

        const clickedItems = [...clicks, index];

        setColors(clickedColors);
        setTexts(clickedText);
        setClicks(clickedItems);

        if (clickedItems.length === 9) {
            setAllClicked(true);
            setTimeout(() => {
                const interval = setInterval(() => {
                    const currentClick = clickedItems.shift();
                    clickedColors[currentClick] = 'bg-orange-400';
                    clickedText[currentClick] = (9 - clickedItems.length).toString();
                    setColors([...clickedColors]);
                    setTexts([...clickedText]);

                    if (clickedItems.length === 0) {
                        clearInterval(interval);
                        setTimeout(() => {
                            resetMatrix();
                        }, 2000);
                    }
                }, 500);
            }, 500);
        }
    };

    const resetMatrix = () => {
        setColors(Array(9).fill('bg-gray-900'));
        setTexts(Array(9).fill(''));
        setClicks([]);
        setAllClicked(false);
    };

    const handleUndo = () => {
        if (clicks.length === 0) return;

        const lastClicked = clicks[clicks.length - 1];
        const clickedColors = [...colors];
        clickedColors[lastClicked] = 'bg-gray-900';

        const clickedText = [...texts];
        clickedText[lastClicked] = '';

        const clickedItems = clicks.slice(0, -1);

        setColors(clickedColors);
        setTexts(clickedText);
        setClicks(clickedItems);
        setAllClicked(false);
    };

    return (
        <div className='w-fit bg-gray-800 rounded-lg shadow-xl shadow-gray-900 py-8 p-4'>
            <div className='flex justify-start flex-col items-start pb-4 font-mono'>
                <h2 className='text-gray-100 tracking-widest font-semibold text-xl'>Instructions</h2>
                <h6 className=' text-xs text-yellow-300'>*Please follow instructions precisely*</h6>
                <ol className='text-gray-200 list-decimal pl-6 mt-2'>
                    <li>click.</li>
                </ol>
            </div>
            <div className="grid grid-cols-3 gap-6 place-items-center p-4 mx-4 rounded-lg">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`${color} size-14 text-lg text-gray-100 font-black flex items-center justify-center cursor-pointer rounded-lg select-none hover:brightness-90`}
                        onClick={() => handleClick(index)}>{texts[index] || `O`}</div>
                ))}
            </div>
            <div className='flex flex-col items-end text-right mr-8 space-y-1'>
            <button
                onClick={handleUndo}
                disabled={clicks.length === 0 || allClicked}
                className="mt-4 w-fit py-2 px-3 bg-yellow-300 text-gray-800 text-lg font-bold rounded-xl disabled:bg-red-600 disabled:cursor-not-allowed"
            >
                 undo
            </button>
            <span className='text-xs text-yellow-300 font-mono'>*only done can be undone*</span>
            </div>
        </div>
    );
};

export default MatrixComponent;
