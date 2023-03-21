import {useCallback, useState} from "react";


type returnType = [boolean, () => void, () => void];

const useNavBar = ():returnType => {
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const handleNavbarOpen = useCallback(() => {
        setIsNavBarOpen(true);
    }, []);
    const handleNavbarClose = useCallback(() => {
        setIsNavBarOpen(false);
    }, []);

    return [isNavBarOpen, handleNavbarOpen, handleNavbarClose];
}

export default useNavBar;