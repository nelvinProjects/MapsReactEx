import React from "react";

export default class CurrentLocation extends React.Component{
    constructor(props){
        super(props);
        console.log("CurrentLocation constructor")

        this.state = {};

        this.toggleFavourite = () => {
            this.props.onFavouriteToggle(this.props.address)
        }
    }

    componentDidMount() {
        console.log("CurrentLocation ComponentDidMount");
    }

    componentDidUpdate() {
        console.log("CurrentLocation ComponentDidUpdate");
    }

    static getDerivedStateFromProps(props, state) {
        console.log("CurrentLocation getDerivedStateFromProps");
        console.dir(props);
        console.dir(state);
        return state;
    }

    getSnapshotBeforeupdate(prevProps, prevState) {
        console.log("CurrentLocation getSnapshotBeforeUpdate");
        console.dir(prevProps);
        console.dir(prevState);
    }

    shouldComponentupdate(nextProps, nextState) {
        console.log("CurrentLocation shouldComponentUpdate");
        console.dir(nextProps);
        console.dir(nextState);
        return  nextProps.address !== this.props.address;
    }

    componentWillunmount(){
        console.log("CurrentLocation componentWillUnmount");
    }

    render(){
        console.log("CurrentLocation Render");
        let favouriteClassName = "";

        if(this.props.currentAddress !== 'Location not found...') {
            if(this.props.favourite) {
                favouriteClassName = `glyphicon glyphicon-star`;
            }
            else {
                favouriteClassName = `glyphicon glyphicon-star-empty`;
            }
        }

        return(
            <div className="col-xs-12 col-md4 col-md-offset-3 current-location">
                <h4 id="save-location">{this.props.address}</h4>
                {this.props.address === "Location not found..." ? false :
                <span className={favouriteClassName} onClick={this.toggleFavourite}
                aria-hidden="true"></span>}
            </div>
        )
    }
}