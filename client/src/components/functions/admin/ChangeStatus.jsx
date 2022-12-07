import { useEffect, useState } from "react";
import { useContext } from "react";
import { getUsers, status } from "../../../actions/user";
import { DefaultContext } from "../../../Context";

export const ChangeStatus = () => {

    const [users, setUsers] = useState();
    const [search, setSearch] = useState('');
    const arraySF = users?.filter(item => (item.firstName + "" + item.secondName).substring(0, search.length).toLowerCase() === search.toLowerCase());
    const statuses = ["Volunteer", "Coordinator", "Administrator"];
    const [changedUsers, setChangedUsers] = useState([]);

    const handleChangeStatus = (email, status) => {
        let newUsers = JSON.parse(JSON.stringify(users))
        const findUser = newUsers.find(item => item.email === email);
        findUser.type = status
        setUsers(newUsers)
        let newChangedUsers = JSON.parse(JSON.stringify(changedUsers))
        const use = newChangedUsers.find(item => item.email === email);
        if (use) {
            console.log(use);
            use.type = status
            setChangedUsers(newChangedUsers)
        } else {
            setChangedUsers([...changedUsers, {email: email, type: status}])
        }
    }

    const handleSave = () => {
        status(changedUsers).then((response) => console.log(response))
    }

    useEffect(() => {
        getUsers().then(response => setUsers(response))
    }, [])

    return (
        <div className="reg block">
            <div className="eventinfo">
                <input
                    className="search"
                    type="text"
                    placeholder="Search for the volunteer"
                    style={{margin: "0px"}}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <table>
                    <tr>
                        <th>№</th>
                        <th style={{textAlign: "left"}}>Name of volunteer</th>
                        <th style={{textAlign: "left"}}>Status</th>
                    </tr>
                    {arraySF?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td style={{textAlign: "left"}}>{item.firstName + " " + item.secondName}</td>
                                <td style={{textAlign: "left"}}>
                                    <select
                                        value={item.type}
                                        onChange={(event) => {handleChangeStatus(item.email, event.target.value)}}
                                    >
                                        {statuses.map((type, index) => 
                                            <option
                                                key={index}
                                                value={type}
                                            >{type}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>
                        )
                    }
                </table>
                <a onClick={() => handleSave()} className="cert btn">SAVE</a>
            </div>
        </div>
    )
}

