import "./InfoCard.scss";

interface InfoCardProps {
  label?: string;
  value?: string | number | React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ label = "", value = "" }) => {
  return (
    <div className="info_card">
      <h3 className="label_text">{label}</h3>
      <div className="label_value">{value}</div>
    </div>
  );
};

export default InfoCard;
