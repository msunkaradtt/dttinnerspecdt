import React, {useState} from "react"

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
    ListItem,
    Tooltip
} from "@material-tailwind/react"

const NavListMenu = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const renderItems = props.nav_data.map(
        (items) => (
            items.map(({title, tip}, key) => (
                <a href="#" key={key}>
                    <MenuItem className="flex items-center gap-3 rounded-lg">
                        <div>
                            <Tooltip content={tip} placement="right-end">
                                <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
                                    {title}
                                </Typography>
                            </Tooltip>
                        </div>
                    </MenuItem>
                </a>
            ))
        )
    )

    return(
    <>
    <Menu
    open={isMenuOpen}
    handler={setIsMenuOpen}
    offset={{ mainAxis: 20 }}
    placement="bottom"
    allowHover={true}
    >
        <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
                <ListItem
                className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
                selected={isMenuOpen}
                >
                    {props.nav_name}
                </ListItem>
            </Typography>
        </MenuHandler>
        <MenuList className="max-w-screen-xl rounded-xl lg:block">
            <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
                {renderItems}
            </ul>
        </MenuList>
    </Menu>
    </>
    )
}

export default NavListMenu