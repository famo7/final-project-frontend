import { format } from "date-fns";

// function to format time
const formatTime = (time) => {
  return format(new Date(time), "MM/dd/yyyy HH:mm");
};

export default { formatTime };
