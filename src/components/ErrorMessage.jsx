function ErrorMessage({ message }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
      {message}
    </div>
  );
}

export default ErrorMessage;