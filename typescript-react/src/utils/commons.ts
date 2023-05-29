export const formatDate = (date: string, isAlternateFormat: boolean = false): string => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    if (isAlternateFormat) {
        return `${da}/${mo}/${ye}`;
    }
    return `${ye}/${mo}/${da}`;
};

export const formatPrice = (price: number): string => {
    return price.toLocaleString('de-De');
};
