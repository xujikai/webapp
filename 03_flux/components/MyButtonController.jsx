/**
 * Created by xxx on 2017/3/29.
 */
const React = require('react');
const MyButton = require('./MyButton');
const ButtonActions = require('../actions/ButtonActions');
const ListStore = require('../stores/ListStore');

const MyButtonController = React.createClass({

    getInitialState(){
        return {
            items: ListStore.getAll()
        }
    },

    componentDidMount(){
      ListStore.addChangeListener(this._onChange);
    },

    componentWillUnmount(){
      ListStore.removeChangeListener(this._onChange);
    },

    render(){
        return (
            <div>
                <MyButton items={this.state.items} addItem={this.createNewItem} delItem={this.delItem}/>
            </div>);
    },

    createNewItem(){
        ButtonActions.addNewItem('New Item');
    },

    delItem(){
        ButtonActions.delItem();
    },

    _onChange(){
        this.setState({
            items: ListStore.getAll()
        });
    },
});

module.exports = MyButtonController;