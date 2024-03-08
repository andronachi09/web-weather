export const getDate = () => {
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = dayNames[today.getDay()];
    const date = today.getDate().toString().padStart(2, '0');
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return `${day}, ${date} ${month}, ${year}`;
}