import React from 'react';
import AppBar from './components/AppBar/AppBar.jsx';
import {Route, Switch, withRouter} from 'react-router-dom';
import SearchContainer from "./components/Users/SearchContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Preloader from "./components/Common/Preloader/Preloader";
import WithSuspense from "./hoc/withSuspense";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {withStyles} from "@material-ui/core";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const styles = theme => ({
    root: {
        maxWidth: 600,
        margin: '0 auto',
        paddingBottom: 100,
        background: '#fff',
        minHeight: '100vh'
    },
    main: {
        padding: "0 15px"
    }
});

class App extends React.Component {

    catchAllUnhandledError(reason) {
        console.log(reason);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledError);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledError);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>;
        }

        const {classes} = this.props;
        return (
                <div className={classes.root}>
                    <HeaderContainer/>
                    <div className={classes.main}>
                        <Switch>
                            <Route path='/profile/:userId?'
                                   render={WithSuspense(ProfileContainer)}
                            />

                            <Route exact path='/'
                                   render={WithSuspense(ProfileContainer)}
                            />

                            <Route exact path='/dialogs'
                                   render={WithSuspense(DialogsContainer)}
                            />

                            <Route exact path='/news'
                                   render={()=>{
                                       return <div>The page is being created</div>;
                                   }}
                            />

                            <Route exact path='/search'
                                   render={WithSuspense(SearchContainer)}
                            />


                            <Route exact path='/settings'
                                   render={()=>{
                                       return <div>The page is being created</div>;
                                   }}
                            />

                            <Route exact path='/login'
                                   render={WithSuspense(Login)}
                            />

                            <Route path='*'
                                   render={() => {
                                       return <div>404 not found</div>;
                                   }}/>
                        </Switch>
                    </div>
                    <AppBar/>
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

const AppContainer = compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, {initializeApp})
)
(App);

export default AppContainer;
