import React, { useEffect } from 'react';
declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}
const AdBanner: React.FC = () => {

    useEffect(() => {
        // Trigger adsbygoogle script after component mounts

        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
    }, []);

    return (
        <div style={adStyle}>
            <ins className="adsbygoogle"
                style={{ display: 'inline-block', width: '360px', height: '90px' }}
                data-ad-client="ca-pub-3609041871317154"
                data-ad-slot="2774150450"></ins>
        </div>
    );
};

const adStyle: React.CSSProperties = {
    position: 'fixed', // Fixed at the top of the page
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)', // Center horizontally
    width: '360px',
    height: '90px',
    zIndex: 1000, // Ensure the ad stays above other elements
    backgroundColor: '#fff', // Add background for better visibility
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow for better visibility
};

export default AdBanner;
