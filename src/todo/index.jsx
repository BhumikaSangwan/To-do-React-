// import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import Input from "../Components/input";
// import Button from "../Components/button";
// import Select from "../Components/select";
// import styles from "./style.module.css";

// export default function Todo() {
//     const [todos, setTodos] = useState([]);
//     const [value, setValue] = useState("");
//     const [editIndex, setEditIndex] = useState(null);
//     const [filter, setFilter] = useState("All");

//     const [displayedTodos, setDisplayedTodos] = useState([]);
//     const [hasMore, setHasMore] = useState(true);

//     const observerRef = useRef(null);

//     useEffect(() => {
//         const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
//         setTodos(storedTodos);
//         setDisplayedTodos(storedTodos.slice(0, 10));
//     }, []);

//     useEffect(() => {
//         localStorage.setItem("todos", JSON.stringify(todos));
//     }, [todos]);

//     const filteredTodos = useMemo(() => {
//         if (filter === "Completed") {
//             return todos.filter((task) => task.completed);
//         } else if (filter === "Pending") {
//             return todos.filter((task) => !task.completed);
//         }
//         return todos;
//     }, [todos, filter]); 

//     const fetchMoreTasks = useCallback(() => {
//         if (displayedTodos.length >= filteredTodos.length) {
//             setHasMore(false);  
//             return;
//         }

//         setTimeout(() => {
//             setDisplayedTodos((prev) => {
//                 const newTodos = [
//                     ...prev,
//                     ...filteredTodos.slice(prev.length, prev.length + 10)
//                 ];
//                 setHasMore(newTodos.length < filteredTodos.length);
//                 return newTodos;
//             });
//         }, 500);
//     }, [displayedTodos, filteredTodos]);

//     useEffect(() => {
//         const observer = new IntersectionObserver((entries) => {
//             const lastEntry = entries[0];
//             if (lastEntry.isIntersecting) {
//                 fetchMoreTasks(); 
//             }
//         }, {
//             rootMargin: "100px", 
//         });

//         if (observerRef.current) {
//             observer.observe(observerRef.current);
//         }

//         return () => {
//             if (observerRef.current) {
//                 observer.unobserve(observerRef.current);
//             }
//         };
//     }, [fetchMoreTasks]); 

    

//     useEffect(() => {
//         setDisplayedTodos(filteredTodos.slice(0, 10));
//         setHasMore(filteredTodos.length > 10);
//     }, [filteredTodos]);

//     function addTask() {
//         if (value.trim() === "") {
//             alert("Enter a task !");
//             setValue("")
//             return ;
//         }
//         if (todos.some((task) => task.text === value)) {
//             alert("This task already exists!");
//             return;
//         }
    
//         const newTask = { text: value, completed: false };
    
//         if (editIndex !== null) {
//             setTodos((prevTodos) => {
//                 const updatedTodos = prevTodos.map((task, idx) =>
//                     idx === editIndex ? { ...task, text: value } : task
//                 );
//                 return updatedTodos;
//             });
//             setEditIndex(null);
//         } else {
//             setTodos((prevTodos) => [...prevTodos, newTask]);
//         }
    
//         setValue(""); 
//     }
    
//     function onInputChange(event) {
//         setValue(event.target.value);
//     }

//     function updateTask(idx) {
//         setEditIndex(idx);
//         setValue(displayedTodos[idx].text);
//     }

//     function deleteTask(idx) {
//         // Get the task text to delete
//         const taskToDelete = displayedTodos[idx].text;
    
//         // Update the main todo list
//         setTodos((prevTodos) => prevTodos.filter((task) => task.text !== taskToDelete));
    
//         // Update the displayed list after deletion
//         setDisplayedTodos((prevDisplayedTodos) => prevDisplayedTodos.filter((_, i) => i !== idx));
//     }
    

//     function toggle(idx) {
//         setTodos((prevTodos) =>
//             prevTodos.map((task) =>
//                 task.text === displayedTodos[idx].text
//                     ? { ...task, completed: !task.completed }
//                     : task
//             )
//         );
//     }
    
    

//     function showTask(event) {
//         setFilter(event.target.value);
//     }

//     return (
//         <div className={styles.main}>
//             <div className={styles.inputContainer}>
//             <Input placeholder="Enter task" value={value} onChange={onInputChange} />
//             <button onClick={addTask}>Add task</button>
//             <Select value={filter} onChange={showTask} />
//             </div>

