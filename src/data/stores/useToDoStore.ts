import create, {State, StateCreator} from 'zustand';
import { devtools } from 'zustand/middleware'
import { generateId } from '../helpers';

interface Task {
    id: string;
    title: string;
    createAt: number;
    done: boolean;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    doneTask: (id: string, done: boolean) => void;
    removeTask: (id: string) => void;
}

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks))
    }
    set(nextState, ...args)
  }, get, api)

const getCurrentState = () => {
    try {
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[]
        return currentState
    } catch (err) {
        window.localStorage.setItem('tasks', '[]')
    }
    return []
}

export const useToDoStore = create<ToDoStore>(localStorageUpdate(devtools((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createAt: Date.now(),
            done: false
        }

        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },
    doneTask: (id: string, done: boolean) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                done: task.id === id ? done : task.done
            }))
        })
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
    }
}))))