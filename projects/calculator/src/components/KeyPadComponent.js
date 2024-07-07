import "../index.css";

export default function KeyPadComponent({ setSelectedVal }) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <h1>its Keypad</h1>
      <div className="button">
        <button value="(" onClick={(e) => setSelectedVal(e.target.value)}>
          (
        </button>
        <button
          style={{ color: "white", background: "red" }}
          value="C"
          onClick={(e) => setSelectedVal(e.target.value)}
        >
          CE
        </button>
        <button value=")" onClick={(e) => setSelectedVal(e.target.value)}>
          )
        </button>
        <button value="C" onClick={(e) => setSelectedVal(e.target.value)}>
          C
        </button>
        <button value="/" onClick={(e) => setSelectedVal(e.target.value)}>
          /
        </button>

        <button value="*" onClick={(e) => setSelectedVal(e.target.value)}>
          *
        </button>

        <button value="-" onClick={(e) => setSelectedVal(e.target.value)}>
          -
        </button>

        <button value="+" onClick={(e) => setSelectedVal(e.target.value)}>
          +
        </button>
        {numbers.map((num) => (
          <button value={num} onClick={(e) => setSelectedVal(e.target.value)}>
            {num}
          </button>
        ))}

        <button value="." onClick={(e) => setSelectedVal(e.target.value)}>
          .
        </button>
        <button value="=" onClick={(e) => setSelectedVal(e.target.value)}>
          =
        </button>
      </div>
    </div>
  );
}
