// // import React, { useEffect, useState } from "react";
// // import Sidebar from "./Sidebar";

// // export default function UserManager() {
// //   const [users, setUsers] = useState([]);
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     password: "",          // ← add
// //     age: "",
// //     nationality: "",
// //     travelStyle: "",
// //     preferences: "",
// //   });
// //   const [editId, setEditId] = useState(null);

// //   const fetchUsers = async () => {
// //     try {
// //       const res = await fetch("http://localhost:8000/users/"); // add trailing slash to avoid 307s
// //       const data = await res.json();
// //       setUsers(Array.isArray(data) ? data : []);
// //     } catch (e) {
// //       console.error("GET /users failed", e);
// //       setUsers([]);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const url = editId
// //       ? `http://localhost:8000/users/${editId}`
// //       : "http://localhost:8000/users";
// //     const method = editId ? "PUT" : "POST";

// //     const payload = {
// //       name: form.name,
// //       email: form.email,
// //       age: form.age ? parseInt(form.age) : undefined,
// //       nationality: form.nationality || undefined,
// //       travelStyle: form.travelStyle || undefined,
// //       preferences: form.preferences
// //         ? form.preferences.split(",").map((p) => p.trim())
// //         : [],
// //     };

// //     // IMPORTANT: send password when creating (required by backend)
// //     if (!editId) {
// //       payload.password = form.password;
// //     } else {
// //       // with your current backend model (UserCreate), password is also required on update.
// //       // If you don't want that, change backend to use a UserUpdate model instead.
// //       if (form.password) payload.password = form.password;
// //     }

// //     const res = await fetch(url, {
// //       method,
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     });

// //     if (!res.ok) {
// //       const msg = await res.text().catch(() => "");
// //       console.error(`${method} ${url} failed:`, res.status, msg);
// //       alert(`Request failed: ${res.status}\n${msg}`);
// //       return;
// //     }

// //     setForm({
// //       name: "",
// //       email: "",
// //       password: "", // reset
// //       age: "",
// //       nationality: "",
// //       travelStyle: "",
// //       preferences: "",
// //     });
// //     setEditId(null);
// //     fetchUsers();
// //   };

// //   const handleEdit = (user) => {
// //     setForm({
// //       name: user.name,
// //       email: user.email,
// //       password: "", // don’t prefill passwords
// //       age: user.age || "",
// //       nationality: user.nationality || "",
// //       travelStyle: user.travelStyle || "",
// //       preferences: user.preferences ? user.preferences.join(", ") : "",
// //     });
// //     setEditId(user.id);
// //   };

