import "./RacketsForm.css";

interface DataListProps {
  text: string;
}

export const DataList = ({ text }: DataListProps): React.ReactElement => {
  return (
    <datalist className="detail-list" id={`datalist ${text}`}>
      <option value="1" label="1" />
      <option value="2" label="2" />
      <option value="3" label="3" />
      <option value="4" label="4" />
      <option value="5" label="5" />
      <option value="6" label="6" />
      <option value="7" label="7" />
      <option value="8" label="8" />
      <option value="9" label="9" />
      <option value="10" label="10" />
    </datalist>
  );
};
