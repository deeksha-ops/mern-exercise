import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const Task = ({ todo, onToggleCompleted, onDeleteTodo }) => {
    return (
        <div className="task">
            {/* <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleCompleted(todo._id)}
            />
            <span
                style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                }}
            >
                {todo.text}
            </span>
            <button onClick={() => onDeleteTodo(todo._id)}>Delete</button> */}
            <InputGroup className="mb-3">
                <InputGroup.Checkbox
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleCompleted(todo._id)}
                    aria-label="Checkbox for following text input"
                />
                <Form.Control
                    value={todo.text}
                    aria-label="Text input with checkbox"
                    style={{
                        textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                    }}
                />
                <Button onClick={() => onDeleteTodo(todo._id)} variant="danger">
                    Delete
                </Button>
            </InputGroup>
        </div>
    );
};

export default Task;
