import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItems';
import NewItem from './components/NewItem';
import FilterArea from './components/filter-area/FilterArea';

class App extends Component {
  state = {
    newItemValue: '',
    todoItems: [
      // {title: '12345', isComplete: true},
      // {title: '12345978', isComplete: false},
    ],
    listFilters: [
      { name: 'All', isSelected: true },
      { name: 'Active', isSelected: false },
      { name: 'Completed', isSelected: false }
    ]
  };

  todoItemsBackup = [...this.state.todoItems];

  onInputNewItem = (event) => {    
    const { value } = event.target;
    this.setState({newItemValue: value});
  }

  onCreateNewItem = (event) => {
    if(event.key === 'Enter') {
      const { value: valueNewItem } = event.target;
      if (!valueNewItem) {
        return;
      }
      const newItem = {
        title: valueNewItem,
        isComplete: false
      };
      const currentTodos = this.todoItemsBackup;
      const newItemIndex = currentTodos.findIndex(item => item.title === newItem.title);
      if (newItemIndex === -1) {
        this.setState(
          {
            newItemValue: '' ,
            todoItems: [...currentTodos, newItem],
            listFilters: [
              { name: 'All', isSelected: true },
              { name: 'Active', isSelected: false },
              { name: 'Completed', isSelected: false }
            ]
          }
        );
        this.todoItemsBackup = [...currentTodos, newItem];
      }
    }
  }
  
  onUpdateValueInput = (event) => {
    const { todoItems } = this.state;
    const { id, value } = event.target;
    const itemIndex = todoItems.findIndex(item => item.title === id);
    if (!value) {
      const items = this.removeItem(todoItems, itemIndex);
      console.log(items);
      
      this.setState({
        todoItems: items
      });
      this.todoItemsBackup = items;
      return;
    }
    if (itemIndex !== -1 && value) {
      todoItems[itemIndex].title = value;
    }
    this.setState({ todoItems });
    this.todoItemsBackup = todoItems;
  }

  onCompleteAll = () => {
    const { todoItems, listFilters } = this.state;
    const filterType = listFilters.filter(item => item.isSelected === true)[0].name;
    console.log(filterType);
    
    let todoItemsComplete;
    switch(filterType) {
      case 'Completed':
        todoItemsComplete = todoItems.map(item => {
          item.isComplete = false;
          return item;
        });
        // this.setState({todoItems: todoItemsComplete});
        break;
      default:
        todoItemsComplete = todoItems.map(item => {
          item.isComplete = true;
          return item;
        });
        // this.setState({todoItems: todoItemsComplete});
        break;
    }
    this.setState({todoItems: todoItemsComplete});
  }

  onItemChangeStatus(item) {
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
      this.todoItemsBackup = [
        ...todoItems.slice(0, itemIndex),
        ...todoItems.slice(itemIndex + 1, todoItems.length)
      ];
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

  removeItem = (todoItems, itemIndex) => {
    return [
      ...todoItems.slice(0, itemIndex),
      ...todoItems.slice(itemIndex + 1, todoItems.length)
    ];
  }

  constructor() {
    super();
  }

  render() {
    const { todoItems, listFilters, newItemValue } = this.state;
    const totalLeftItems = this.todoItemsBackup.filter(item => !item.isComplete).length;
    return (
      <div className={this.todoItemsBackup.length ? 'App app-has-item' : 'App'}>
        <div className="container">
          <NewItem 
            onKeyPress={this.onCreateNewItem}
            inputValue={newItemValue}
            onClickAll={this.onCompleteAll}
            onChange={this.onInputNewItem} />
          <div className="ToDoList">
            {
              todoItems.length > 0 && todoItems.map((item, index) => 
                <TodoItem 
                  key={index} 
                  onChangeStatus={this.onItemChangeStatus(item)}
                  onClickRemove={this.onItemRemove(item)}
                  onChangeValue={this.onUpdateValueInput}
                  item={item} />)
            }
            { !todoItems.length && <em style={{display: "block", color: "red", paddingTop: "10px"}}>Nothing data</em>}
          </div>
          <FilterArea totalLeftItems={totalLeftItems} totalItems={this.todoItemsBackup.length}>
          {
            listFilters.map((filterItem, index) => {
              return <button type="button"
                        className={filterItem.isSelected ? 'filter-active btn-filter' : 'btn-filter'}
                        key={index}
                        onClick={this.onFilterItem(filterItem)}>
                          {filterItem.name}
                      </button>
            })
            }
          </FilterArea>
        </div>
      </div>
    );
  }
}

export default App;
