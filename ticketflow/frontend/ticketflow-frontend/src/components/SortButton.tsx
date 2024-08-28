import "../css/sort-button.css"

interface SortButtonProps {
  tooltipText: string;
  onClick: () => void;
  buttonLabel: string;
  spanClassName: string;
}

const SortButton: React.FC<SortButtonProps> = ({
  tooltipText,
  onClick,
  buttonLabel,
  spanClassName
}) => {
  return (
    <div className="button-sort-div">
      <span className={spanClassName}>{tooltipText}</span>
      <button className="sort-button" onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default SortButton