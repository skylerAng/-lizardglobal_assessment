const DateConverter = (props) => {
    const dateStr = props.date;
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toLocaleString(); // Change the format as per your requirement
    return <div>{formattedDate}</div>;
  };
  
  export default DateConverter;