// //   const handleDelete = async (id) => {
// //     const res = await fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
// //     if (!res.ok) {
// //       const msg = await res.text().catch(() => "");
// //       console.error(`DELETE /users/${id} failed:`, res.status, msg);
// //       alert(`Delete failed: ${res.status}\n${msg}`);
// //       return;
// //     }
// //     fetchUsers();
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   return (
// //     <div className="flex">
// //       <Sidebar />
// //       <main className="flex-1 p-8 bg-[#f5f5f5]">
// //         <h1 className="text-2xl font-bold text-[#4c6444] mb-4">User Manager</h1>

// //         <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-2xl mb-8">
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Name"
// //             value={form.name}
// //             onChange={(e) => setForm({ ...form, name: e.target.value })}
// //             required
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Email"
// //             value={form.email}
// //             onChange={(e) => setForm({ ...form, email: e.target.value })}
// //             required
// //           />

// //           {/* Password required on create, optional on edit (with your current backend it's actually required on edit too) */}
// //           {!editId ? (
// //             <input
// //               className="w-full border p-2 rounded"
// //               placeholder="Password (required)"
// //               type="password"
// //               value={form.password}
// //               onChange={(e) => setForm({ ...form, password: e.target.value })}
// //               required
// //             />
// //           ) : (
// //             <input
// //               className="w-full border p-2 rounded"
// //               placeholder="Change Password (optional)"
// //               type="password"
// //               value={form.password}
// //               onChange={(e) => setForm({ ...form, password: e.target.value })}
// //             />
// //           )}

// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Age"
// //             type="number"
// //             value={form.age}
// //             onChange={(e) => setForm({ ...form, age: e.target.value })}
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Nationality"
// //             value={form.nationality}
// //             onChange={(e) => setForm({ ...form, nationality: e.target.value })}
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Travel Style"
// //             value={form.travelStyle}
// //             onChange={(e) => setForm({ ...form, travelStyle: e.target.value })}
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Preferences (comma-separated)"
// //             value={form.preferences}
// //             onChange={(e) => setForm({ ...form, preferences: e.target.value })}
// //           />

// //           <button className="bg-[#4c6444] text-white px-4 py-2 rounded">
// //             {editId ? "Update" : "Add"} User
// //           </button>
// //         </form>

// //         <div className="space-y-4">
// //           {users.map((user) => (
// //             <div key={user.id} className="bg-[#CABA9C] p-4 rounded shadow flex justify-between items-start">
// //               <div>
// //                 <h3 className="font-semibold text-lg">{user.name}</h3>
// //                 <p>Email: {user.email}</p>
// //                 {user.age && <p>Age: {user.age}</p>}
// //                 {user.nationality && <p>Nationality: {user.nationality}</p>}
// //                 {user.travelStyle && <p>Style: {user.travelStyle}</p>}
// //                 {user.preferences?.length > 0 && <p>Preferences: {user.preferences.join(", ")}</p>}
// //               </div>
// //               <div className="space-x-2">
// //                 <button onClick={() => handleEdit(user)} className="text-blue-700 underline">Edit</button>
// //                 <button onClick={() => handleDelete(user.id)} className="text-red-700 underline">Delete</button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// // import React, { useEffect, useState } from "react";
// // import Sidebar from "./Sidebar";

// // export default function UserManager() {
// //   const [users, setUsers] = useState([]);
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     age: "",
// //     nationality: "",
// //     travelStyle: "",
// //     preferences: "",
// //   });
// //   const [editId, setEditId] = useState(null);

// //   const fetchUsers = async () => {
// //     const res = await fetch("http://localhost:8000/users");
// //     const data = await res.json();
// //     setUsers(data);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const url = editId
// //       ? `http://localhost:8000/users/${editId}`
// //       : "http://localhost:8000/users";
// //     const method = editId ? "PUT" : "POST";

// //     const payload = {
// //       ...form,
// //       age: form.age ? parseInt(form.age) : undefined,
// //       preferences: form.preferences
// //         ? form.preferences.split(",").map((p) => p.trim())
// //         : [],
// //     };

// //     await fetch(url, {
// //       method,
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     });

// //     setForm({
// //       name: "",
// //       email: "",
// //       age: "",
// //       nationality: "",
// //       travelStyle: "",
// //       preferences: "",
// //     });
// //     setEditId(null);
// //     fetchUsers();
// //   };

// //   const handleEdit = (user) => {
// //     setForm({
// //       name: user.name,
// //       email: user.email,
// //       age: user.age || "",
// //       nationality: user.nationality || "",
// //       travelStyle: user.travelStyle || "",
// //       preferences: user.preferences ? user.preferences.join(", ") : "",
// //     });
// //     setEditId(user.id);
// //   };

