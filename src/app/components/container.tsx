import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}
// Ensures that main views are centered and have a max width
const MainViewContainer: React.FC<ContainerProps> = ({children}) => {
    return(
        <div className="mx-16 px-8">
            {children}
        </div>
    )
}

export default MainViewContainer;