import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../config/motion'

import state from '../store';

import { CustomButton } from '../components'

/**
 * <CustomButton type="filled" title="PEC" handleClick={() => state.intro = false} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
 * <CustomButton type="filled" title="LRUT" handleClick={() => state.intro = false} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
 */

const Home = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('')

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <h1 className='text-4xl text-gray-900 dark:text-black'>Culdetect</h1>
          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
              <div className="flex-1 flex flex-col">
                <input id='model-upload' type='file' accept='.gltf' onChange={(e) => {
                  setFile(e.target.files[0])
                  state.model = e.target.files[0].name
                  console.log(e.target.files[0].name)
                }} />
                <label htmlFor='model-upload' className='filepicker-label'>Upload</label>

                <p className="mt-2 text-black-500 text-xs truncate">
                  {file === '' ? "No file selected" : file.name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home