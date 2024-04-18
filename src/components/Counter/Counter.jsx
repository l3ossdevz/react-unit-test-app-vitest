import { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1 className="pb-5">Counter is : {count}</h1>
            <div className="container-button">
                <button
                    className="button-increment"
                    onClick={() => setCount(count + 1)}
                >
                    Increment
                </button>
                <button
                    className="button-decrement"
                    onClick={() => setCount(count - 1)}
                    disabled={count <= 0}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}

export default Counter
