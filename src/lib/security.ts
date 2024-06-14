export const hideEmail = (email: string): string => {
    // Split the email address into username and domain parts
    const [username, domain] = email.split('@');

    // Get the first 2 and last 2 characters of the username
    const firstPart = username.slice(0, 2);
    const lastPart = username.slice(-2);

    // Create the hidden part with asterisks
    const hiddenPart = '*'.repeat(username.length - 4);

    // Construct the hidden email address
    return `${firstPart}${hiddenPart}${lastPart}@${domain}`;
}
