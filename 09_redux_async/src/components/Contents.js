/**
 * Created by xxx on 2017/4/12.
 */
import React,{Component} from 'react';

export default class Contents extends Component{

    componentDidMount() {
        const {title,getContents} = this.props;
        getContents(title);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        if(nextProps.title !== this.props.title){
            const {title,getContents} = nextProps;
            getContents(title);
        }
    }

    render(){
        const {title,data,options,onChange} = this.props;
        const isEmpty = data.items.length === 0;

        return(
            <div>
                <span>
                    <h1>{title}</h1>
                    <select value={title} onChange={(e) => onChange(e.target.value)}>
                        {options.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </span>

                <p>
                    {
                        data.lastUpdated &&
                            <span>
                                Last Updated at {new Date(data.lastUpdated).toLocaleTimeString()}. {' '}
                            </span>
                    }

                    {
                        !data.isFetching &&
                            <a href="#" onClick={this.handleUpdateContents}>Refresh</a>
                    }
                </p>

                {
                    isEmpty ?
                        (data.isFetching ? <h2>Loading</h2> : <h2>Empty</h2>) :
                        (<div style={{opacity:data.isFetching ? 0.5 : 1}}>
                            <ul>
                                {data.items.map(item => <li key={item.id}>{item.title}</li>)}
                            </ul>
                        </div>)
                }
            </div>
        );
    }

    handleUpdateContents = (e) => {
        e.preventDefault();

        const { title, updateContents, getContents } = this.props;
        updateContents(title);
        getContents(title);
    }

}