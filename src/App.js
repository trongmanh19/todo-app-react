import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItems';
import NewItem from './components/NewItem';
import FilterArea from './components/filter-area/FilterArea';

class App extends Component {
  state = {
    todoItems: [],
    listFilters: [
      { name: 'All', isSelected: true },
      { name: 'Active', isSelected: false },
      { name: 'Completed', isSelected: false }
    ]
  };

  todoItemsBackup = [...this.state.todoItems];

  onItemClicked(item) {
    return () => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
      this.todoItemsBackup = [
        ...todoItems.slice(0, index),
        {
          ...item,
          isComplete: !isComplete
        },
        ...todoItems.slice(index + 1)
      ];
    };
  }

  onItemRemove(item) {
    return () => {
      const { todoItems } = this.state;
      const itemIndex = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, itemIndex),
          ...todoItems.slice(itemIndex + 1, todoItems.length)
        ]
      });
    }
  }

  onKeyPress = (event) => {
    if(event.key === 'Enter') {
      const valueNewItem = event.target.value;
      if (!valueNewItem) {
        return;
      }
      const newItem = {
        title: valueNewItem,
        isComplete: false
      };
      const { todoItems: currentTodos } = this.state;
      const newItemIndex = currentTodos.findIndex(item => item.title === newItem.title);
      if (newItemIndex === -1) {
        this.setState({
          todoItems: [...currentTodos, newItem],
        });
        this.todoItemsBackup = [...currentTodos, newItem];
      }
    }
  }

  onFilterItem(filterItem) {
    return () => {
      const { name } = filterItem;
      const { listFilters } = this.state;
      listFilters.map(item => {
        if(item === filterItem) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
      });
      switch(name) {
        case 'All':
          this.setState({
            todoItems: [...this.todoItemsBackup]
          });
          break;
        case 'Active':
          const activeItems = this.todoItemsBackup.filter(item => !item.isComplete);
          this.setState({
            todoItems: activeItems
          });
          break;
        case 'Completed':
          const completedItems = this.todoItemsBackup.filter(item => item.isComplete);
          this.setState({
            todoItems: completedItems
          });
          break;
      }
    }
  }

  constructor() {
    super();
  }

  render() {
    const { todoItems, listFilters } = this.state;
    const totalLeftItems = this.todoItemsBackup.filter(item => !item.isComplete).length;
    return (
      <div className="App">
        <NewItem onKeyPress={this.onKeyPress} />
        <div className="ToDoList">
          {
            todoItems.length > 0 && todoItems.map((item, index) => 
              <TodoItem 
                key={index} 
                onChangeStatus={this.onItemClicked(item)}
                onClickRemove={this.onItemRemove(item)}
                item={item} />)
          }
          { !todoItems.length && 'Nothing data'}
        </div>
        <FilterArea totalLeftItems={totalLeftItems} totalItems={this.todoItemsBackup.length}>
        {
          listFilters.map((filterItem, index) => {
            return <button type="button"
                      className={filterItem.isSelected ? 'filter-active' : ''}
                      key={index}
                      onClick={this.onFilterItem(filterItem)}>
                        {filterItem.name}
                    </button>
          })
          }
        </FilterArea>
      </div>
    );
  }
}

export default App;
