import React from "react"
import {
    Navbar,
    Typography
} from "@material-tailwind/react"

import NavList from "./NavList"

import { logoCuidetect } from "../assets"

const Navigation = (props) => {

    return(
        <div className="w-scree">
            <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            >
                <img
                src={logoCuidetect} // Replace with the actual path to your logo file
                alt="Culdetect Logo"
                className="h-12" // Adjust height as needed
                />
            </Typography>
                <div className="lg:block">
                    <NavList nav_config={props.nav_config} />
                </div>
            </div>
        </div>
    )
}

export default Navigation