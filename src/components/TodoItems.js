import React, {
	Component
} from 'react';
import './TodoItem.css';

class TodoItem extends Component {
	state = {}

	render() {
		const { item, onChangeStatus, onClickRemove } = this.props;
		let className = 'TodoItem';
		className = item.isComplete ? `${className} TodoItem-complete`: className;
		return (
			<div className={className}>
				<div className="selectbox-item">
					<input type="checkbox"/>
				</div>
				<div onClick={onChangeStatus}>{this.props.item.title}</div>
				<button type="button" onClick={onClickRemove} className="btn-remove-item">
					<span>x</span>
				</button>
			</div>
		);
	}
}

export default TodoItem;