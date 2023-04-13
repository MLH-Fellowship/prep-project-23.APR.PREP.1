import Hour from './Hour';

const DayModal = ({ data }) => {
  return (
    <div>
      {data.map((hourInfo, idx) => (
        <Hour key={idx} hour={hourInfo} />
      ))}
    </div>
  );
};

export default DayModal;
