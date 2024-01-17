import React from "react";
import banner from '../../photos/sip_score_banner.png';

function Header() {
    return (
        <header>
            <img src={banner} className="App-banner" alt="banner" />
        </header>
    );
}

export default Header;