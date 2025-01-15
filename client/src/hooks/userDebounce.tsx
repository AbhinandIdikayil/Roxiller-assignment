import { useEffect, useState } from "react";

export function useDebounce(query: string, delay: number = 500) {
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [query, delay]);

    return debouncedQuery;
}

