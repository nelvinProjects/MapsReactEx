import React from "react";
import moment from "moment";

export default function FavouriteItem(props) {
    let handleClick = () => {
        props.onClick(props.address);
    };

    let lgiClassName = "list-group-item";

    if (props.active){
        lgiClassName += " active-location"
    }

    return (
        <a className={lgiClassName} onClick={handleClick}>
            {props.address}
            <span className="createdAt">{moment(props.timestamp).fromNow()}</span>
            <span className="glyphicon glyphicon-menu-right"></span>
        </a>
    );
}