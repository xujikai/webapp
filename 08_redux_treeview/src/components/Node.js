/**
 * Created by xxx on 2017/4/10.
 */
import React,{ Component } from 'react';
import NodeContainer from '../containers/NodeContainer';

export default class Node extends Component{

    render(){
        const {node, parentId} = this.props;

        const close = (parentId !== 'undefined') ?
            (<a href="#"
                onClick={this.handleRemove.bind(this)}
                style={{color:'lightGray',textDecoration:'none'}}>×</a>) : (<div/>);

        return(
            <div>
                Counter：{node.counter} {' '}
                <button onClick={this.handleIncrement.bind(this)}>+</button> {' '}
                {close}
                <ul>
                    {node.childIds.map(this.renderChild.bind(this))}
                    <li key="add">
                        <a href="#" onClick={this.handleAddChild.bind(this)}>Add Child</a>
                    </li>
                </ul>
            </div>
        );
    }

    renderChild(childId){
        const { id } = this.props;
        return (
            <li key={childId}>
                <NodeContainer id={childId} parentId={id}/>
            </li>
        );
    }

    handleIncrement(e){
        e.preventDefault();

        const {increment,id} = this.props;
        increment(id);
    }

    handleAddChild(e){
        e.preventDefault();

        const {addChild,createNode,id} = this.props;
        const childId = createNode().nodeId;
        addChild(id,childId);
    }

    handleRemove(e){
        e.preventDefault();

        const {removeChild,deleteNode,parentId,id} = this.props;
        removeChild(parentId,id);
        deleteNode(id);
    }

}