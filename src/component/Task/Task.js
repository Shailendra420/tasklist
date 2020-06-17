import React, { Component } from 'react';
import './Task.scss';

class Task extends Component {
    constructor(props) {
        super(props);

        this.submitTask = this.submitTask.bind(this);
        this.enterTask = this.enterTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.cancelTask = this.cancelTask.bind(this);
        this.handleSearchText = this.handleSearchText.bind(this);

        this.searchTaskInputRef = React.createRef();

        this.state = {
            inputTaskElems: [
                {"id": 1, "value": "Excercise"},
                {"id": 2, "value": "Groceries"},
                {"id": 3, "value": "Work"},
            ],
            searchText: "",
            elemObj: {}
        }
    }

    // Adds new task
    addTask(e) {
        if(e.target.previousElementSibling.value && e.target.previousElementSibling.value.match(/^(?! +$)[A-Za-zăâîșțĂÂÎȘȚ -]+$/gm)) {
            this.setState({
                inputTaskElems: [...this.state.inputTaskElems, {"id": this.state.inputTaskElems.length + 1, "value": e.target.previousElementSibling.value.trim()}]
            })
            e.target.previousElementSibling.value = "";
        }
    }

    // Marks the task as complete
    submitTask(e) {
        if(e.target.previousElementSibling.style.textDecoration !== "line-through") {
            e.target.previousElementSibling.style.textDecoration = "line-through";
        } else {
            e.target.previousElementSibling.style.textDecoration = "";
        }
    }

    // Delete task
    cancelTask(e) {
        this.setState(prevState => {
            const inputTaskElems = prevState.inputTaskElems.filter(task => task.id !== parseInt(e.id));
            return { inputTaskElems };
        })
    }

    // Edit task
    enterTask(e) {
        if(e.key === "Enter") {
            let inputTaskElems = this.state.inputTaskElems;
            for(let i = 0;i<inputTaskElems.length;i++) {
                if(parseInt(e.target.parentElement.id) === parseInt(inputTaskElems[i].id)) {
                    inputTaskElems[i].value = e.target.value;
                }
            }
            this.setState({
                inputTaskElems: [...inputTaskElems]
            }, () => console.log(this.state.inputTaskElems));
        }
    }

    // Render all task or filter task
    renderTaskList = (inputTaskElem) => {
        const {searchText} = this.state;
        if(searchText !== "" && inputTaskElem.value.toLowerCase().indexOf(searchText.toLowerCase()) === -1) {
            return null;
        }
        return (
            <div className="task-block" key={inputTaskElem.id} id={inputTaskElem.id}>
                <input className="task-block__task-input" type="text" defaultValue={inputTaskElem.value} onFocus={this.handleEdit} onKeyDown={this.enterTask}/>
                <button className="task-block__done-btn" onClick={this.submitTask}>&#x2714;</button>
                <button className="task-block__cancel-btn" onClick={this.cancelTask.bind(this, inputTaskElem)}>&#x274C;</button>
            </div>
        )
    }

    // Search task
    handleSearchText(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    render() {
        return (
            <div className="task-list-wrapper">
                <h2>Tasklist</h2>
                <div className="input-block">
                    <input className="input-block__search hideSearch" ref={this.searchTaskInputRef} onChange={this.handleSearchText} type="text" placeholder="Search task..."/>
                    <div className="input-block__add-task-wrap">
                        <input className="input-block__add-task-input" type="text" placeholder="Add task..." onKeyDown={this.enterTask}/>
                        <button className="input-block__add-task-btn" onClick={this.addTask}>&#43;</button>
                    </div>
                </div>
                <div>
                    {
                        this.state.inputTaskElems.map((inputTaskElem) => {
                            return this.renderTaskList(inputTaskElem);
                        })
                    }
                </div>
            </div>
        );
    }
};

export default Task;