import { useRef, useEffect } from 'react'
import { Html } from '@react-three/drei'

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../store"

const VertexLabels = () => {

    const snap = useSnapshot(state)

    return(
        <Html as='div'>
            <div className='flex items-stretch justify-around py-4 px-4 md:px-8 bg-indigo-50 rounded border border-blue-gray-900 content select-none'>
                <div className=' flex items-center justify-around'>
                    <span className='text-gray-800 text-[12px] font-bold p-1'>Value:</span>
                    <span className='text-gray-800 text-[12px] font-bold p-1'>{snap.pecValue}</span>
                </div>
            </div>
        </Html>
    )
}

export default VertexLabels