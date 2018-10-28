import React from "react";
import { FooterFlex } from "./styles";

export const Footer = () => {
    return (
        <div>
            <FooterFlex>
                <a href={"https://github.com/ckfreak"} target={"_blank"}>Timbo Blaesche</a>
                <a href={"mailto:timbo@tributi.de?subject=Bug Christophorus Print Manager"}>Fehler melden</a>
                <a href={"mailto:timbo@tributi.de?subject=Christophorus Print Manager"}>Kontakt</a>
            </FooterFlex>
        </div>
    );
};
