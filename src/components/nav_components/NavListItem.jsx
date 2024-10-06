import React, {useState} from "react"
import Papa from "papaparse"
/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../../store"

const NavListItem = (props) => {
    const snap = useSnapshot(state)

    const pageRefocused = () => {
        ++state.closeCounter
        window.removeEventListener("focus", pageRefocused);
    }

    const itemOnClicked = (e) => {
        state.load = false

        window.addEventListener("focus", pageRefocused)
    }

    const itemOnChange = (e, props) => {
        if(props.type === "file" && props.accept === ".gltf") {
            let inFile = e.target.files[0]

            state.selectedInput = inFile.name

            const reader = new FileReader()

            reader.onload = (e) => {
                state.slectedInputContent = e.target.result
            }

            reader.readAsDataURL(inFile)
        }

        if(props.type === "file" && props.accept === ".csv") {
            let inFile = e.target.files[0]
            Papa.parse(inFile, {
                header: true,
                complete: (results) => {
                    const data = results.data
                    state.pecDataJSON = data
                    state.pecDataLoaded = true
                }
            })
        }
    }

    return(
    <>
    <label htmlFor={props.title.split(" ").join("").toLocaleLowerCase() + "_dtt"}
    style={{width:"100%", height:"100%", color: "#263238"}}
    className="flex items-center text-sm font-bold">{props.title}</label>

    <input type={props.type} accept={props.accept}
    id={props.title.split(" ").join("").toLocaleLowerCase() + "_dtt"}
    onClick={(e) => {itemOnClicked(e)}}
    onChange={(e) => {itemOnChange(e, props)}} />
    </>
    )
}

export default NavListItem