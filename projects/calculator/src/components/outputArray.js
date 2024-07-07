export default function OutputArray({ operationData }) {
  return (
    <div>
      <h1>Output:</h1>
      <ul>
        {operationData.map((operation, index) => (
          <li key={index}>{operation}</li>
        ))}
      </ul>
    </div>
  );
}
