//----------- Main Component ----------------//
const MainContent = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("db.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {data.map((item) => (
        <Topic key={item.id} id={item.id} topic={item.topic} />
      ))}
    </div>
  );
};

//----------- posting and maping data ----------------//

const Topic = ({ topic, id }) => {
  const [edit, setEdit] = React.useState(false);
  const [editTopic, setEditTopic] = React.useState(topic);
  function handleSubmit() {
    return fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    })
      .then((res) => res.json())
      .then((res) => {
        setEdit(false);
        // console.log(res.msg);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {/* when you will click on any div then you show the edit button */}
      {!edit ? (
        <div
          style={{ cursor: "pointer", marginTop: "10px" }}
          onClick={() => setEdit(!edit)}
        >
          {topic}
        </div>
      ) : (
        <div>
          <input
            value={editTopic}
            onChange={(e) => setEditTopic(e.target.value)}
          />
          {/* Edit button is not work because in handleSubmit function I use dummy api */}
          <button onClick={() => handleSubmit()}>Edit</button>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<MainContent />, document.getElementById("main-content"));
