'use client';

import { useEffect } from 'react';

const BootstrapClient = () => {
    useEffect(() => {
        // Specify the proper type for the import
        const loadBootstrap = (): Promise<any> => {
            return import('bootstrap/dist/js/bootstrap.bundle.js' as string);
        };
        
        if (typeof document !== 'undefined') {
            loadBootstrap();
        }
    }, []);

    return null;
};

export default BootstrapClient;
