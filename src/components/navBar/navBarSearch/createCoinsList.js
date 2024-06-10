import FuzzySearch from "fuzzy-search";
export default function CreateCoinsList(coins) {
    const offSet = 50;
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
    function resetOffset(action) {
        switch (action) {
            case 'resetAll':
                allCoins.offSetCoins = 0;
                filterCoins.offsetFilterCoins = 0;
                return
            case 'allCoins':
               allCoins.offSetCoins = 0;
                return
            case 'filterCoins':
                filterCoins.offsetFilterCoins = 0;
                return
        }
    }
    const searcher = new FuzzySearch(allCoins.coinsList, ['coinName'], { sort: true });

    function createCoin(el, ind) {
        return {coinName: el, favouriteState: false, id:ind}
    }
    function getFilterCoins(settingsForSearch) {
        resetOffset('allCoins')
        if (settingsForSearch === filterCoins.filterSettings) {
            filterCoins.offsetFilterCoins += offSet;
            return filterCoins.offsetFilterCoins >= filterCoins.filterListOfCoins.length ?
                filterCoins.filterListOfCoins
                :
                filterCoins.filterListOfCoins.slice(0, filterCoins.offsetFilterCoins)
        }

        resetOffset('filterCoins')
        filterCoins.offsetFilterCoins += offSet;
        filterCoins.filterSettings = settingsForSearch;
        filterCoins.filterListOfCoins = searcher.search(settingsForSearch);

        return filterCoins.offsetFilterCoins >= filterCoins.filterListOfCoins.length ?
            filterCoins.filterListOfCoins
            :
            filterCoins.filterListOfCoins.slice(0, filterCoins.offsetFilterCoins)
    }
    function getCoins(searchSettings = '') {
        let { coinsList, offSetCoins } = allCoins;
        if (coinsList.length && typeof searchSettings === "string") {
            const settingsForSearch = searchSettings.trim();
            if (settingsForSearch !== '') {
                allCoins.offSetCoins = 0;
                return getFilterCoins(settingsForSearch);
            }
            filterCoins.offsetFilterCoins = 0;
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
        if (favouriteCoins.length && typeof searchSettings === "string") {
            const settingsForSearch = searchSettings.trim();
            if (settingsForSearch !== '') {
                const searcher = new FuzzySearch(favouriteCoins,['coinName'],{sort: true})
                return searcher.search(settingsForSearch)
            }

        }
        return favouriteCoins
    }
    return {
        getCoins,
        getFavouriteCoins,
        changeFavouriteStateOfCoin,
        resetOffset
    }
}