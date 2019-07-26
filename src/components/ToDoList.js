import React from 'react'
import List from './List'
function ToDoList(props){
    return(
        <div>
        <List 
        greetings= {props.location.state.msg}
        usr= {props.location.state.usr}
        pwd= {props.location.state.pwd}
        />
        </div>
    )
}

export default ToDoList