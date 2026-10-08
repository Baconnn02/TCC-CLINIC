import { useEffect, useState } from "react";
import api from "../services/api";

function StudentManagement() {
    const [viewingStudent, setViewingStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const emptyForm = {
        student_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        course: "",
        year_level: "",
        section: "",
        sex: "",
        birth_date: "",
        contact_number: "",
        address: "",
    };

    const [formData, setFormData] = useState(emptyForm);

    const filteredStudents = students.filter((student) => {
        const searchText = search.toLowerCase();

        const fullName =
            `${student.first_name} ${student.middle_name || ""} ${student.last_name}`
                .toLowerCase();

        return (
            student.student_id.toLowerCase().includes(searchText) ||
            fullName.includes(searchText)
        );
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get("/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingStudent) {
                await api.put(`/students/${editingStudent.id}`, formData);
                alert("Student updated successfully!");
            } else {
                await api.post("/students", formData);
                alert("Student added successfully!");
            }

            setFormData(emptyForm);
            setShowForm(false);
            setEditingStudent(null);

            fetchStudents();
        } catch (error) {
            console.error("Error saving student:", error);

            if (error.response?.data?.errors) {
                alert("Please check the required fields.");
            } else {
                alert("Failed to save student.");
            }
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);

        setFormData({
            student_id: student.student_id || "",
            first_name: student.first_name || "",
            middle_name: student.middle_name || "",
            last_name: student.last_name || "",
            course: student.course || "",
            year_level: student.year_level || "",
            section: student.section || "",
            sex: student.sex || "",
            birth_date: student.birth_date || "",
            contact_number: student.contact_number || "",
            address: student.address || "",
        });

        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/students/${id}`);

            alert("Student deleted successfully!");

            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Failed to delete student.");
        }
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingStudent(null);
        setFormData(emptyForm);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Student Management
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Manage students registered in the TCC Clinic.
                    </p>
                </div>

                {/* Form */}
                {showForm && (
                    <div className="mb-6 rounded-xl bg-white p-6 shadow">

                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editingStudent
                                    ? "Edit Student"
                                    : "Add Student"}
                            </h2>

                            <button
                                onClick={closeForm}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Student ID *
                                    </label>

                                    <input
                                        type="text"
                                        name="student_id"
                                        value={formData.student_id}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        First Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Middle Name
                                    </label>

                                    <input
                                        type="text"
                                        name="middle_name"
                                        value={formData.middle_name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Last Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Course *
                                    </label>

                                    <input
                                        type="text"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border p-2.5"
                                        placeholder="BSIT"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Year Level *
                                    </label>

                                    <select
                                        name="year_level"
                                        value={formData.year_level}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border p-2.5"
                                    >
                                        <option value="">
                                            Select Year
                                        </option>
                                        <option value="1st Year">
                                            1st Year
                                        </option>
                                        <option value="2nd Year">
                                            2nd Year
                                        </option>
                                        <option value="3rd Year">
                                            3rd Year
                                        </option>
                                        <option value="4th Year">
                                            4th Year
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Section
                                    </label>

                                    <input
                                        type="text"
                                        name="section"
                                        value={formData.section}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2.5"
                                        placeholder="BSIT-3B"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Sex
                                    </label>

                                    <select
                                        name="sex"
                                        value={formData.sex}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2.5"
                                    >
                                        <option value="">
                                            Select Sex
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">
                                            Female
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Birth Date
                                    </label>

                                    <input
                                        type="date"
                                        name="birth_date"
                                        value={formData.birth_date}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Contact Number
                                    </label>

                                    <input
                                        type="text"
                                        name="contact_number"
                                        value={formData.contact_number}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2.5"
                                        placeholder="09XXXXXXXXX"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border p-2.5"
                                    />
                                </div>

                            </div>

                            <div className="mt-6 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="rounded-lg border px-5 py-2.5"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                                >
                                    {editingStudent
                                        ? "Update Student"
                                        : "Save Student"}
                                </button>

                            </div>

                        </form>
                    </div>
                )}

                {/* Student Table */}
                <div className="rounded-xl bg-white p-6 shadow">

                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="text-xl font-semibold text-gray-800">
                            Students
                        </h2>
<div className="mb-4">
    <input
        type="text"
        placeholder="Search by Student ID or Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
    />
</div>
                        <button
                            onClick={() => {
                                setEditingStudent(null);
                                setFormData(emptyForm);
                                setShowForm(true);
                            }}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            + Add Student
                        </button>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="px-4 py-3">
                                        Student ID
                                    </th>

                                    <th className="px-4 py-3">
                                        Name
                                    </th>

                                    <th className="px-4 py-3">
                                        Course
                                    </th>

                                    <th className="px-4 py-3">
                                        Year
                                    </th>

                                    <th className="px-4 py-3">
                                        Section
                                    </th>

                                    <th className="px-4 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {students.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-4 py-8 text-center text-gray-500"
                                        >
                                            No students found.
                                        </td>
                                    </tr>
                                ) : (
                                   filteredStudents.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3">
                                                {student.student_id}
                                            </td>

                                            <td className="px-4 py-3">
                                                {student.first_name}{" "}
                                                {student.middle_name}{" "}
                                                {student.last_name}
                                            </td>

                                            <td className="px-4 py-3">
                                                {student.course}
                                            </td>

                                            <td className="px-4 py-3">
                                                {student.year_level}
                                            </td>

                                            <td className="px-4 py-3">
                                                {student.section || "-"}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
<div className="flex gap-2">
    <button
        onClick={() => setViewingStudent(student)}
        className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
    >
        View
    </button>

    <button
        onClick={() => handleEdit(student)}
        className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
    >
        Edit
    </button>

    <button
        onClick={() => handleDelete(student.id)}
        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
    >
        Delete
    </button>
</div>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
            {viewingStudent && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Student Details
                    </h2>
                    <p className="text-sm text-gray-500">
                        Student information
                    </p>
                </div>

                <button
                    onClick={() => setViewingStudent(null)}
                    className="text-2xl text-gray-400 hover:text-gray-700"
                >
                    ×
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-semibold text-gray-800">
                        {viewingStudent.student_id}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-800">
                        {viewingStudent.first_name}{" "}
                        {viewingStudent.middle_name || ""}{" "}
                        {viewingStudent.last_name}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-semibold text-gray-800">
                        {viewingStudent.course}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Year Level</p>
                    <p className="font-semibold text-gray-800">
                        {viewingStudent.year_level}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Section</p>
                    <p className="font-semibold text-gray-800">
                        {viewingStudent.section || "-"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Sex</p>
                    <p className="font-semibold text-gray-800">
                        {viewingStudent.sex || "-"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Birth Date</p>
                    <p className="font-semibold text-gray-800">
                        {viewingStudent.birth_date || "-"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-semibold text-gray-800">
                        {viewingStudent.contact_number || "-"}
                    </p>
                </div>

                <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-800">
                        {viewingStudent.address || "-"}
                    </p>
                </div>

            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => setViewingStudent(null)}
                    className="rounded-lg bg-gray-700 px-5 py-2 text-white hover:bg-gray-800"
                >
                    Close
                </button>
            </div>

        </div>
    </div>
)}
        </div>
    );
}

export default StudentManagement;