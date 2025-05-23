"use client"
import { useEffect, useState } from 'react';

export const useFetch = (api: string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.products);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [api]);

    return { data, loading };
};
