import React, { useEffect, useState } from 'react';

function Dashboard() {
const tabs = ["Xodimlar", "Bo‘limlar", "Topshiriqlar", "Hisobotlar", "Hujjatlar"];
  const [activeTab, setActiveTab] = useState("Xodimlar");

  // Xodimlar
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || []
  );
  const [empForm, setEmpForm] = useState({ name: "", position: "", department: "", contact: "" });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = () => {
    if (empForm.name) {
      setEmployees([...employees, empForm]);
      setEmpForm({ name: "", position: "", department: "", contact: "" });
    }
  };

  // Bo‘limlar
  const [departments, setDepartments] = useState(
    JSON.parse(localStorage.getItem("departments")) || []
  );
  const [depForm, setDepForm] = useState({ name: "", head: "", status: "" });

  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  const addDepartment = () => {
    if (depForm.name) {
      setDepartments([...departments, depForm]);
      setDepForm({ name: "", head: "", status: "" });
    }
  };

  // Topshiriqlar
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [taskForm, setTaskForm] = useState({ title: "", assignedTo: "", deadline: "", status: "" });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskForm.title) {
      setTasks([...tasks, taskForm]);
      setTaskForm({ title: "", assignedTo: "", deadline: "", status: "" });
    }
  };

  // Hujjatlar
  const [docs, setDocs] = useState(JSON.parse(localStorage.getItem("docs")) || []);
  const [docForm, setDocForm] = useState({ name: "", description: "" });

  useEffect(() => {
    localStorage.setItem("docs", JSON.stringify(docs));
  }, [docs]);

  const addDoc = () => {
    if (docForm.name) {
      setDocs([...docs, docForm]);
      setDocForm({ name: "", description: "" });
    }
  };


  return (
     <div className="container">
      <h1>Tashkilotni Avtomatlashtirish Tizimi</h1>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Xodimlar" && (
          <>
            <h2>Yangi xodim qo‘shish</h2>
            <input placeholder="Ism" value={empForm.name} onChange={(e) => setEmpForm({ ...empForm, name: e.target.value })} />
            <input placeholder="Lavozim" value={empForm.position} onChange={(e) => setEmpForm({ ...empForm, position: e.target.value })} />
            <input placeholder="Bo‘lim" value={empForm.department} onChange={(e) => setEmpForm({ ...empForm, department: e.target.value })} />
            <input placeholder="Aloqa" value={empForm.contact} onChange={(e) => setEmpForm({ ...empForm, contact: e.target.value })} />
            <button onClick={addEmployee}>Qo‘shish</button>

            <ul>
              {employees.map((e, i) => (
                <li key={i}>{e.name} - {e.position} ({e.department}) [{e.contact}]</li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "Bo‘limlar" && (
          <>
            <h2>Bo‘lim qo‘shish</h2>
            <input placeholder="Bo‘lim nomi" value={depForm.name} onChange={(e) => setDepForm({ ...depForm, name: e.target.value })} />
            <input placeholder="Mas’ul shaxs" value={depForm.head} onChange={(e) => setDepForm({ ...depForm, head: e.target.value })} />
            <input placeholder="Holati" value={depForm.status} onChange={(e) => setDepForm({ ...depForm, status: e.target.value })} />
            <button onClick={addDepartment}>Qo‘shish</button>

            <ul>
              {departments.map((d, i) => (
                <li key={i}>{d.name} - {d.head} [{d.status}]</li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "Topshiriqlar" && (
          <>
            <h2>Topshiriq qo‘shish</h2>
            <input placeholder="Topshiriq" value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} />
            <input placeholder="Javobgar" value={taskForm.assignedTo} onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })} />
            <input type="date" value={taskForm.deadline} onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })} />
            <input placeholder="Holat" value={taskForm.status} onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })} />
            <button onClick={addTask}>Qo‘shish</button>

            <ul>
              {tasks.map((t, i) => (
                <li key={i}>{t.title} - {t.assignedTo}, {t.deadline} [{t.status}]</li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "Hisobotlar" && (
          <>
            <h2>Statistik Ma’lumotlar</h2>
            <p>👨‍💼 Xodimlar soni: {employees.length}</p>
            <p>🏢 Bo‘limlar soni: {departments.length}</p>
            <p>📋 Topshiriqlar soni: {tasks.length}</p>
            <p>📁 Hujjatlar soni: {docs.length}</p>
          </>
        )}

        {activeTab === "Hujjatlar" && (
          <>
            <h2>Hujjat qo‘shish</h2>
            <input placeholder="Nomi" value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} />
            <input placeholder="Tavsifi" value={docForm.description} onChange={(e) => setDocForm({ ...docForm, description: e.target.value })} />
            <button onClick={addDoc}>Qo‘shish</button>

            <ul>
              {docs.map((d, i) => (
                <li key={i}>{d.name} - {d.description}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
