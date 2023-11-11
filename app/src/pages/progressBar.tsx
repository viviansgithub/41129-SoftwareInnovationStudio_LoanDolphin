import React, { useEffect, useState } from 'react';
import "./progressBar.css";

export const ProgressBar = (props: any) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 100);
    }, []);

    const { value } = props;
    return (
        <>
        <div className="container">
            <div className="progress-bar">
                <div className={`progress-bar-fill ${isLoaded ? 'loaded' : ''}`}></div>
            </div>
            <div className="progress-label">{value}</div>
        </div>
        
        </>
    );
}