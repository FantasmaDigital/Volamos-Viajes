import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HiOutlineLocationMarker, HiStar } from "react-icons/hi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiShirtFoldedBold } from "react-icons/pi";
import { RiGalleryLine } from "react-icons/ri";

export const ARROW_LEFT = () =>{
    return <FaArrowLeft />
}

export const ARROW_RIGHT = () =>{
    return <FaArrowRight />
}

export const INFO = () =>{
    return <IoMdInformationCircleOutline />
}

export const LOCATION = () =>{
    return <HiOutlineLocationMarker />
}

export const GALLERY = () =>{
    return <RiGalleryLine />
}

export const STAR = () =>{
    return <HiStar />
}

export const SHIRT = () =>{
    return <PiShirtFoldedBold />
}