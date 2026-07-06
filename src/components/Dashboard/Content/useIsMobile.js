
import { useState, useEffect } from "react";

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile ] = useState(
        typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
    )
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= breakpoint)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [breakpoint])
    return isMobile
}

export default useIsMobile;

// The useState is checking whether we are in the mobile resolution
// so if the window is defined then we check if the window's inner width is less or equal to the breakpoint and stores True
// else it will store it false (we are not in mobile --> desktop)

// useEffect is used in the case we resize the window like changing landscape to protrait on smartphones
// we have a function onResize where we have setIsMobile and then have it True or False
// We make the browser check resizes and if the parameters allow it, we may or may not set the website to mobile