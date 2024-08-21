import React from 'react'
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {

    return (
        <>
            <div className='d-loader'>
                <InfinitySpin
                    width='300'
                    color="#7366ff"
                />
            </div>
        </>
    )
}

export default Loader