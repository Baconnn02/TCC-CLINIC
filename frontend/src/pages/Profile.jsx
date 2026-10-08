import { useEffect, useState } from "react";
import { Camera, Save, User } from "lucide-react";
import api from "../services/api";

function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Convert database path to full URL
    const getImageUrl = (path) => {
        if (!path) return null;

        if (path.startsWith("http")) {
            return path;
        }

        return `http://127.0.0.1:8000${path}`;
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setError("");

            const response = await api.get("/me");
            const user = response.data.user;

            setName(user.name || "");
            setEmail(user.email || "");
            setRole(user.role || "");

            if (user.profile_picture) {
                setPreview(getImageUrl(user.profile_picture));
            } else {
                setPreview(null);
            }

            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            console.error("Load profile error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load profile."
            );
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setMessage("");
        setError("");

        // Maximum 2MB
        if (file.size > 2 * 1024 * 1024) {
            setError("Image must be less than 2MB.");
            return;
        }

        // Allowed image types
        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError(
                "Only PNG, JPG, JPEG, and WEBP images are allowed."
            );
            return;
        }

        setProfilePicture(file);

        // Show preview immediately
        const reader = new FileReader();

        reader.onload = () => {
            setPreview(reader.result);
        };

        reader.onerror = () => {
            setError("Failed to read the selected image.");
        };

        reader.readAsDataURL(file);
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = () => {
                reject(new Error("Failed to convert image."));
            };

            reader.readAsDataURL(file);
        });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            let avatar = null;

            // Convert selected image to Base64
            if (profilePicture) {
                avatar = await fileToBase64(profilePicture);
            }

            const response = await api.put("/profile", {
                name: name,
                role: role,
                avatar: avatar,
            });

            const updatedUser = response.data.user;

            // Save updated user locally
            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setName(updatedUser.name || "");
            setEmail(updatedUser.email || "");
            setRole(updatedUser.role || "");

            if (updatedUser.profile_picture) {
                setPreview(
                    getImageUrl(updatedUser.profile_picture)
                );
            }

            setProfilePicture(null);

            setMessage(
                response.data.message ||
                "Profile updated successfully."
            );

        } catch (err) {
            console.error("Update profile error:", err);
            console.error("Server response:", err.response?.data);

            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                JSON.stringify(err.response?.data) ||
                err.message ||
                "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="mx-auto max-w-3xl">

                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Profile
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage your account information
                    </p>
                </div>

                {/* PROFILE CARD */}
                <div className="rounded-2xl bg-white p-8 shadow-sm">

                    {/* PROFILE IMAGE */}
                    <div className="mb-8 flex flex-col items-center">

                        <div className="relative">

                            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow">

                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            console.error(
                                                "Image failed to load:",
                                                e.currentTarget.src
                                            );
                                        }}
                                    />
                                ) : (
                                    <User
                                        size={60}
                                        className="text-gray-400"
                                    />
                                )}

                            </div>

                            {/* CAMERA BUTTON */}
                            <label
                                htmlFor="profile-image"
                                className="absolute bottom-0 right-0 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#800000] text-white shadow-md transition hover:bg-[#650000]"
                            >
                                <Camera size={19} />
                            </label>

                            <input
                                id="profile-image"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={handleImageChange}
                            />

                        </div>

                        <p className="mt-3 text-sm text-gray-500">
                            Click the camera icon to change your photo
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            Maximum file size: 2MB
                        </p>

                    </div>

                    {/* SUCCESS MESSAGE */}
                    {message && (
                        <div className="mb-5 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
                            {message}
                        </div>
                    )}

                    {/* ERROR MESSAGE */}
                    {error && (
                        <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* NAME */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                        />
                    </div>

                    {/* ROLE */}
                    <div className="mb-8">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Role
                        </label>

                        <input
                            type="text"
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20"
                            placeholder="Enter your role"
                        />
                    </div>

                    {/* SAVE BUTTON */}
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-lg bg-[#800000] px-6 py-3 font-medium text-white transition hover:bg-[#650000] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Save size={18} />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Profile;