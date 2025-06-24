export function generateHrMinFromDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (minutes === 0) return `${hours}h`;
    if (hours === 0) return `${minutes}min`;
    return `${hours}h ${minutes}min`;
}
