import React from "react"
import {
    Navbar,
    Typography
} from "@material-tailwind/react"

import NavList from "./NavList"

const Navigation = (props) => {

    return(
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                as="a"
                href="/"
                variant="h6"
                className="mr-4 cursor-pointer py-1.5 lg:ml-2">
                    Culdetect
                </Typography>
                <div className="lg:block">
                    <NavList nav_config={props.nav_config} />
                </div>
            </div>
        </Navbar>
    )
}

export default Navigation