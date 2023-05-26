import React, { useState, useEffect } from 'react';
import ContentLoader from "react-content-loader"

// make a circle loader

const Loader = () => {
    return (
        <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#4b8e8d"
        >
        <circle cx="150" cy="86" r="8" />
        <circle cx="194" cy="86" r="8" />
        <circle cx="238" cy="86" r="8" />
        </ContentLoader>
    )
    }

export default Loader;