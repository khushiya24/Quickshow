const timeFormat = (minute) => {
    const hours = Math.floor(minute / 60);
    const minutesRemaining = minute % 60;
    return `${hours}h ${minutesRemaining}m`;
}

export default timeFormat;