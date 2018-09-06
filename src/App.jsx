import React from "react";
import CurrentLocation from "./CurrentLocation";
import MapContainer from "./MapContainer";
import Search from "./Search";
import FavouritesList from "./FavouritesList";

let favourites = [];
if (localStorage.favourites) {
    favourites = JSON.parse(localStorage.favourites);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("App Constructor");

        this.state = {
            currentAddress: "M50 3YJ",
            favourites,
            mapCoordinates: {
                lat: 53.475586,
                lng: -2.241402
            }
        };
        this.searchForAddress = this.searchForAddress.bind(this);
    }

    componentDidMount() {
        console.log("App ComponentDidMount");
    }

    componentDidUpdate() {
        console.log("App ComponentDidUpdate");
    }

    static getDerivedStateFromProps(props, state) {
        console.log("App getDerivedStateFromProps");
        console.dir(props);
        console.dir(state);
        return state;
    }

    getSnapshotBeforeupdate(prevProps, prevState) {
        console.log("App getSnapshotBeforeUpdate");
        console.dir(prevProps);
        console.dir(prevState);
    }

    shouldComponentupdate(nextProps, nextState) {
        console.log("App shouldComponentUpdate");
        console.dir(nextProps);
        console.dir(nextState);
        return !(JSON.stringify(nextProps) === JSON.stringify(this.props)
            && JSON.stringify(nextState) === JSON.stringify(this.state));
    }

    componentWillunmount() {
        console.log("App componentWillUnmount");
    }

    isAddressInFavourite(currentAddress) {
        if (currentAddress !== "Location not found...") {
            let favourites = this.state.favourites;
            let found = false;

            favourites.forEach(value => {
                if (currentAddress === value) {
                    return found = true;
                }
                return found = false;
            })

            return found;
        }
    }

    async searchForAddress(address) {
        const concatAddress = address.replace(' ', '+');
        let currentState = this.state;
        currentState.currentAddress = address;
        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${concatAddress}`;
            let response = await fetch(url);
            let responseJSON = await response.json();
            currentState.mapCoordinates = await responseJSON.results[0].geometry.location;
            console.log(currentState.mapCoordinates);
        }
        catch (error) {
            currentState.currentAddress = `Location not found...`;
            currentState.mapCoordinates = {lat: 0, lng: 0};
        }

        this.setState({
            currentState
        });
    }

    onFavouriteToggle = currentAddress => {
        if (this.isAddressInFavourite(currentAddress)) {
            this.removeFavourite(currentAddress);
        } else {
            this.addFavourites(currentAddress);
        }
    };

    removeFavourite(address){
        let favourites = this.state.favourites;
        let index = -1;

        for (let i =0; i < favourites.length;i++){
            if (favourites[i].address === address){
                index = i;
                break;
            }
        }
        if (index > -1){
            favourites.splice(index, 1);
        }
        this.setState({
            favourites
        });

        localStorage.favourites = JSON.stringify(favourites);

    }

    addFavourites(address){
        if (address !== "Location not found..."){
            let favourites = this.state.favourites;
            favourites.push({address:address,
            timestamp: Date.now()});

            this.setState({
                favourites
            });

            localStorage.favourites = JSON.stringify(favourites);
        }
    }

    render() {
        console.log("Render");
        return (

            <div>
                <h1>{this.props.title}</h1>
                <Search onSearch={this.searchForAddress}/>
                <MapContainer coords={this.state.mapCoordinates}/>
                <CurrentLocation address={this.state.currentAddress} onFavouriteToggle={this.onFavouriteToggle}
                                 favourite={this.isAddressInFavourite(this.state.currentAddress)}/>
                <FavouritesList favouriteLocations={this.state.favourites}
                activeLocationAddress={this.state.currentAddress}
                onClick={this.searchForAddress}/>
            </div>
        )
    }
}

export default App;