export const renderSentence = (sentence: string) => {
    // Regex para capturar texto entre paréntesis y entre comillas
    const parts = sentence.split(/(\(.*?\)|".*?")/g);

    return parts.map((part, index) => {
        if (part.startsWith("(") && part.endsWith(")")) {
            // Texto entre paréntesis
            return (
                <span key={index} className="font-semibold">
                    {part}
                </span>
            );
        } else if (part.startsWith('"') && part.endsWith('"')) {
            // Texto entre comillas
            return (
                <span key={index} className="italic">
                    {part}
                </span>
            );
        } else if (part.includes(":") && !part.startsWith("(") && !part.startsWith('"')) {
            // Texto antes de los dos puntos
            const [beforeColon, afterColon] = part.split(/:(.+)/); // Divide en parte anterior y posterior a `:`
            return (
                <span key={index}>
                    <span className="font-semibold">{beforeColon}:</span>
                    {afterColon}
                </span>
            );
        } else {
            // Texto normal
            return part;
        }
    });
};