// //   const handleDelete = async (id) => {
// //     await fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
// //     fetchUsers();
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   return (
// //     <div className="flex">
// //       <Sidebar />
// //       <main className="flex-1 p-8 bg-[#f5f5f5]">
// //         <h1 className="text-2xl font-bold text-[#4c6444] mb-4">User Manager</h1>

// //         <form
// //           onSubmit={handleSubmit}
// //           className="space-y-4 bg-white p-6 rounded shadow max-w-2xl mb-8"
// //         >
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Name"
// //             value={form.name}
// //             onChange={(e) => setForm({ ...form, name: e.target.value })}
// //             required
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Email"
// //             value={form.email}
// //             onChange={(e) => setForm({ ...form, email: e.target.value })}
// //             required
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Age"
// //             type="number"
// //             value={form.age}
// //             onChange={(e) => setForm({ ...form, age: e.target.value })}
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Nationality"
// //             value={form.nationality}
// //             onChange={(e) => setForm({ ...form, nationality: e.target.value })}
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Travel Style"
// //             value={form.travelStyle}
// //             onChange={(e) => setForm({ ...form, travelStyle: e.target.value })}
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Preferences (comma-separated)"
// //             value={form.preferences}
// //             onChange={(e) => setForm({ ...form, preferences: e.target.value })}
// //           />
// //           <button className="bg-[#4c6444] text-white px-4 py-2 rounded">
// //             {editId ? "Update" : "Add"} User
// //           </button>
// //         </form>

// //         <div className="space-y-4">
// //           {users.map((user) => (
// //             <div
// //               key={user.id}
// //               className="bg-[#CABA9C] p-4 rounded shadow flex justify-between items-start"
// //             >
// //               <div>
// //                 <h3 className="font-semibold text-lg">{user.name}</h3>
// //                 <p>Email: {user.email}</p>
// //                 {user.age && <p>Age: {user.age}</p>}
// //                 {user.nationality && <p>Nationality: {user.nationality}</p>}
// //                 {user.travelStyle && <p>Style: {user.travelStyle}</p>}
// //                 {user.preferences?.length > 0 && (
// //                   <p>Preferences: {user.preferences.join(", ")}</p>
// //                 )}
// //               </div>
// //               <div className="space-x-2">
// //                 <button
// //                   onClick={() => handleEdit(user)}
// //                   className="text-blue-700 underline"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(user.id)}
// //                   className="text-red-700 underline"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// // import React, { useEffect, useState } from "react";
// // import Sidebar from "./Sidebar";

// // export default function UserManager() {
// //   const [users, setUsers] = useState([]);
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     age: "",
// //     nationality: "",
// //     travelStyle: "",
// //     preferences: "",
// //     saved_itineraries: [], // Add this field
// //   });
// //   const [editId, setEditId] = useState(null);

// //   const fetchUsers = async () => {
// //     try {
// //       const res = await fetch("http://localhost:8000/users");
// //       const data = await res.json();
      
// //       // Transform ObjectId to string for saved_itineraries
// //       const transformedUsers = data.map(user => ({
// //         ...user,
// //         saved_itineraries: user.saved_itineraries 
// //           ? user.saved_itineraries.map(id => 
// //               typeof id === 'object' && id.$oid 
// //                 ? id.$oid 
// //                 : id.toString()
// //             )
// //           : []
// //       }));

// //       setUsers(transformedUsers);
// //     } catch (error) {
// //       console.error("Error fetching users:", error);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const url = editId
// //       ? `http://localhost:8000/users/${editId}`
// //       : "http://localhost:8000/users";
// //     const method = editId ? "PUT" : "POST";

// //     const payload = {
// //       ...form,
// //       age: form.age ? parseInt(form.age) : undefined,
// //       preferences: form.preferences
// //         ? form.preferences.split(",").map((p) => p.trim())
// //         : [],
// //       saved_itineraries: form.saved_itineraries || [], // Ensure this is always an array
// //     };

// //     try {
// //       const response = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.detail || 'Something went wrong');
// //       }

// //       setForm({
// //         name: "",
// //         email: "",
// //         age: "",
// //         nationality: "",
// //         travelStyle: "",
// //         preferences: "",
// //         saved_itineraries: [],
// //       });
// //       setEditId(null);
// //       fetchUsers();
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //       alert(error.message);
// //     }
// //   };

// //   const handleEdit = (user) => {
// //     setForm({
// //       name: user.name,
// //       email: user.email,
// //       age: user.age || "",
// //       nationality: user.nationality || "",
// //       travelStyle: user.travelStyle || "",
// //       preferences: user.preferences ? user.preferences.join(", ") : "",
// //       saved_itineraries: user.saved_itineraries 
// //         ? user.saved_itineraries.map(id => 
// //             typeof id === 'object' && id.$oid 
// //               ? id.$oid 
// //               : id.toString()
// //           )
// //         : [],
// //     });
// //     setEditId(user.id);
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
// //       fetchUsers();
// //     } catch (error) {
// //       console.error("Error deleting user:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);


// // import React, { useEffect, useState } from "react";
// // import Sidebar from "./Sidebar";

// // export default function UserManager() {
// //   const [users, setUsers] = useState([]);
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     age: "",
// //     nationality: "",
// //     travelStyle: "",
// //     preferences: "",
// //     saved_itineraries: [],
// //   });
// //   const [editId, setEditId] = useState(null);
// //   const [error, setError] = useState(null);

// //   // const fetchUsers = async () => {
// //   //   try {
// //   //     const res = await fetch("http://localhost:8000/users");
// //   //     const data = await res.json();
      
// //   //     const transformedUsers = data.map(user => ({
// //   //       ...user,
// //   //       saved_itineraries: Array.isArray(user.saved_itineraries) 
// //   //         ? user.saved_itineraries.map(id => 
// //   //             typeof id === 'object' && id.$oid 
// //   //               ? id.$oid 
// //   //               : id.toString()
// //   //           )
// //   //         : [],
// //   //     }));

// //   //     setUsers(transformedUsers);
// //   //   } catch (error) {
// //   //     console.error("Error fetching users:", error);
// //   //     setError("Failed to fetch users");
// //   //   }
// //   // };
// //   const fetchUsers = async () => {
// //   try {
// //     const res = await fetch("http://localhost:8000/users");
// //     const data = await res.json();
    
// //     const transformedUsers = data.map(user => ({
// //       ...user,
// //       id: user._id?.$oid || user._id, // Handle different ObjectId formats
// //       saved_itineraries: Array.isArray(user.saved_itineraries) 
// //         ? user.saved_itineraries.map(id => 
// //             // Convert ObjectId to string, handling different possible formats
// //             id?.$oid 
// //               ? id.$oid 
// //               : typeof id === 'object' 
// //                 ? id.toString() 
// //                 : id
// //           ).filter(id => id) // Remove any falsy values
// //         : [],
// //     }));

// //     setUsers(transformedUsers);
// //   } catch (error) {
// //     console.error("Error fetching users:", error);
// //     setError("Failed to fetch users");
// //   }
// // };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();
  
// //   // Validation
// //   if (!form.name || !form.email) {
// //     setError("Name and Email are required");
// //     return;
// //   }

// //   const url = editId
// //     ? `http://localhost:8000/users/${editId}`
// //     : "http://localhost:8000/users";
// //   const method = editId ? "PUT" : "POST";

// //   // Helper function to convert ObjectId or any object to string
// //   const convertToString = (id) => {
// //     // If it's an object with $oid property
// //     if (id && typeof id === 'object' && id.$oid) {
// //       return id.$oid;
// //     }
// //     // If it's an ObjectId or similar object with toString method
// //     if (id && typeof id.toString === 'function') {
// //       return id.toString();
// //     }
// //     // If it's already a string
// //     if (typeof id === 'string') {
// //       return id;
// //     }
// //     // If nothing else works, return empty string or handle as needed
// //     return '';
// //   };

// //   const payload = {
// //     name: form.name,
// //     email: form.email,
// //     age: form.age ? parseInt(form.age) : null,
// //     nationality: form.nationality || "",
// //     travelStyle: form.travelStyle || "",
// //     preferences: form.preferences
// //       ? form.preferences.split(",").map(p => p.trim())
// //       : [],
// //     saved_itineraries: form.saved_itineraries 
// //       ? form.saved_itineraries
// //           .map(convertToString)  // Convert each itinerary ID to string
// //           .filter(id => id !== '')  // Remove any empty strings
// //       : [],
// //   };

// //   try {
// //     const response = await fetch(url, {
// //       method,
// //       headers: { 
// //         "Content-Type": "application/json" 
// //       },
// //       body: JSON.stringify(payload),
// //     });

// //     if (!response.ok) {
// //       // Try to get more details about the error
// //       const errorBody = await response.text();
// //       console.error('Error response:', errorBody);
// //       throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
// //     }

// //     // Reset form and fetch updated users
// //     setForm({
// //       name: "",
// //       email: "",
// //       age: "",
// //       nationality: "",
// //       travelStyle: "",
// //       preferences: "",
// //       saved_itineraries: [],
// //     });
// //     setEditId(null);
// //     setError(null);
// //     fetchUsers();
// //   } catch (error) {
// //     console.error("Error submitting form:", error);
// //     setError(error.message);
// //   }
// // };

// // // Also update handleEdit to ensure consistent conversion
// // const handleEdit = (user) => {
// //   setForm({
// //     name: user.name || "",
// //     email: user.email || "",
// //     age: user.age ? String(user.age) : "",
// //     nationality: user.nationality || "",
// //     travelStyle: user.travelStyle || "",
// //     preferences: user.preferences ? user.preferences.join(", ") : "",
// //     saved_itineraries: user.saved_itineraries 
// //       ? user.saved_itineraries.map(id => 
// //           id && typeof id === 'object' && id.$oid 
// //             ? id.$oid 
// //             : id.toString()
// //         )
// //       : [],
// //   });
// //   setEditId(user.id || user._id);
// // };

// // // const handleSubmit = async (e) => {
// // //   e.preventDefault();
  
// // //   // Validation
// // //   if (!form.name || !form.email) {
// // //     setError("Name and Email are required");
// // //     return;
// // //   }

// // //   const url = editId
// // //     ? `http://localhost:8000/users/${editId}`
// // //     : "http://localhost:8000/users";
// // //   const method = editId ? "PUT" : "POST";

// // //   const payload = {
// // //     name: form.name,
// // //     email: form.email,
// // //     age: form.age ? parseInt(form.age) : null,
// // //     nationality: form.nationality || "",
// // //     travelStyle: form.travelStyle || "",
// // //     preferences: form.preferences
// // //       ? form.preferences.split(",").map(p => p.trim())
// // //       : [],
// // //     saved_itineraries: form.saved_itineraries 
// // //       ? form.saved_itineraries.map(id => 
// // //           // Ensure all saved_itineraries are strings
// // //           typeof id === 'object' && id.$oid 
// // //             ? id.$oid 
// // //             : id.toString()
// // //         )
// // //       : [],
// // //   };

// // //   try {
// // //     const response = await fetch(url, {
// // //       method,
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify(payload),
// // //     });

// // //     if (!response.ok) {
// // //       // Try to get more details about the error
// // //       const errorBody = await response.text();
// // //       console.error('Error response:', errorBody);
// // //       throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
// // //     }

// // //     // Reset form and fetch updated users
// // //     setForm({
// // //       name: "",
// // //       email: "",
// // //       age: "",
// // //       nationality: "",
// // //       travelStyle: "",
// // //       preferences: "",
// // //       saved_itineraries: [],
// // //     });
// // //     setEditId(null);
// // //     setError(null);
// // //     fetchUsers();
// // //   } catch (error) {
// // //     console.error("Error submitting form:", error);
// // //     setError(error.message);
// // //   }
// // // };

// // // const handleEdit = (user) => {
// // //   setForm({
// // //     name: user.name || "",
// // //     email: user.email || "",
// // //     age: user.age ? String(user.age) : "",
// // //     nationality: user.nationality || "",
// // //     travelStyle: user.travelStyle || "",
// // //     preferences: user.preferences ? user.preferences.join(", ") : "",
// // //     saved_itineraries: user.saved_itineraries 
// // //       ? user.saved_itineraries.map(id => 
// // //           typeof id === 'object' && id.$oid 
// // //             ? id.$oid 
// // //             : id.toString()
// // //         )
// // //       : [],
// // //   });
// // //   setEditId(user.id || user._id);
// // // };
// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault();
    
// //   //   // Validation
// //   //   if (!form.name || !form.email) {
// //   //     setError("Name and Email are required");
// //   //     return;
// //   //   }

// //   //   const url = editId
// //   //     ? `http://localhost:8000/users/${editId}`
// //   //     : "http://localhost:8000/users";
// //   //   const method = editId ? "PUT" : "POST";

// //   //   const payload = {
// //   //     name: form.name,
// //   //     email: form.email,
// //   //     age: form.age ? parseInt(form.age) : null,
// //   //     nationality: form.nationality || "",
// //   //     travelStyle: form.travelStyle || "",
// //   //     preferences: form.preferences
// //   //       ? form.preferences.split(",").map(p => p.trim())
// //   //       : [],
// //   //     saved_itineraries: form.saved_itineraries || [],
// //   //   };

// //   //   try {
// //   //     const response = await fetch(url, {
// //   //       method,
// //   //       headers: { "Content-Type": "application/json" },
// //   //       body: JSON.stringify(payload),
// //   //     });

// //   //     if (!response.ok) {
// //   //       throw new Error('Something went wrong');
// //   //     }

// //   //     // Reset form and fetch updated users
// //   //     setForm({
// //   //       name: "",
// //   //       email: "",
// //   //       age: "",
// //   //       nationality: "",
// //   //       travelStyle: "",
// //   //       preferences: "",
// //   //       saved_itineraries: [],
// //   //     });
// //   //     setEditId(null);
// //   //     setError(null);
// //   //     fetchUsers();
// //   //   } catch (error) {
// //   //     console.error("Error submitting form:", error);
// //   //     setError(error.message);
// //   //   }
// //   // };

// //   // const handleEdit = (user) => {
// //   //   setForm({
// //   //     name: user.name || "",
// //   //     email: user.email || "",
// //   //     age: user.age ? String(user.age) : "",
// //   //     nationality: user.nationality || "",
// //   //     travelStyle: user.travelStyle || "",
// //   //     preferences: user.preferences ? user.preferences.join(", ") : "",
// //   //     saved_itineraries: user.saved_itineraries || [],
// //   //   });
// //   //   setEditId(user.id);
// //   // };

// //   const handleDelete = async (id) => {
// //     try {
// //       await fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
// //       fetchUsers();
// //     } catch (error) {
// //       console.error("Error deleting user:", error);
// //       setError("Failed to delete user");
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm(prevForm => ({
// //       ...prevForm,
// //       [name]: value
// //     }));
// //   };

// //   // useEffect(() => {
// //   //   fetchUsers();
// //   // }, []);
  
// //   return (
// //     <div className="flex">
// //       <Sidebar />
// //       <main className="flex-1 p-8 bg-[#f5f5f5]">
// //         <h1 className="text-2xl font-bold text-[#4c6444] mb-4">User Manager</h1>

// //         <form
// //           onSubmit={handleSubmit}
// //           className="space-y-4 bg-white p-6 rounded shadow max-w-2xl mb-8"
// //         >
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Name"
// //             value={form.name}
// //             onChange={(e) => setForm({ ...form, name: e.target.value })}
// //             required
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Email"
// //             value={form.email}
// //             onChange={(e) => setForm({ ...form, email: e.target.value })}
// //             required
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Age"
// //             type="number"
// //             value={form.age}
// //             onChange={(e) => setForm({ ...form, age: e.target.value })}
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Nationality"
// //             value={form.nationality}
// //             onChange={(e) => setForm({ ...form, nationality: e.target.value })}
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Travel Style"
// //             value={form.travelStyle}
// //             onChange={(e) => setForm({ ...form, travelStyle: e.target.value })}
// //           />
// //           <input
// //             className="w-full border p-2 rounded"
// //             placeholder="Preferences (comma-separated)"
// //             value={form.preferences}
// //             onChange={(e) => setForm({ ...form, preferences: e.target.value })}
// //           />
// //           <button className="bg-[#4c6444] text-white px-4 py-2 rounded">
// //             {editId ? "Update" : "Add"} User
// //           </button>
// //         </form>

// //         <div className="space-y-4">
// //           {users.map((user) => (
// //             <div
// //               key={user.id}
// //               className="bg-[#CABA9C] p-4 rounded shadow flex justify-between items-start"
// //             >
// //               <div>
// //                 <h3 className="font-semibold text-lg">{user.name}</h3>
// //                 <p>Email: {user.email}</p>
// //                 {user.age && <p>Age: {user.age}</p>}
// //                 {user.nationality && <p>Nationality: {user.nationality}</p>}
// //                 {user.travelStyle && <p>Style: {user.travelStyle}</p>}
// //                 {user.preferences?.length > 0 && (
// //                   <p>Preferences: {user.preferences.join(", ")}</p>
// //                 )}
// //               </div>
// //               <div className="space-x-2">
// //                 <button
// //                   onClick={() => handleEdit(user)}
// //                   className="text-blue-700 underline"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(user.id)}
// //                   className="text-red-700 underline"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // } 
// import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";

// // Pretty-print FastAPI / Pydantic errors
// function parseFastapiError(errorData) {
//   try {
//     if (Array.isArray(errorData?.detail)) {
//       return errorData.detail
//         .map((e) => {
//           const path = Array.isArray(e.loc) ? e.loc.join(" → ") : String(e.loc || "");
//           return `${e.msg}${path ? ` (at ${path})` : ""}`;
//         })
//         .join("\n");
//     }
//     if (typeof errorData?.detail === "string") return errorData.detail;
//     return JSON.stringify(errorData, null, 2);
//   } catch {
//     return "Unexpected error";
//   }
// }

// export default function UserManager() {
