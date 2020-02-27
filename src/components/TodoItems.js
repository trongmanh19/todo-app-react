import React, {
	Component
} from 'react';
import './TodoItem.css';

class TodoItem extends Component {
	state = {
		isEdited: false
	}

	render() {
		const { item, onChangeStatus, onClickRemove, onChangeValue } = this.props;
		let todoItemClass = 'todo-item';
		todoItemClass = item.isComplete ? `${todoItemClass} todo-item-complete`: todoItemClass;
		return (
			<div className={todoItemClass}>
				<div>
					<input type="checkbox" checked={item.isComplete} onChange={onChangeStatus}/>
				</div>
				<div className="todo-item-title" onDoubleClick={() => this.setState({isEdit: true})}>
					{
						this.state.isEdit ? 
							<input type="text"
								className="todo-item-input-title"
								autoFocus={true}
								id={item.title}
								value={item.title}
								onBlur={() => this.setState({isEdit: false})}
								onChange={onChangeValue}
							/> : <p>{item.title}</p>
					}
					
				</div>
				<button type="button" onClick={onClickRemove} className="btn-remove-item">
					<span>x</span>
				</button>
			</div>
		);
	}
}

export default TodoItem;