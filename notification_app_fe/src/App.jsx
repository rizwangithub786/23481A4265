import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkZXZhc2F0aHdpazEzNjhAZ21haWwuY29tIiwiZXhwIjoxNzc4MzA4MzMwLCJpYXQiOjE3NzgzMDc0MzAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzMGQzOTY2ZC1mOWU0LTRhYTItYTczNi0yMGNiNmU4MmZlYjUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJkZXZhIHNhdGh3aWsgcGFsbGVtIiwic3ViIjoiYzA2NTJmNDktZTlkNC00MzllLWJmOWItOTU2YmVmYzk3Nzg1In0sImVtYWlsIjoiZGV2YXNhdGh3aWsxMzY4QGdtYWlsLmNvbSIsIm5hbWUiOiJkZXZhIHNhdGh3aWsgcGFsbGVtIiwicm9sbE5vIjoiMjM0ODFhMDVoOSIsImFjY2Vzc0NvZGUiOiJlSmRDdUMiLCJjbGllbnRJRCI6ImMwNjUyZjQ5LWU5ZDQtNDM5ZS1iZjliLTk1NmJlZmM5Nzc4NSIsImNsaWVudFNlY3JldCI6InVBQXdZaEtxQ1NzckZOVHAifQ.VvqFYtG2N2BfweUCIKqaPxSBlNbEcl5i3S6xY_iHFEw";

  const fetchNotifications = async (type = "") => {
    try {
      setLoading(true);

      let url =
        "http://4.224.186.213/evaluation-service/notifications";

      if (type) {
        url += `?type=${type}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log(data);

      setNotifications(data.notifications || data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="container">
      <h1>Campus Notifications</h1>

      <div className="buttons">
        <button onClick={() => fetchNotifications("")}>
          All
        </button>

        <button onClick={() => fetchNotifications("Alert")}>
          Alert
        </button>

        <button onClick={() => fetchNotifications("Event")}>
          Event
        </button>

        <button onClick={() => fetchNotifications("Placement")}>
          Placement
        </button>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="notification-list">
          {notifications.map((item, index) => (
            <div className="card" key={index}>
              <h3>{item.type || item.Type}</h3>

              <p>{item.message || item.Message}</p>

              <small>
                {item.timestamp || item.Timestamp}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;