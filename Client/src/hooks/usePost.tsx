import { useState } from 'react';

interface UsePostProps {
    url: string;
    body: Record<string, any>;
}

interface UsePostReturn {
    loading: boolean;
    dataPost: any;
    error: string | null;
    status: number | null;
    postData: (body: any) => void;
}

export const usePost = ({ url }: UsePostProps): UsePostReturn => {
    const [loading, setLoading] = useState(false);
    const [dataPost, setDataPost] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<number | null>(null);

    const postData = (body: any) => {
        setLoading(true);
        setError(null);
        setStatus(null);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(async (response) => {
                setStatus(response.status); // Captura el estado HTTP
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Ocurrió un error inesperado');
                }
                setDataPost(data);
            })
            .catch((err) => {
                setError(err.message || 'Ocurrió un error al intentar comunicarte con el servidor.');
            })
            .finally(() => setLoading(false));
    };

    return { loading, dataPost, error, status, postData };
};