import React, {Component} from 'react';
import PageTransition from "react-router-page-transition";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class RootPage extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <PageTransition>
                    {this.props.children}
                </PageTransition>
            </MuiThemeProvider>
        );
    }

}