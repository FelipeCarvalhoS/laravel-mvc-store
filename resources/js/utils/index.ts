export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function limitText(text: string, limit = 150): string {
    if (text.length <= limit) {
        return text;
    }

    const truncatedText = text.slice(0, limit);
    const lastWordBoundary = truncatedText.lastIndexOf(" ");

    return `${truncatedText.slice(0, lastWordBoundary)}...`;
}
