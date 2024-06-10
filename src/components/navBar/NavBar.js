import React from "react";
import NavBarSearch from './navBarSearch/NavBarSearch';
import './NavBar.css'
export default function NavBar() {
    return (
        <nav className="coin-nav-bar">
            <div className="coin-navigation__active-coin">
                <span className="coin-nav-bar__active-coins-name">
                    DOGE
                </span>
                <span className="coin-nav-bar__active-coins-rates">
                    $0.163
                </span>
            </div>
            <div className="coin-nav-bar__selected-coins">
                <div className="coin-nav-bar__selected-coin">
                    <span className="coin-nav-bar__selected-coin-name">
                        BTC
                    </span>
                </div>
                <div className="coin-nav-bar__selected-coin">
                    <span className="coin-nav-bar__selected-coin-name">
                        ETH
                    </span>
                </div>
                <div className="coin-nav-bar__selected-coin">
                    <span className="coin-nav-bar__selected-coin-name">
                        XTZ
                    </span>
                </div>
            </div>
            <NavBarSearch/>
        </nav>
    )
}