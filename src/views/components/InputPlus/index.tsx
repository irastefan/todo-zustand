import React from 'react'

import styles from './index.module.scss'

interface InputPlusProps {
    onAdd: (title: string) => void
}

const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {

  const [inputValue, setInputValue] = React.useState('');

  const addTask = React.useCallback(() => {
    onAdd(inputValue);
    setInputValue('');
  }, [inputValue])

  return (
    <div className={styles.inputPlus}>
        <input 
            type='text' 
            className={styles.inputPlusValue}  
            value={inputValue} 
            placeholder='Type here...' 
            onChange={event => setInputValue(event.target.value)} 
            onKeyDown={event => { if (event.key === 'Enter') addTask() } }
        />
        <button
            className={styles.inputPlusButton} 
            aria-label='Add Task' 
            onClick={addTask}
        />
    </div>
  )
}

export default InputPlus