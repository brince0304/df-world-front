import {useCallback, useEffect, useState} from "react";

type returnType = [boolean, () => void, () => void];

const useNavBar = (isModalOpened?:boolean):returnType => {
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const handleNavbarOpen = useCallback(() => {
        setIsNavBarOpen(true);
    }, []);
    const handleNavbarClose = useCallback(() => {
        setIsNavBarOpen(false);
    }, []);

    useEffect(() => {
        handleNavbarClose();
    }, [isModalOpened]);

    return [isNavBarOpen, handleNavbarOpen, handleNavbarClose];
}

export default useNavBar;