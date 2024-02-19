import React from "react"
import { Typography } from "@material-tailwind/react";

const Footer = () => {
    return (
    <footer className="flex w-full items-center justify-center text-center">
        <Typography color="blue-gray" className="font-bold">
            &copy; 2024 Culdetect
        </Typography>
    </footer>
    );
}

export default Footer