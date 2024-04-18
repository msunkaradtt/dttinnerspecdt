import React from "react"

import {
    List
} from "@material-tailwind/react"

import NavListMenu from "./nav_components/NavListMenu"

const NavList = (props) => {

    return(
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            {props.nav_config.map((e, key) => {
                return(<NavListMenu nav_name={Object.keys(e).toString()} nav_data={Object.values(e)} key={key} />)
            })}
        </List>
    )
}

export default NavList