export function formatPhone(phone: string) {
    if(!phone) { return; }

    const formatted =
        '('
        + phone.substring(2, 5)
        + ') '
        + phone.substring(5, 8)
        + '-'
        + phone.substring(8, 12);

    return formatted;
}