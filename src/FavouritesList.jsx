import React from "react";
import FavouriteItem from "./FavouriteItem";

export default function FavouritesList(props) {
    let favouriteLocations = props.favouriteLocations.map((location) => {
        console.dir(location);

        let active = props.activeLocationAddress === location.address;
        return <FavouriteItem
            address={location.address}
            key={location.timestamp}
            timestamp={location.timestamp}
            active={active}
            onClick={props.onClick}
        />
    });

    return (
        <React.Fragment>
            {(favouriteLocations.length) ?
                <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                    <span className="list-group-item-active">Saved Locations</span>
                    {favouriteLocations}
                </div>
                : false}
        </React.Fragment>
    );
}