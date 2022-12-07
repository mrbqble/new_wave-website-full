import "./documents.css";
import { useContext } from "react";
import { DefaultContext } from "../../../Context";

export const Document = () => {

    const {width} = useContext(DefaultContext);

    return (
        <div className="reg block">
            <h1>Financials</h1>
            <h3 style={{textAlign: "center", width: width > 400 ? "60vw" : "auto", alignSelf: "center", fontWeight: "400"}}>We are totally for being rational everywhere and in everything. We know how important it's to you that your donation is being used rationally. It's nessesary for us, too! That's the reason why we keep our work accountable and transparent as much, as it possible!</h3>
            <div className="data fin">
                <span className="year">2021</span>
                <div className="docs">
                    <a href="">2021 Annual Report</a>
                    <a href="">2021 financil Usage</a>
                </div>
            </div>
            <div className="data fin">
                <span className="year">2020</span>
                <div className="docs">
                    <a href="">2020 Annual Report</a>
                    <a href="">2020 financil Usage</a>
                </div>
            </div>
            <div className="data fin">
                <span className="year">OTHER</span>
                <div className="docs">
                    <a href="">Kazakhstan NCO Certificate</a>
                </div>
            </div>
        </div>
    );
};