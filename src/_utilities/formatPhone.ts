export function formatPhone(phoneNumber: string | undefined) {
    if(!phoneNumber) {
        return '';
    } else if (/^\+\d{11}$/.test(phoneNumber)) {
        const formattedPhoneNumber = `(${phoneNumber.substr(2, 3)}) ${phoneNumber.substr(5, 3)}-${phoneNumber.substr(8)}`;
        return formattedPhoneNumber;
    } else {
        return ''; // Return empty string for unexpected formats
    }
}