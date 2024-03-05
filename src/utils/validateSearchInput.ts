import DOMPurify from 'dompurify';

export function validateAndSanitizeSearchInput(input: string): { isValid: boolean, message: string } {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
        return {
            isValid: false,
            message: 'Please enter a city name.'
        };
    }

    if (trimmedInput.length < 3 || trimmedInput.length > 60) {
        return {
            isValid: false,
            message: 'City name must be between 3 and 50 characters'
        }
    }

    const sanitizedInput = DOMPurify.sanitize(trimmedInput);

    return {
        isValid: true,
        message: sanitizedInput
    };
}