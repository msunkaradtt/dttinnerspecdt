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

/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../../store"

const NavListMenu = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const snap = useSnapshot(state)

    const renderItems = props.nav_data.map(
        (items) => (
            items.map(({title, tip, as, type, accept}, key) => (
                <div key={key}>
                    <Tooltip content={tip} placement="right-end">
                        <MenuItem className="flex items-center gap-3 rounded-lg">
                            <>
                            {as === "input" ?
                            (<>
                            <label htmlFor={title.split(" ").join("").toLocaleLowerCase() + "_dtt"} style={{width:"100%", height:"100%", color: "#263238"}} className="flex items-center text-sm font-bold">{title}</label>
                            <input type={type} id={title.split(" ").join("").toLocaleLowerCase() + "_dtt"} accept={accept} onClick={() => {
                                state.load = false
                            }}
                                onChange={(e) => {
                                if(type === "file"){
                                    let inFile = e.target.files[0]

                                    state.selectedInput = inFile.name

                                    const reader = new FileReader()
                                    reader.onload = (e) => {
                                        state.slectedInputContent = e.target.result
                                    }

                                    reader.readAsDataURL(inFile)
                                }
                            }} />
                            </>) :
                            (<Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">{title}</Typography>)}
                            </>
                        </MenuItem>
                    </Tooltip>
                </div>
            ))
        )
    )

    return(
    <>
    <Menu
    open={isMenuOpen}
    handler={setIsMenuOpen}
    dismiss={{itemPress: false}}
    offset={{ mainAxis: 20 }}
    placement="bottom"
    allowHover={true}
    >
        <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
                <ListItem
                className="flex items-center gap-2 py-2 pr-4 font-medium font-bold text-blue-gray-600"
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