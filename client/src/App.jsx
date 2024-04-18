import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Task from "./components/Task";
import TaskList from "./components/TaskList";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState("");
    const backendUrl = "https://vast-rose-bullfrog-hem.cyclic.app/api/todos";

    // Fetch todos from backend on component mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(backendUrl);
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
    }, []);

    const handleInputChange = (event) => {
        setNewTodoText(event.target.value);
    };

    const handleAddTodo = async () => {
        if (!newTodoText.trim()) return; // Prevent adding empty todos

        try {
            const response = await fetch(backendUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newTodoText }),
            });

            const newTodo = await response.json();
            setTodos([...todos, newTodo]); // Add new todo to state
            setNewTodoText("");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const handleToggleCompleted = async (id) => {
        try {
            const updatedTodo = { ...todos.find((todo) => todo._id === id) };
            updatedTodo.completed = !updatedTodo.completed;

            const response = await fetch(`${backendUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTodo),
            });

            if (response.ok) {
                setTodos(
                    todos.map((todo) => (todo._id === id ? updatedTodo : todo)),
                );
            }
        } catch (error) {
            console.error("Error toggling completion:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            const response = await fetch(`${backendUrl}/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setTodos(todos.filter((todo) => todo._id !== id));
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            {/* <input
                type="text"
                value={newTodoText}
                onChange={handleInputChange}
            /> */}
            <InputGroup
                className="mb-3"
                style={{
                    width: "45%",
                }}
            >
                <Form.Control
                    type="text"
                    value={newTodoText}
                    onChange={handleInputChange}
                    placeholder="Todo Item"
                    aria-label="Todo Item"
                    aria-describedby="basic-addon2"
                />
                <Button onClick={handleAddTodo} variant="success">
                    Add Todo
                </Button>
            </InputGroup>
            {/* <button onClick={handleAddTodo}>Add Todo</button> */}
            <TaskList
                todos={todos}
                onToggleCompleted={handleToggleCompleted}
                onDeleteTodo={handleDeleteTodo}
            />
        </div>
    );
}

export default App;
