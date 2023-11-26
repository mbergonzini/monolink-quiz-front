interface ErrorMessagesProps {
  errorMessages: string[];
}

const ErrorMessages = (props: ErrorMessagesProps) => {
  const { errorMessages } = props;
  return (
      <ul>
        {errorMessages.map((message, index) => (
          <li key={index} style={{ color: 'red', fontSize: '12px'}}>
            {message}
          </li>
        ))}
      </ul>
  );
};

export default ErrorMessages;