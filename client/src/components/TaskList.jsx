import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Task from "./Task";

const TaskList = ({ todos, onToggleCompleted, onDeleteTodo }) => {
    return (
        // <ul>
        //   {todos.map((todo) => (
        //     <Task key={todo._id} todo={todo} onToggleCompleted={onToggleCompleted} onDeleteTodo={onDeleteTodo} />
        //   ))}
        // </ul>

        <Container>
            {todos.map((todo) => (
                <Row>
                    <Task
                        key={todo._id}
                        todo={todo}
                        onToggleCompleted={onToggleCompleted}
                        onDeleteTodo={onDeleteTodo}
                    />
                </Row>
            ))}
        </Container>
    );
};

export default TaskList;
