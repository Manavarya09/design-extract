export default function Rule({ number, label }) {
  return (
    <div className="rule" role="separator" aria-label={label}>
      <div className="rule-line" />
      {(number || label) && (
        <div className="rule-label">
          {number && <span className="rule-number">§{number}</span>}
          {label}
        </div>
      )}
    </div>
  );
}
