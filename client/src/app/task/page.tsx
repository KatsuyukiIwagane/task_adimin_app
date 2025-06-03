'use client';

import {use, useEffect, useState} from 'react';
import Link from 'next/link'; //次ページに遷移するライブラリ

const TASK_STORAGE_KEY = 'mytasks'; //ローカルストレージのキー

type Task = {
    id: number;
    title: string;
    date: string;
    priority: `低` | `中` | `高`;
    completed: boolean;
};

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskPriority, setTaskPriority] = useState<'低' | '中' | '高'>('中');
    
    useEffect(() => {
        // ローカルストレージからタスクを読み込む
        const savedTasks = localStorage.getItem(TASK_STORAGE_KEY);
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                setTasks(parsedTasks);
            } catch (error) {
                console.error('タスクの読み込みに失敗しました:', error);
            }
        }
    }, []);

    useEffect(() => {
        // タスクが更新されたらローカルストレージに保存
        localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        const newTask: Task = {
            id: Date.now(),
            title: taskTitle,
            date: taskDate,
            priority: taskPriority,
            completed: false,
        };
        setTasks((prev) => [...tasks, newTask]);

        //入力リセット
        setTaskTitle('');
        setTaskDate('');
        setTaskPriority('中');
    };



    return (
        <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">タスク追加</h1>
        <div className="space-y-2 mb-6">
            <input
            type="text"
            placeholder="タスク名"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="border px-2 py-1 w-full text-black"
            />
            <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="border px-2 py-1 w-full text-black"
            />
            <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value as '低' | '中' | '高')}
            className="border px-2 py-1 w-full text-black"
            >
            <option value="低">低</option>
            <option value="中">中</option>
            <option value="高">高</option>
            </select>
            <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
            タスク追加
            </button>
        </div>

        <h2 className="text-xl font-semibold mb-2">タスク一覧</h2>
        <ul className="space-y-2">
            {tasks.map((task) => (
            <li key={task.id} className="border p-2 rounded">
                <div className="font-bold">{task.completed ? <s>{task.title}</s> : task.title}</div>
                <div className="text-sm text-gray-600">
                期限: {task.date} / 優先度: {task.priority}
                </div>
                <button
                onClick={() => {
                    setTasks((prev) =>
                        prev.map((t) =>
                            t.id === task.id ? {...t, completed: !t.completed} : t
                        )
                    );
                }}
                className = {`mt-2 px-3 py-1 rounded ${task.completed ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                {task.completed ? '完了' : '未完了'}
                </button>
                <button
                onClick={() => {
                    setTasks((prev) => prev.filter((t) => t.id !== task.id));
                }}
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded">
                削除
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
}
