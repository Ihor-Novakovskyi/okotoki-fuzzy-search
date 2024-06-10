import React, { useState, Fragment, useEffect } from "react";
import FavouriteCoin from "./FavouriteCoin";

export default function FavouriteCoins({ setCoin, setsFromInput = '', getFavouriteCoins }) {
    const [favouriteCoins, setShowFavouriteCoins] = useState([]);//это будет при скорле спиоск увелииваться
    useEffect(() => setShowFavouriteCoins(getFavouriteCoins(setsFromInput)),[setsFromInput])
   
    const listOfFavouriteCoins = favouriteCoins.length ? favouriteCoins
        .map((coin) => {
            const { coinName, id } = coin;
            return (
                <FavouriteCoin
                    coin={ coin }
                    coinName={ coinName }
                    key={ id }
                    setCoin={ setCoin }
                />
            )
        })
        :
        null;
    
    return (
        <Fragment>
            {listOfFavouriteCoins}
        </Fragment>
    )
}