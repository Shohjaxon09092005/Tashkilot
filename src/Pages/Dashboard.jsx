import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { uz } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";

function Dashboard() {
  const tabs = ["Xodimlar", "Bo‘limlar", "Topshiriqlar", "Hisobotlar", "Hujjatlar"];
  const [activeTab, setActiveTab] = useState("Xodimlar");

  // Xodimlar
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || []
  );
  const [empForm, setEmpForm] = useState({ name: "", position: "", department: "", contact: "" });
  const [editingEmpIndex, setEditingEmpIndex] = useState(null);

  // Bo‘limlar
  const [departments, setDepartments] = useState(
    JSON.parse(localStorage.getItem("departments")) || []
  );
  const [depForm, setDepForm] = useState({ name: "", head: "", status: "" });
  const [editingDepIndex, setEditingDepIndex] = useState(null);

  // Topshiriqlar
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [taskForm, setTaskForm] = useState({ title: "", assignedTo: "", deadline: "", status: "" });
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  // Hujjatlar
  const [docs, setDocs] = useState(JSON.parse(localStorage.getItem("docs")) || []);
  const [docForm, setDocForm] = useState({ name: "", description: "" });
  const [editingDocIndex, setEditingDocIndex] = useState(null);

  // Umumiy effektlar
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("departments", JSON.stringify(departments));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("docs", JSON.stringify(docs));
  }, [employees, departments, tasks, docs]);

  // Xodimlar funksiyalari
  const handleEmployee = () => {
    if (!empForm.name) return;
    
    const newEmployees = [...employees];
    if (editingEmpIndex !== null) {
      newEmployees[editingEmpIndex] = empForm;
      setEditingEmpIndex(null);
    } else {
      newEmployees.push(empForm);
    }
    setEmployees(newEmployees);
    setEmpForm({ name: "", position: "", department: "", contact: "" });
  };

  const deleteEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  // Bo‘limlar funksiyalari
  const handleDepartment = () => {
    if (!depForm.name) return;
    
    const newDepartments = [...departments];
    if (editingDepIndex !== null) {
      newDepartments[editingDepIndex] = depForm;
      setEditingDepIndex(null);
    } else {
      newDepartments.push(depForm);
    }
    setDepartments(newDepartments);
    setDepForm({ name: "", head: "", status: "" });
  };

  const deleteDepartment = (index) => {
    setDepartments(departments.filter((_, i) => i !== index));
  };

  // Topshiriqlar funksiyalari
  const handleTask = () => {
    if (!taskForm.title) return;
    
    const newTasks = [...tasks];
    if (editingTaskIndex !== null) {
      newTasks[editingTaskIndex] = taskForm;
      setEditingTaskIndex(null);
    } else {
      newTasks.push({...taskForm, deadline: taskForm.deadline?.toISOString()});
    }
    setTasks(newTasks);
    setTaskForm({ title: "", assignedTo: "", deadline: "", status: "" });
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Hujjatlar funksiyalari
  const handleDocument = () => {
    if (!docForm.name) return;
    
    const newDocs = [...docs];
    if (editingDocIndex !== null) {
      newDocs[editingDocIndex] = docForm;
      setEditingDocIndex(null);
    } else {
      newDocs.push(docForm);
    }
    setDocs(newDocs);
    setDocForm({ name: "", description: "" });
  };

  const deleteDocument = (index) => {
    setDocs(docs.filter((_, i) => i !== index));
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
            <div className="form">
              <input placeholder="Ism" value={empForm.name} onChange={(e) => setEmpForm({ ...empForm, name: e.target.value })} />
              <input placeholder="Lavozim" value={empForm.position} onChange={(e) => setEmpForm({ ...empForm, position: e.target.value })} />
              <input placeholder="Bo‘lim" value={empForm.department} onChange={(e) => setEmpForm({ ...empForm, department: e.target.value })} />
              <input placeholder="Aloqa" value={empForm.contact} onChange={(e) => setEmpForm({ ...empForm, contact: e.target.value })} />
              <button className="save-btn" onClick={handleEmployee}>
                {editingEmpIndex !== null ? "Saqlash" : "Qo‘shish"}
              </button>
            </div>

            <ul className="list">
              {employees.map((e, i) => (
                <li key={i}>
                  <div className="list-item">
                    <span>{e.name} - {e.position} ({e.department}) [{e.contact}]</span>
                    <div>
                      <button className="edit-btn" onClick={() => {
                        setEmpForm(e);
                        setEditingEmpIndex(i);
                      }}>Tahrirlash</button>
                      <button className="delete-btn" onClick={() => deleteEmployee(i)}>O‘chirish</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "Bo‘limlar" && (
          <>
            <h2>Bo‘lim qo‘shish</h2>
            <div className="form">
              <input placeholder="Bo‘lim nomi" value={depForm.name} onChange={(e) => setDepForm({ ...depForm, name: e.target.value })} />
              <input placeholder="Mas’ul shaxs" value={depForm.head} onChange={(e) => setDepForm({ ...depForm, head: e.target.value })} />
              <input placeholder="Holati" value={depForm.status} onChange={(e) => setDepForm({ ...depForm, status: e.target.value })} />
              <button className="save-btn" onClick={handleDepartment}>
                {editingDepIndex !== null ? "Saqlash" : "Qo‘shish"}
              </button>
            </div>

            <ul className="list">
              {departments.map((d, i) => (
                <li key={i}>
                  <div className="list-item">
                    <span>{d.name} - {d.head} [{d.status}]</span>
                    <div>
                      <button className="edit-btn" onClick={() => {
                        setDepForm(d);
                        setEditingDepIndex(i);
                      }}>Tahrirlash</button>
                      <button className="delete-btn" onClick={() => deleteDepartment(i)}>O‘chirish</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "Topshiriqlar" && (
          <>
            <h2>Topshiriq qo‘shish</h2>
            <div className="form">
              <input placeholder="Topshiriq" value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} />
              <input placeholder="Javobgar" value={taskForm.assignedTo} onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })} />
              <input placeholder="Holat" value={taskForm.status} onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })} />
              <DatePicker
                selected={taskForm.deadline ? new Date(taskForm.deadline) : null}
                onChange={(date) => setTaskForm({ ...taskForm, deadline: date })}
                locale={uz}
                dateFormat="dd MMMM yyyy"
                placeholderText="Muddat"
                className="date-picker"
              />
              <button className="save-btn" onClick={handleTask}>
                {editingTaskIndex !== null ? "Saqlash" : "Qo‘shish"}
              </button>
            </div>

            <ul className="list">
              {tasks.map((t, i) => (
                <li key={i}>
                  <div className="list-item">
                    <span>
                      {t.title} - {t.assignedTo}, {
                        t.deadline
                          ? new Date(t.deadline).toLocaleDateString("uz-UZ", { day: '2-digit', month: 'long', year: 'numeric' })
                          : ""
                      } [{t.status}]
                    </span>
                    <div>
                      <button className="edit-btn" onClick={() => {
                        setTaskForm({
                          ...t,
                          deadline: t.deadline ? new Date(t.deadline) : null
                        });
                        setEditingTaskIndex(i);
                      }}>Tahrirlash</button>
                      <button className="delete-btn" onClick={() => deleteTask(i)}>O‘chirish</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "Hisobotlar" && (
          <>
            <h2>Statistik Ma’lumotlar</h2>
            <div className="stats">
              <div className="stat-item">
                <span>👨‍💼 Xodimlar soni:</span>
                <span>{employees.length}</span>
              </div>
              <div className="stat-item">
                <span>🏢 Bo‘limlar soni:</span>
                <span>{departments.length}</span>
              </div>
              <div className="stat-item">
                <span>📋 Topshiriqlar soni:</span>
                <span>{tasks.length}</span>
              </div>
              <div className="stat-item">
                <span>📁 Hujjatlar soni:</span>
                <span>{docs.length}</span>
              </div>
            </div>
          </>
        )}

        {activeTab === "Hujjatlar" && (
          <>
            <h2>Hujjat qo‘shish</h2>
            <div className="form">
              <input placeholder="Nomi" value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} />
              <input placeholder="Tavsifi" value={docForm.description} onChange={(e) => setDocForm({ ...docForm, description: e.target.value })} />
              <button className="save-btn" onClick={handleDocument}>
                {editingDocIndex !== null ? "Saqlash" : "Qo‘shish"}
              </button>
            </div>

            <ul className="list">
              {docs.map((d, i) => (
                <li key={i}>
                  <div className="list-item">
                    <span>{d.name} - {d.description}</span>
                    <div>
                      <button className="edit-btn" onClick={() => {
                        setDocForm(d);
                        setEditingDocIndex(i);
                      }}>Tahrirlash</button>
                      <button className="delete-btn" onClick={() => deleteDocument(i)}>O‘chirish</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;