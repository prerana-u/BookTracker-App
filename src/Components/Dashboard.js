import React from "react";
import { useAuth } from "../Resources/Context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        {/* Add dashboard widgets or content here */}
        <section>
          <p>Welcome to your book tracker dashboard!</p>
        </section>
        <button onClick={logout} className="border border-red-500">
          Logout
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
