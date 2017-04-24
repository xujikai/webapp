import React,{Component} from 'react';
import {browserHistory} from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class HotVideoItem extends Component{

    render(){
        const {item} = this.props;

        return(
            <Card onClick={() => { browserHistory.push('/detail'); }}>
                <CardMedia
                    overlayContentStyle={{
                        paddingTop:0
                    }}
                    overlay={
                        <CardTitle
                            title={item.title}
                            style={{
                                height:'1.6rem',
                                padding:'0 1rem 0.5rem 1rem'
                            }}
                            titleStyle={{
                                fontSize:'0.8rem',
                                textAlign:'center'
                            }}
                        />
                    }
                    >
                    <img src={item.imageUrl} style={{width:'100%',height:'100%'}}/>
                </CardMedia>
            </Card>
        );
    }

}