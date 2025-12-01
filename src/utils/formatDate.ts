export function formatReadableDate(dateInput: string | Date): string {
  const date = new Date(dateInput);

  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = monthNames[date.getUTCMonth()];

  // Function to add ordinal suffix
  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return `${n}th`; 
    const lastDigit = n % 10;
    if (lastDigit === 1) return `${n}st`;
    if (lastDigit === 2) return `${n}nd`;
    if (lastDigit === 3) return `${n}rd`;
    return `${n}th`;
  };

  return `${getOrdinal(day)} ${month} ${year}`;
}
