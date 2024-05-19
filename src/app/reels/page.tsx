import React from 'react';

const Reels = () => {
    return (
        <div className="relative overflow-y-scroll snap-y snap-mandatory h-screen">
            <div className="w-full h-full bg-orange-700 relative snap-y snap-mandatory">
                <div className="w-full h-screen snap-start">
                    <video className="w-full h-full object-cover" src="/videos/reel1.mp4" autoPlay loop muted></video>
                </div>
                <div className="w-full h-screen snap-start">
                    <video className="w-full h-full object-cover" src="/videos/reel2.mp4" autoPlay loop muted></video>
                </div>
                <div className="w-full h-screen snap-start">
                    <video className="w-full h-full object-cover" src="/videos/reel3.mp4" autoPlay loop muted></video>
                </div>
                <div className="w-full h-screen snap-start">
                    <video className="w-full h-full object-cover" src="/videos/reel1.mp4" autoPlay loop muted></video>
                </div>
                <div className="w-full h-screen snap-start">
                    <video className="w-full h-full object-cover" src="/videos/reel2.mp4" autoPlay loop muted></video>
                </div>
                <div className="w-full h-screen snap-start">
                    <video className="w-full h-full object-cover" src="/videos/reel3.mp4" autoPlay loop muted></video>
                </div>
            </div>
        </div>
    );
};

export default Reels;