//             <div id={styles.scrollableDiv} >
//                 <div >
//                     {displayedTodos.length === 0 ? (
//                         <h4 className={styles.loadMsg}>No tasks to display</h4>
//                     ) : (
//                         <ul>
//                             {displayedTodos.map((item, idx) => (
//                                 <li key={idx}>
//                                     <div
//                                         className={styles.container}
//                                         style={{
//                                             textDecoration: item.completed ? "line-through" : "none",
//                                         }}
//                                     >
//                                         {item.text}
//                                     </div>
//                                     <Button onClick={() => updateTask(idx)}>✎</Button>
//                                     <Button onClick={() => deleteTask(idx)}> 🗑</Button>
//                                     <Button onClick={() => toggle(idx)}>
//                                         {item.completed ? "✔️" : "☐"}
//                                     </Button>
//                                 </li>
//                             ))}
//                             <div ref={observerRef} className={styles.loadMsg} >
//                                 {hasMore ? "Loading..." : "No more tasks available"}
//                             </div>
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Input from "../Components/input";
import Button from "../Components/button";
import Select from "../Components/select";
import styles from "./style.module.css";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [filter, setFilter] = useState("All");

    const observerRef = useRef(null);

    // Load todos from localStorage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Filtered tasks based on "All", "Completed", "Pending"
    const filteredTodos = useMemo(() => {
        switch (filter) {
            case "Completed":
                return todos.filter((task) => task.completed);
            case "Pending":
                return todos.filter((task) => !task.completed);
            default:
                return todos;
        }
    }, [todos, filter]);

    // Pagination Logic
    const [displayCount, setDisplayCount] = useState(10);
    const displayedTodos = useMemo(() => filteredTodos.slice(0, displayCount), [filteredTodos, displayCount]);
    const hasMore = displayedTodos.length < filteredTodos.length;

    // Load More Tasks
    const fetchMoreTasks = useCallback(() => {
        if (!hasMore) return;
        setDisplayCount((prev) => prev + 10);
    }, [hasMore]);

    // Observer for infinite scrolling
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) fetchMoreTasks();
            },
            { rootMargin: "100px" }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [fetchMoreTasks]);

    // Add or Edit Task
    function addTask() {
        if (value.trim() === "") {
            alert("Enter a task!");
            return;
        }
        if (todos.some((task) => task.text === value)) {
            alert("This task already exists!");
            return;
        }

        setTodos((prevTodos) => {
            if (editIndex !== null) {
                return prevTodos.map((task, idx) => (idx === editIndex ? { ...task, text: value } : task));
            }
            return [...prevTodos, { text: value, completed: false }];
        });

        setValue("");
        setEditIndex(null);
    }

    function onInputChange(event) {
        setValue(event.target.value);
    }

    function updateTask(idx) {
        setEditIndex(idx);
        setValue(displayedTodos[idx].text);
    }

    function deleteTask(idx) {
        const taskToDelete = displayedTodos[idx].text;
        setTodos((prevTodos) => prevTodos.filter((task) => task.text !== taskToDelete));
    }

    function toggle(idx) {
        const taskText = displayedTodos[idx].text;
        setTodos((prevTodos) =>
            prevTodos.map((task) => (task.text === taskText ? { ...task, completed: !task.completed } : task))
        );
    }

    function showTask(event) {
        setFilter(event.target.value);
        setDisplayCount(10); // Reset pagination on filter change
    }

    return (
        <div className={styles.main}>
            <div className={styles.inputContainer}>
                <Input placeholder="Enter task" value={value} onChange={onInputChange} />
                <button onClick={addTask}>{editIndex !== null ? "Update" : "Add"} task</button>
                <Select value={filter} onChange={showTask} />
            </div>

            <div id={styles.scrollableDiv}>
                {displayedTodos.length === 0 ? (
                    <h4 className={styles.loadMsg}>No tasks to display</h4>
                ) : (
                    <ul>
                        {displayedTodos.map((item, idx) => (
                            <li key={item.text}>
                                <div
                                    className={styles.container}
                                    style={{ textDecoration: item.completed ? "line-through" : "none" }}
                                >
                                    {item.text}
                                </div>
                                <Button onClick={() => updateTask(idx)}>✎</Button>
                                <Button onClick={() => deleteTask(idx)}>🗑</Button>
                                <Button onClick={() => toggle(idx)}>
                                    {item.completed ? "✔️" : "☐"}
                                </Button>
                            </li>
                        ))}
                        <div ref={observerRef} className={styles.loadMsg}>
                            {hasMore ? "Loading..." : "No more tasks available"}
                        </div>
                    </ul>
                )}
            </div>
        </div>
    );
}
