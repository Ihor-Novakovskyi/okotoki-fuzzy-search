import FuzzySearch from "fuzzy-search";
export default function CreateCoinsList(coins) {
    const allCoins = {
        coinsList: coins.length ? coins.map(createCoin) : [],
        offSetCoins:0,
    }
    const filterCoins = {
        filterListOfCoins: [],
        filterSettings: '',
        offsetFilterCoins: 0
    }
    let favouriteCoins = [];
    const searcher = new FuzzySearch(allCoins.coinsList, ['coinName'], { sort: true });

    function createCoin(el, ind) {
        return {coinName: el, favouriteState: false, id:ind}
    }
    function getCoins(searchSettings = '') {
        let { coinsList, offSetCoins } = allCoins;
        if (coinsList.length && typeof searchSettings === "string") {
            const settingsForSearch = searchSettings.trim();
            if (searchSettings !== '') {
                let { filterListOfCoins, filterSettings, offsetFilterCoins } = filterCoins;
                allCoins.offSetCoins = 0;// сбрсываем офсеты нефильтрованого списка всех монет 
                if (settingsForSearch === filterSettings) {
                    //тут отдаем части фильтрованого списка монет
                    offsetFilterCoins += 50;
                    console.log(offsetFilterCoins)
                    filterCoins.offsetFilterCoins = offsetFilterCoins;
                   return offsetFilterCoins >= filterListOfCoins.length ? filterListOfCoins : filterListOfCoins.slice(0, offsetFilterCoins)
                }
                console.log('searchSettins', searchSettings);
                console.log("filterSettings", filterSettings);
                //нижний блок кода віполняется только в самом начале момента фильтрации
                // создаеется фильтрованный список со всеми монетами которые соответсвуют фильтрации
                console.log('its work first')
                offsetFilterCoins = 50;
                filterCoins.offsetFilterCoins = offsetFilterCoins;
                filterCoins.filterSettings = settingsForSearch;
                filterListOfCoins = searcher.search(settingsForSearch);
                filterCoins.filterListOfCoins = filterListOfCoins;

                return offsetFilterCoins >= filterListOfCoins.length ? filterListOfCoins : filterListOfCoins.slice(0, offsetFilterCoins)
                // тут я думаю нужно создать объект с фильтрованными по строке масивом и внутри создать офсет
                // и каждый раз когда будет запускаться эта функция а офсет === сеттингс то у меня слайсится
                // фильтрованный масив с увеличениме счетчика пока не дойдем до конца 
            }
            offSetCoins += 50;
            allCoins.offSetCoins = offSetCoins;
            return offSetCoins >= coinsList.length ? coinsList : coinsList.slice(0 , offSetCoins)
        }
        return coinsList
    }

    function changeFavouriteStateOfCoin(coin) {
        coin.favouriteState = !coin.favouriteState;
        if (coin.favouriteState) {
            favouriteCoins = [...favouriteCoins];
            favouriteCoins.push(coin)
            return;
        }
        favouriteCoins = favouriteCoins.filter((el) => el !== coin)
        
    }
    function getFavouriteCoins(searchSettings = '') {
        if (favouriteCoins.length && typeof settingsForSearch === "string") {
            const settingsForSearch = searchSettings.trim();
            if (settingsForSearch !== '') {
                const searcher = new FuzzySearch(favouriteCoins,['coinName'],{sort: true})
                return searcher.search(settingsForSearch)
            }
            // offset += 50;
            // return offset > coinsList.length ? coinsList : coinsList.slice(0 , offset)
        }
        return favouriteCoins
    }
    return {
        getCoins,
        getFavouriteCoins,
        changeFavouriteStateOfCoin
    }
}