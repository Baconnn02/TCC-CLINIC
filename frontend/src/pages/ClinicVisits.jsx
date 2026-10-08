import { useEffect, useState } from "react";
import api from "../services/api";

function ClinicVisits() {
    const [visits, setVisits] = useState([]);
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingVisit, setEditingVisit] = useState(null);

    const [formData, setFormData] = useState({
        student_id: "",
        visit_date: "",
        reason: "",
        symptoms: "",
        temperature: "",
        blood_pressure: "",
        assessment: "",
        treatment: "",
        remarks: "",
    });

    // =========================
    // FETCH CLINIC VISITS
    // =========================
    const fetchVisits = async () => {
        try {
            const response = await api.get("/clinic-visits");
            setVisits(response.data);
        } catch (error) {
            console.error("Error fetching clinic visits:", error);
        }
    };

    // =========================
    // FETCH STUDENTS
    // =========================
    const fetchStudents = async () => {
        try {
            const response = await api.get("/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // =========================
    // LOAD DATA
    // =========================
    useEffect(() => {
        fetchVisits();
        fetchStudents();
    }, []);

    // =========================
    // HANDLE INPUT
    // =========================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // =========================
    // SUBMIT FORM
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingVisit) {
                await api.put(
                    `/clinic-visits/${editingVisit.id}`,
                    formData
                );

                alert("Clinic visit updated successfully.");
            } else {
                await api.post("/clinic-visits", formData);

                alert("Clinic visit added successfully.");
            }

            await fetchVisits();
            closeForm();
        } catch (error) {
            console.error("Error saving clinic visit:", error);

            if (error.response?.data?.errors) {
                console.error(error.response.data.errors);
            }

            alert("Failed to save clinic visit.");
        }
    };

    // =========================
    // EDIT VISIT
    // =========================
    const handleEdit = (visit) => {
        setEditingVisit(visit);

        setFormData({
            student_id: visit.student_id || "",
            visit_date: visit.visit_date || "",
            reason: visit.reason || "",
            symptoms: visit.symptoms || "",
            temperature: visit.temperature || "",
            blood_pressure: visit.blood_pressure || "",
            assessment: visit.assessment || "",
            treatment: visit.treatment || "",
            remarks: visit.remarks || "",
        });

        setShowForm(true);
    };

    // =========================
    // DELETE VISIT
    // =========================
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this clinic visit?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/clinic-visits/${id}`);

            alert("Clinic visit deleted successfully.");

            await fetchVisits();
        } catch (error) {
            console.error("Error deleting clinic visit:", error);
            alert("Failed to delete clinic visit.");
        }
    };

    // =========================
    // CLOSE FORM
    // =========================
    const closeForm = () => {
        setShowForm(false);
        setEditingVisit(null);

        setFormData({
            student_id: "",
            visit_date: "",
            reason: "",
            symptoms: "",
            temperature: "",
            blood_pressure: "",
            assessment: "",
            treatment: "",
            remarks: "",
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-7xl">

                {/* =========================
                    HEADER
                ========================= */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Clinic Visits
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Manage student clinic visits and health records.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        + Add Clinic Visit
                    </button>
                </div>

                {/* =========================
                    ADD / EDIT FORM
                ========================= */}
                {showForm && (
                    <div className="mb-8 rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-5 text-xl font-semibold text-gray-800">
                            {editingVisit
                                ? "Edit Clinic Visit"
                                : "Add Clinic Visit"}
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-4 md:grid-cols-2"
                        >

                            {/* Student */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Student
                                </label>

                                <select
                                    name="student_id"
                                    value={formData.student_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                                >
                                    <option value="">
                                        Select Student
                                    </option>

                                    {students.map((student) => (
                                        <option
                                            key={student.id}
                                            value={student.id}
                                        >
                                            {student.student_id} -{" "}
                                            {student.first_name}{" "}
                                            {student.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Visit Date */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Visit Date
                                </label>

                                <input
                                    type="date"
                                    name="visit_date"
                                    value={formData.visit_date}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Reason */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Reason for Visit
                                </label>

                                <input
                                    type="text"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Headache"
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Temperature */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Temperature
                                </label>

                                <input
                                    type="text"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                    placeholder="e.g. 36.5 °C"
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Blood Pressure */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Blood Pressure
                                </label>

                                <input
                                    type="text"
                                    name="blood_pressure"
                                    value={formData.blood_pressure}
                                    onChange={handleChange}
                                    placeholder="e.g. 120/80"
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Symptoms */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Symptoms
                                </label>

                                <textarea
                                    name="symptoms"
                                    value={formData.symptoms}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Describe the student's symptoms..."
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Assessment */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Assessment
                                </label>

                                <textarea
                                    name="assessment"
                                    value={formData.assessment}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Clinic assessment..."
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Treatment */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Treatment
                                </label>

                                <textarea
                                    name="treatment"
                                    value={formData.treatment}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Treatment given..."
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Remarks */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Remarks
                                </label>

                                <textarea
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Additional remarks..."
                                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 md:col-span-2">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                                >
                                    {editingVisit
                                        ? "Update Visit"
                                        : "Save Visit"}
                                </button>

                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="rounded-lg bg-gray-200 px-5 py-3 font-medium text-gray-700 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* =========================
                    CLINIC VISITS TABLE
                ========================= */}
                <div className="overflow-hidden rounded-xl bg-white shadow">

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="px-5 py-4">
                                        Student
                                    </th>

                                    <th className="px-5 py-4">
                                        Reason
                                    </th>

                                    <th className="px-5 py-4">
                                        Date
                                    </th>

                                    <th className="px-5 py-4">
                                        Temperature
                                    </th>

                                    <th className="px-5 py-4">
                                        Blood Pressure
                                    </th>

                                    <th className="px-5 py-4">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {visits.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-5 py-10 text-center text-gray-500"
                                        >
                                            No clinic visits yet.
                                        </td>
                                    </tr>
                                ) : (
                                    visits.map((visit) => (
                                        <tr
                                            key={visit.id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            {/* Student */}
                                            <td className="px-5 py-4">
                                                {visit.student ? (
                                                    <div>
                                                        <p className="font-medium text-gray-800">
                                                            {
                                                                visit.student
                                                                    .first_name
                                                            }{" "}
                                                            {
                                                                visit.student
                                                                    .last_name
                                                            }
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                visit.student
                                                                    .student_id
                                                            }
                                                        </p>
                                                    </div>
                                                ) : (
                                                    "Unknown Student"
                                                )}
                                            </td>

                                            {/* Reason */}
                                            <td className="px-5 py-4">
                                                {visit.reason}
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4">
                                                {visit.visit_date}
                                            </td>

                                            {/* Temperature */}
                                            <td className="px-5 py-4">
                                                {visit.temperature || "-"}
                                            </td>

                                            {/* Blood Pressure */}
                                            <td className="px-5 py-4">
                                                {visit.blood_pressure || "-"}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(visit)
                                                        }
                                                        className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                visit.id
                                                            )
                                                        }
                                                        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>

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
        </div>
    );
}

export default ClinicVisits;