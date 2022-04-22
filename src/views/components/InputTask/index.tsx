import React from 'react'

import styles from './index.module.scss'

interface InputTaskProps {
    id: string,
    title: string,
    done: boolean,
    onDone: (id: string, done: boolean) => void,
    onEdited: (id: string, value: string) => void,
    onRemoved: (id: string) => void
}

const InputTask: React.FC<InputTaskProps> = ({ id, title, done, onDone, onEdited, onRemoved }) => {
  const [checked, setChecked] = React.useState(false)
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [newValue, setNewValue] = React.useState(title)
  const editTitleInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isEditMode) {
        editTitleInputRef?.current?.focus();
    }
  }, [isEditMode])

  return (
    <div className={styles.inputTask}>
        <label className={styles.inputTaskLabel}>
            <input 
                className={styles.inputTaskCheckbox}
                type='checkbox' 
                disabled={isEditMode}
                checked={done}
                onChange={event => {
                    setChecked(event.target.checked)
                    onDone(id, event.target.checked)
                }}
            />
            {
                isEditMode
                ? <input 
                    ref={editTitleInputRef}
                    className={styles.inputTaskTitleEdit}
                    value={newValue}
                    onChange={event => setNewValue(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            onEdited(id, newValue)
                            setIsEditMode(false)
                        }
                    }}
                />
                : <h3 className={`${styles.inputTaskTitle} ${done && styles.inputTaskTitleDone}`}>{title}</h3>
            }
            
        </label>
        {
            isEditMode
            ? <button 
            className={styles.inputTaskSave}
            aria-label='Save task'
            onClick={() => {
                onEdited(id, newValue)
                setIsEditMode(false)
            }}
        />
            : <button 
            className={styles.inputTaskEdit}
            aria-label='Edit task'
            onClick={() => {
                setIsEditMode(true)
            }}
        />
        }
        
        <button 
            className={styles.inputTaskRemove}
            aria-label='Remove task'
            onClick={() => {
                if (confirm('Are you sure?')) {
                    onRemoved(id)
                }
            }}
        />
    </div>
  )
}

export default InputTask