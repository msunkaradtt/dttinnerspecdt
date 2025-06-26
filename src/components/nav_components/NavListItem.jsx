import React from "react"
import Papa from "papaparse"

import { useToastify } from "../../providers"
/*
Store
*/
import { useSnapshot } from 'valtio'
import state from "../../store"

const NavListItem = (props) => {
    const snap = useSnapshot(state)

    const notifier = useToastify()

    const pageRefocused = () => {
        ++state.closeCounter
        window.removeEventListener("focus", pageRefocused);
    }

    const itemOnClicked = (e) => {
        state.load = false

        window.addEventListener("focus", pageRefocused)
    }

    const itemOnChange = async (e, props) => {
        e.preventDefault()

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
            const inFile = e.target.files[0]
            const fileName = inFile.name.split('.').slice(0, -1).join('.')
            if (fileName === "PEC") {
                Papa.parse(inFile, {
                    header: true,
                    complete: (results) => {
                        const data = results.data
                        state.pecDataJSON = data
                        state.pecDataLoaded = true
                    }
                })
            } else if (fileName === "LRUT") {
                Papa.parse(inFile, {
                    header: true,
                    complete: (results) => {
                        const data = results.data
                        state.lrutDataJSON = data
                        state.lrutDataLoaded = true
                    }
                })
            }
        }

        if(props.type === "file" && props.accept === ".step") {
            const inFile = e.target.files[0]
            const fileSize = Math.round((inFile.size / 1024))

            if(fileSize >= 21096) {
                notifier.notifyError("Max supported file size is 20mb. Please select a smaller file.")
                return
            }

            const formData = new FormData()
            formData.append("input_step_file", inFile)

            try {
                const endpoint = snap.isLocal ? "http://localhost:8000/convert/step2gltf" : "http://18.153.140.53:8000/convert/step2gltf"

                await fetch(endpoint, {
                    method: "POST",
                    body: formData
                }).then(res => res.json()).then(data => {
                    if(!data) {
                        notifier.notifyError("Error in conversion. Check on server side for more details.")
                        return
                    }
                    state.conversion_srv_res = data
                    state.isChecking = true
                })

            } catch (error) {
                notifier.notifyError(`Conversion server failed with following error: ${error}`)
                return
            }
        }
    }

    return(
    <>
    <label htmlFor={props.title.split(" ").join("").toLocaleLowerCase() + "_dtt"}
    style={{width:"100%", height:"100%", color: "#263238"}}
    className="flex w-full items-center text-sm font-bold cursor-pointer">{props.title}</label>

    <input className="navinput" type={props.type} accept={props.accept}
    id={props.title.split(" ").join("").toLocaleLowerCase() + "_dtt"}
    onClick={(e) => {itemOnClicked(e)}}
    onChange={(e) => {itemOnChange(e, props)}} />
    </>
    )
}

export default NavListItem