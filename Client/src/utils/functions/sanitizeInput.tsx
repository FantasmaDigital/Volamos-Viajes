import DOMPurify from "dompurify";

export const sanitizeInput = (input: string) => {
    if (!input || typeof input !== 'string') return '';
    const config = {ALLOWED_TAGS: [],ALLOWED_ATTR: []};
    const sanitizedInput = DOMPurify.sanitize(input, config);
    return sanitizedInput;
};
