const React = require('react');

const MyButton = React.createClass({

    render(){
        const items = this.props.items;
        const itemsHtml = items.map(function (item, i) {
            return <li key={i}>{item}</li>;
        });

        return (
            <div>
                <ul>{itemsHtml}</ul>
                <button onClick={this.props.addItem}>New Item</button>
                <button onClick={this.props.delItem}>Del Item</button>
            </div>
        );
    }

});

module.exports = MyButton;