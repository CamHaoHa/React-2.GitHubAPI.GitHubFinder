import spinnerGif from './assets/spinner.gif';
function Spinner() {
  return (
    <div className="w-100">
      <img
        src={spinnerGif}
        alt="Loading..."
        className="rounded-full text-center mx-auto"
        width={580}
      />
    </div>
  );
}

export default Spinner;
