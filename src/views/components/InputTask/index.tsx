import React from 'react'

import styles from './index.module.scss'

interface InputTaskProps {
    id: string,
    title: string,
    onDone: (id: string) => void
}

const InputTask: React.FC<InputTaskProps> = ({ onAdd }) => {

  return (
    <div className={styles.inputTask}>
        
    </div>
  )
}

export default InputTask