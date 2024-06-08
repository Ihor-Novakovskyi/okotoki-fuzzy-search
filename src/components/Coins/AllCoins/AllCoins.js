import React, { useState, Fragment, useEffect } from "react";
import Coin from "./Coin";

export default function AllCoins({ getCoins, setCoin, setsFromInput = '',getFavouriteCoins }) {
    // const [coins, setShowMoreCoins] = useState(getCoins(setsFromInput));//это будет при скорле спиоск увелииваться
    const [coins, setShowCoins] = useState([]);//это будет при скорле спиоск увелииваться

    console.log('render', coins, setsFromInput)
    useEffect(() => setShowCoins(getCoins(setsFromInput)), [setsFromInput])
    // тут создать еще один юзеффект 
    const needUpdateCoinsList = coins.length % 50 === 0;//если делится без отстатка есть вероятность того что єлементов
    //в списке больше чем нужно показать. На основании єтого мы будем обновлять список если нужно. Если это конец
    // списка и также делится без остатка то унас вовзращается масив и он являсяется всем списком который был получен
    // ранее - соответсвенно перерендера не будет
    console.log(needUpdateCoinsList)
    const coinsList = coins.length ? coins
        .map((coin, ind) => {
            const { coinName, favouriteState, id } = coin
            return (
                <Coin
                    showMoreCoins={ needUpdateCoinsList && coins.length - 10 === ind ?
                        () => setShowCoins(getCoins(setsFromInput))
                        :
                        null
                    }
                    coin={ coin }
                    coinName={ coinName }
                    favouriteState={ favouriteState }
                    key={ id }
                    setCoin={ setCoin }
                    getFavouriteCoins={ getFavouriteCoins }
                />
            )
        })
        :
        null;
    
    return (
        <Fragment>
            {coinsList}
        </Fragment>
    )
}