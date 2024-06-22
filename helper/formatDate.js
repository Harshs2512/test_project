const formatDate = (dateString) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date(dateString);
    const year = date.getFullYear().toString(); // Get the last two digits of the year
    const month = months[date.getMonth()]; // Get the month name from the array
    const day = String(date.getDate()).padStart(2, '0');
    return `${month} ${day}, ${year}`;
};

export default formatDate;