
export default function getCurrentRow(): string {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const mm = m < 30 ? 0 : 30;
    return `${h}:${mm.toString().padStart(2, '0')}`;
}