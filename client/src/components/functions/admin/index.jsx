import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultContext } from "../../../Context";

export const AdminPage = () => {

    const navigate = useNavigate();
    const {  } = useContext(DefaultContext);

    return (
        <div className="reg block eventinfo">
            <a className="cert btn" onClick={() => navigate("/changeStatus")}>Change statuses</a>
            <a className="cert btn" onClick={() => navigate("/eventList")}>See events</a>
        </div>
    )
}
