import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import {
    Users,
    Stethoscope,
    FileText,
    Search,
    Bell,
    CalendarDays,
    ClipboardList,
    UserPlus,
    UserRound,
    Activity,
    ChevronRight,
    Settings,
    LogOut,
    HeartPulse,
    CheckCircle2,
    ArrowUp,
    Pencil,
} from "lucide-react";

const MAROON = "#8b1730";

// Returns the last 6 months (short names), ending with the current month.
const getTrendMonths = () => {
    const now = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
        const d = new Date(
            now.getFullYear(),
            now.getMonth() - i,
            1
        );

        months.push(
            d.toLocaleDateString("en-US", {
                month: "short",
            })
        );
    }

    return months;
};

function Dashboard() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const [loading, setLoading] = useState(true);

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        const saved = localStorage.getItem("user");

        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch {
                setUser(null);
            }
        }

        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const [dash, student] = await Promise.all([
                api.get("/dashboard"),
                api.get("/students"),
            ]);

            setDashboard(dash.data);

            const data = student.data;

            setStudents(
                Array.isArray(data)
                    ? data
                    : data.data || []
            );
        } catch (error) {
            console.error(
                "Dashboard loading error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.error(
                "Logout error:",
                error
            );
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    /*
    =========================================
    PROFILE IMAGE URL
    =========================================
    */

    const getImageUrl = (path) => {
        if (!path) {
            return null;
        }

        if (path.startsWith("http")) {
            return path;
        }

        return `http://127.0.0.1:8000${path}`;
    };

    /*
    =========================================
    STUDENT NAME
    =========================================
    */

    const getName = (student) =>
        student?.name ||
        `${student?.first_name || ""} ${
            student?.last_name || ""
        }`.trim() ||
        "Unknown Student";

    /*
    =========================================
    STUDENT SEARCH
    =========================================
    */

    const filteredStudents = useMemo(() => {
        const value = search
            .toLowerCase()
            .trim();

        if (!value) {
            return [];
        }

        return students
            .filter((student) => {
                const name = getName(student)
                    .toLowerCase();

                const id = String(
                    student.student_id ||
                        student.id ||
                        ""
                ).toLowerCase();

                return (
                    name.includes(value) ||
                    id.includes(value)
                );
            })
            .slice(0, 5);
    }, [search, students]);

    /*
    =========================================
    DASHBOARD COUNTS
    =========================================
    */

    const totalStudents =
        dashboard?.total_students ??
        students.length;

    const totalVisits =
        dashboard?.total_visits ?? 0;

    const totalRecords =
        dashboard?.total_records ??
        totalVisits;

    const recentVisits =
        dashboard?.recent_visits || [];

    /*
    =========================================
    OVERVIEW TREND
    =========================================
    */

    const trendMonths = useMemo(
        () => getTrendMonths(),
        []
    );

    const buildTrend = (value) => {
        const base = Math.max(
            Number(value) || 0,
            1
        );

        const fractions = [
            0.35,
            0.5,
            0.62,
            0.75,
            0.88,
            1,
        ];

        return fractions.map(
            (fraction, index) =>
                index ===
                fractions.length - 1
                    ? Number(value) || 0
                    : Math.max(
                          Math.round(
                              base * fraction
                          ),
                          1
                      )
        );
    };

    const overview = [
        {
            label: "Total Students",
            value: totalStudents,
            icon: Users,
        },
        {
            label: "Clinic Visits",
            value: totalVisits,
            icon: Stethoscope,
        },
        {
            label: "Medical Records",
            value: totalRecords,
            icon: FileText,
        },
        {
            label: "Recent Activity",
            value: recentVisits.length,
            icon: Activity,
        },
    ];

    /*
    =========================================
    REASON CHART
    =========================================
    */

    const reasons = useMemo(() => {
        const count = {};

        recentVisits.forEach((visit) => {
            const reason =
                visit.reason?.trim() ||
                "Other";

            count[reason] =
                (count[reason] || 0) + 1;
        });

        return Object.entries(count)
            .map(([label, value]) => ({
                label,
                value,
            }))
            .sort(
                (a, b) =>
                    b.value - a.value
            )
            .slice(0, 6);
    }, [recentVisits]);

    const maxReason = Math.max(
        ...reasons.map(
            (x) => x.value
        ),
        1
    );

    /*
    =========================================
    GENDER
    =========================================
    */

    const male = students.filter(
        (s) =>
            String(
                s.sex ||
                    s.gender ||
                    ""
            ).toLowerCase() === "male"
    ).length;

    const female = students.filter(
        (s) =>
            String(
                s.sex ||
                    s.gender ||
                    ""
            ).toLowerCase() === "female"
    ).length;

    const gender = [
        {
            label: "Male",
            value: male,
        },
        {
            label: "Female",
            value: female,
        },
    ];

    const maxGender = Math.max(
        male,
        female,
        1
    );

    /*
    =========================================
    DATE FORMATTING
    =========================================
    */

    const formatDate = (date) =>
        date
            ? new Date(
                  date
              ).toLocaleDateString(
                  "en-US",
                  {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                  }
              )
            : "—";

    const formatTime = (date) =>
        date
            ? new Date(
                  date
              ).toLocaleTimeString(
                  "en-US",
                  {
                      hour: "2-digit",
                      minute: "2-digit",
                  }
              )
            : "—";

    const displayDate = new Date(
        `${selectedDate}T00:00:00`
    );

    return (
        <div className="min-h-screen bg-[#f7f8fb] text-[#172033]">

            {/* =========================================
                TOP BAR
            ========================================= */}

            <header className="sticky top-0 z-40 flex h-[72px] items-center justify-end border-b border-[#eee8e8] bg-white px-7">

                <div className="flex items-center gap-5">

                    {/* NOTIFICATION */}

                    <button
                        className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-[#faf0f2] hover:text-[#800020]"
                    >
                        <Bell size={21} />

                        <span className="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                    </button>

                    <div className="h-8 w-px bg-gray-200" />

                    {/* USER DROPDOWN */}

                    <div className="relative">

                        <button
                            onClick={() =>
                                setDropdown(
                                    !dropdown
                                )
                            }
                            className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-gray-50"
                        >

                            {/* PROFILE IMAGE */}

                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#f7e5e8] text-[#800020]">

                                {user?.profile_picture ? (
                                    <img
                                        src={getImageUrl(
                                            user.profile_picture
                                        )}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            console.error(
                                                "Profile image failed to load:",
                                                e.currentTarget.src
                                            );
                                        }}
                                    />
                                ) : (
                                    <UserRound
                                        size={21}
                                    />
                                )}

                            </div>

                            {/* USER NAME */}

                            <div className="hidden text-left sm:block">

                                <p className="text-sm font-semibold">
                                    {user?.name ||
                                        "Clinic Staff"}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {user?.role ||
                                        "Clinic Staff"}
                                </p>

                            </div>

                            <ChevronRight
                                size={16}
                                className={`rotate-90 transition ${
                                    dropdown
                                        ? "rotate-[270deg]"
                                        : ""
                                }`}
                            />

                        </button>

                        {/* DROPDOWN */}

                        {dropdown && (
                            <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border bg-white shadow-xl">

                                {/* USER INFO */}

                                <div className="border-b px-4 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#f7e5e8] text-[#800020]">

                                            {user?.profile_picture ? (
                                                <img
                                                    src={getImageUrl(
                                                        user.profile_picture
                                                    )}
                                                    alt="Profile"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <UserRound
                                                    size={20}
                                                />
                                            )}

                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold">
                                                {user?.name ||
                                                    "Clinic Staff"}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {user?.role ||
                                                    "Clinic Staff"}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* EDIT PROFILE */}

                                <button
                                    onClick={() => {
                                        setDropdown(
                                            false
                                        );

                                        navigate(
                                            "/profile"
                                        );
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-gray-50"
                                >
                                    <Pencil
                                        size={18}
                                        className="text-[#800020]"
                                    />

                                    Edit Profile
                                </button>

                                {/* SETTINGS */}

                                <Link
                                    to="/settings"
                                    onClick={() =>
                                        setDropdown(
                                            false
                                        )
                                    }
                                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                                >
                                    <Settings
                                        size={18}
                                        className="text-[#800020]"
                                    />

                                    Settings
                                </Link>

                                {/* LOGOUT */}

                                <button
                                    onClick={logout}
                                    className="flex w-full items-center gap-3 border-t px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                                >
                                    <LogOut
                                        size={18}
                                    />

                                    Log Out
                                </button>

                            </div>
                        )}

                    </div>
                </div>

            </header>

            {/* =========================================
                MAIN
            ========================================= */}

            <main className="w-full p-6 lg:p-7">

                {/* =========================================
                    WELCOME AREA
                ========================================= */}

                <div className="mb-7 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-center">

                    {/* WELCOME */}

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#fbe9ec] to-[#fdf3f4] px-7 py-6">

                        <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.2em] text-[#8a142b]">
                            Welcome back,
                        </p>

                        <h1 className="text-[38px] font-bold leading-tight tracking-tight text-[#111522]">
                            Good morning,{" "}
                            {user?.name ||
                                "Clinic Staff"}
                            !
                        </h1>

                        <p className="mt-2 text-[15px] text-slate-500">
                            Here's what's happening
                            at TCC Clinic today.
                        </p>

                    </div>

                    {/* CALENDAR */}

                    <div className="flex items-center gap-3 rounded-2xl border border-[#eee8e8] bg-white px-4 py-3 shadow-sm">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7e5e8] text-[#800020]">
                            <CalendarDays
                                size={21}
                            />
                        </div>

                        <div>

                            <p className="text-sm font-bold">
                                {displayDate.toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )}
                            </p>

                            <p className="text-xs text-slate-500">
                                {displayDate.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday:
                                            "long",
                                    }
                                )}
                            </p>

                        </div>

                        <input
                            type="date"
                            value={
                                selectedDate
                            }
                            onChange={(e) =>
                                setSelectedDate(
                                    e.target.value
                                )
                            }
                            className="ml-2 w-9 cursor-pointer rounded-lg border-0 bg-transparent text-transparent outline-none"
                            title="Select date"
                        />

                    </div>

                </div>

                {/* =========================================
                    OVERVIEW CARDS
                ========================================= */}

                <section className="mb-6 grid grid-cols-2 gap-5 lg:grid-cols-4">

                    {overview.map(
                        (item) => {
                            const Icon =
                                item.icon;

                            const trend =
                                buildTrend(
                                    item.value
                                );

                            const maxTrend =
                                Math.max(
                                    ...trend,
                                    1
                                );

                            return (
                                <div
                                    key={
                                        item.label
                                    }
                                    className="rounded-2xl border border-[#eee8e8] bg-white p-5 shadow-sm"
                                >

                                    <div className="flex items-start justify-between gap-4">

                                        <div>

                                            <div className="mb-4 flex items-center gap-2">

                                                <IconBox
                                                    icon={
                                                        Icon
                                                    }
                                                />

                                                <span className="text-sm font-bold text-[#172033]">
                                                    {
                                                        item.label
                                                    }
                                                </span>

                                            </div>

                                            <p className="text-3xl font-bold leading-none">
                                                {loading
                                                    ? "..."
                                                    : item.value}
                                            </p>

                                            <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">

                                                <ArrowUp
                                                    size={
                                                        12
                                                    }
                                                />

                                                0%

                                                <span className="font-normal text-slate-400">
                                                    vs last
                                                    month
                                                </span>

                                            </p>

                                        </div>

                                        <div className="flex h-[72px] items-end gap-1.5">

                                            {trend.map(
                                                (
                                                    value,
                                                    index
                                                ) => {

                                                    const isCurrent =
                                                        index ===
                                                        trend.length -
                                                            1;

                                                    return (
                                                        <div
                                                            key={
                                                                index
                                                            }
                                                            className="flex h-full flex-col items-center justify-end gap-1"
                                                        >

                                                            <div
                                                                className={`w-3 rounded-t-sm transition-all duration-500 ${
                                                                    isCurrent
                                                                        ? "bg-[#8b1730]"
                                                                        : "bg-[#f3d9de]"
                                                                }`}
                                                                style={{
                                                                    height: `${Math.max(
                                                                        (value /
                                                                            maxTrend) *
                                                                            52,
                                                                        4
                                                                    )}px`,
                                                                }}
                                                            />

                                                            <span className="text-[9px] font-medium text-slate-400">
                                                                {
                                                                    trendMonths[
                                                                        index
                                                                    ]
                                                                }
                                                            </span>

                                                        </div>
                                                    );
                                                }
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        }
                    )}

                </section>

                {/* =========================================
                    MAIN GRID
                ========================================= */}

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">

                    {/* LEFT */}

                    <div className="space-y-5 xl:col-span-8">

                        {/* RECENT VISITS */}

                        <section className="rounded-2xl border border-[#eee8e8] bg-white p-5 shadow-sm">

                            <SectionHeader
                                icon={
                                    CalendarDays
                                }
                                title="Recent Clinic Visits"
                                subtitle="Latest patient consultations"
                                link="/clinic-visits"
                            />

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[650px]">

                                    <thead>

                                        <tr className="bg-[#fcf8f9] text-left">

                                            {[
                                                "Date",
                                                "Student",
                                                "Reason",
                                                "Time",
                                                "Status",
                                            ].map(
                                                (
                                                    x
                                                ) => (
                                                    <th
                                                        key={
                                                            x
                                                        }
                                                        className="px-3 py-3 text-xs font-semibold text-slate-500"
                                                    >
                                                        {
                                                            x
                                                        }
                                                    </th>
                                                )
                                            )}

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {recentVisits.length ? (
                                            recentVisits.map(
                                                (
                                                    visit
                                                ) => (
                                                    <tr
                                                        key={
                                                            visit.id
                                                        }
                                                        className="border-b border-gray-100 hover:bg-[#fdfafb]"
                                                    >

                                                        <td className="px-3 py-4 text-sm text-slate-600">
                                                            {formatDate(
                                                                visit.visit_date
                                                            )}
                                                        </td>

                                                        <td className="px-3 py-4 text-sm font-semibold">
                                                            {getName(
                                                                visit.student
                                                            )}
                                                        </td>

                                                        <td className="px-3 py-4">

                                                            <div className="flex items-center gap-2">

                                                                <div className="h-2 w-20 rounded-full bg-[#f0e8eb]">

                                                                    <div
                                                                        className="h-2 rounded-full bg-[#8b1730]"
                                                                        style={{
                                                                            width: `${
                                                                                ((reasons.find(
                                                                                    (
                                                                                        r
                                                                                    ) =>
                                                                                        r.label ===
                                                                                        (visit.reason ||
                                                                                            "Other")
                                                                                )?.value ||
                                                                                    1) /
                                                                                    maxReason) *
                                                                                100
                                                                            }%`,
                                                                        }}
                                                                    />

                                                                </div>

                                                                <span className="text-xs text-slate-600">
                                                                    {visit.reason ||
                                                                        "Other"}
                                                                </span>

                                                            </div>

                                                        </td>

                                                        <td className="px-3 py-4 text-sm text-slate-600">
                                                            {formatTime(
                                                                visit.visit_date
                                                            )}
                                                        </td>

                                                        <td className="px-3 py-4">

                                                            <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f7ef] px-2.5 py-1 text-xs font-semibold text-[#16834b]">

                                                                <CheckCircle2
                                                                    size={
                                                                        13
                                                                    }
                                                                />

                                                                Recorded

                                                            </span>

                                                        </td>

                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="py-10 text-center text-sm text-slate-400"
                                                >
                                                    No clinic visits
                                                    found.
                                                </td>

                                            </tr>
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </section>

                        {/* LOWER */}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* QUICK ACTIONS */}

                            <section className="rounded-2xl border border-[#eee8e8] bg-white p-5 shadow-sm">

                                <SectionHeader
                                    icon={
                                        Activity
                                    }
                                    title="Quick Actions"
                                    subtitle="Frequently used clinic functions"
                                />

                                <div className="grid grid-cols-2 gap-3">

                                    <QuickAction
                                        to="/students"
                                        icon={
                                            UserPlus
                                        }
                                        title="Register Student"
                                    />

                                    <QuickAction
                                        to="/clinic-visits"
                                        icon={
                                            Stethoscope
                                        }
                                        title="New Clinic Visit"
                                    />

                                    <QuickAction
                                        to="/medical-records"
                                        icon={
                                            FileText
                                        }
                                        title="Medical Record"
                                    />

                                    <QuickAction
                                        to="/reports"
                                        icon={
                                            ClipboardList
                                        }
                                        title="View Reports"
                                    />

                                </div>

                            </section>

                            {/* RECENT STUDENTS */}

                            <section className="rounded-2xl border border-[#eee8e8] bg-white p-5 shadow-sm">

                                <SectionHeader
                                    icon={
                                        Users
                                    }
                                    title="Recent Students"
                                    subtitle="Recently registered students"
                                    link="/students"
                                />

                                {students
                                    .slice(
                                        0,
                                        5
                                    )
                                    .map(
                                        (
                                            student
                                        ) => (
                                            <div
                                                key={
                                                    student.id
                                                }
                                                className="flex items-center justify-between rounded-xl px-2 py-3 hover:bg-[#fdf7f8]"
                                            >

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7e5e8] text-[#800020]">
                                                        <UserRound
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    </div>

                                                    <div>

                                                        <p className="text-sm font-semibold">
                                                            {getName(
                                                                student
                                                            )}
                                                        </p>

                                                        <p className="text-xs text-slate-400">
                                                            ID:{" "}
                                                            {student.student_id ||
                                                                student.id}
                                                        </p>

                                                    </div>

                                                </div>

                                                <ChevronRight
                                                    size={
                                                        17
                                                    }
                                                    className="text-slate-400"
                                                />

                                            </div>
                                        )
                                    )}

                            </section>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="space-y-5 xl:col-span-4">

                        {/* SEARCH */}

                        <section className="rounded-2xl border border-[#eee8e8] bg-white p-5 shadow-sm">

                            <SectionHeader
                                icon={
                                    Search
                                }
                                title="Student Search"
                                subtitle="Search registered students"
                            />

                            <div className="relative">

                                <Search
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    value={
                                        search
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setSearch(
                                            e
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Search by name or ID..."
                                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/5"
                                />

                                {/* SEARCH RESULTS */}

                                {search && (
                                    <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border bg-white shadow-xl">

                                        {filteredStudents.length ? (
                                            filteredStudents.map(
                                                (
                                                    student
                                                ) => (
                                                    <Link
                                                        key={
                                                            student.id
                                                        }
                                                        to="/students"
                                                        onClick={() =>
                                                            setSearch(
                                                                ""
                                                            )
                                                        }
                                                        className="flex items-center gap-3 border-b px-4 py-3 hover:bg-[#fdf7f8]"
                                                    >

                                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7e5e8] text-[#800020]">
                                                            <UserRound
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        </div>

                                                        <div>

                                                            <p className="text-sm font-semibold">
                                                                {getName(
                                                                    student
                                                                )}
                                                            </p>

                                                            <p className="text-xs text-slate-400">
                                                                ID:{" "}
                                                                {student.student_id ||
                                                                    student.id}
                                                            </p>

                                                        </div>

                                                    </Link>
                                                )
                                            )
                                        ) : (
                                            <p className="px-4 py-5 text-center text-sm text-slate-400">
                                                No student found.
                                            </p>
                                        )}

                                    </div>
                                )}

                            </div>

                        </section>

                        {/* GENDER CHART */}

                        <section className="rounded-2xl border border-[#eee8e8] bg-white p-5 shadow-sm">

                            <SectionHeader
                                icon={
                                    Users
                                }
                                title="Student Statistics"
                                subtitle="Registered students by gender"
                            />

                            <div className="flex h-[210px] items-end justify-around border-b border-gray-200 px-10">

                                {gender.map(
                                    (
                                        item
                                    ) => {

                                        const height =
                                            (item.value /
                                                maxGender) *
                                            160;

                                        return (
                                            <div
                                                key={
                                                    item.label
                                                }
                                                className="flex h-full flex-1 flex-col items-center justify-end"
                                            >

                                                <span className="mb-2 text-sm font-bold">
                                                    {
                                                        item.value
                                                    }
                                                </span>

                                                <div
                                                    className="w-14 rounded-t-lg bg-[#8b1730] transition-all duration-500"
                                                    style={{
                                                        height: `${Math.max(
                                                            height,
                                                            item.value
                                                                ? 15
                                                                : 5
                                                        )}px`,
                                                    }}
                                                />

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                            <div className="flex justify-around pt-3">

                                {gender.map(
                                    (
                                        item
                                    ) => (
                                        <div
                                            key={
                                                item.label
                                            }
                                            className="flex-1 text-center"
                                        >

                                            <p className="text-xs font-semibold">
                                                {
                                                    item.label
                                                }
                                            </p>

                                            <p className="mt-1 text-[11px] text-slate-400">
                                                {totalStudents
                                                    ? Math.round(
                                                          (item.value /
                                                              totalStudents) *
                                                              100
                                                      )
                                                    : 0}
                                                %
                                            </p>

                                        </div>
                                    )
                                )}

                            </div>

                        </section>

                        {/* REASON CHART */}

                        <section className="rounded-2xl border border-[#eee8e8] bg-white p-5 shadow-sm">

                            <SectionHeader
                                icon={
                                    Activity
                                }
                                title="Clinic Visit Reasons"
                                subtitle="Most common consultation reasons"
                            />

                            {reasons.length ? (
                                <div className="space-y-4">

                                    {reasons.map(
                                        (
                                            item
                                        ) => (
                                            <div
                                                key={
                                                    item.label
                                                }
                                            >

                                                <div className="mb-1.5 flex justify-between">

                                                    <span className="text-xs font-medium text-slate-600">
                                                        {
                                                            item.label
                                                        }
                                                    </span>

                                                    <span className="text-xs font-bold">
                                                        {
                                                            item.value
                                                        }
                                                    </span>

                                                </div>

                                                <div className="h-3 rounded-full bg-gray-100">

                                                    <div
                                                        className="h-3 rounded-full bg-[#8b1730] transition-all duration-500"
                                                        style={{
                                                            width: `${
                                                                (item.value /
                                                                    maxReason) *
                                                                100
                                                            }%`,
                                                        }}
                                                    />

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>
                            ) : (
                                <p className="py-10 text-center text-sm text-slate-400">
                                    No clinic reason data
                                    available.
                                </p>
                            )}

                        </section>

                        {/* RECENT ACTIVITY */}

                        <section className="rounded-2xl border border-[#eee8e8] bg-white p-5 shadow-sm">

                            <SectionHeader
                                icon={
                                    Activity
                                }
                                title="Recent Activity"
                                subtitle="Latest system activity"
                            />

                            <div className="space-y-5">

                                <ActivityItem
                                    icon={
                                        UserPlus
                                    }
                                    title="Student Records"
                                    description={`${totalStudents} registered students`}
                                    color="bg-[#e8f7ef] text-[#16834b]"
                                />

                                <ActivityItem
                                    icon={
                                        Stethoscope
                                    }
                                    title="Clinic Visits"
                                    description={`${totalVisits} recorded clinic visits`}
                                    color="bg-[#f7e5e8] text-[#800020]"
                                />

                                <ActivityItem
                                    icon={
                                        FileText
                                    }
                                    title="Medical Records"
                                    description={`${totalRecords} medical records available`}
                                    color="bg-[#f6e6f1] text-[#9b1671]"
                                />

                            </div>

                        </section>

                        {/* BETTER CARE */}

                        <section className="rounded-2xl bg-gradient-to-br from-[#8b1730] to-[#5f0b1d] p-5 text-white shadow-lg">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                                    <HeartPulse
                                        size={26}
                                    />
                                </div>

                                <div>

                                    <h3 className="text-sm font-bold">
                                        Better Care
                                    </h3>

                                    <p className="mt-1 text-xs text-red-100">
                                        Healthier Tomorrow
                                    </p>

                                </div>

                            </div>

                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
}

/* =========================================
   ICON BOX
========================================= */

function IconBox({ icon: Icon }) {
    return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7e5e8] text-[#800020]">
            <Icon size={18} />
        </div>
    );
}

/* =========================================
   SECTION HEADER
========================================= */

function SectionHeader({
    icon,
    title,
    subtitle,
    link,
}) {
    const Icon = icon;

    return (
        <div className="mb-5 flex items-start justify-between">

            <div className="flex items-start gap-3">

                <IconBox icon={Icon} />

                <div>

                    <h2 className="text-[17px] font-bold">
                        {title}
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                        {subtitle}
                    </p>

                </div>

            </div>

            {link && (
                <Link
                    to={link}
                    className="text-xs font-bold text-[#800020] hover:underline"
                >
                    View all →
                </Link>
            )}

        </div>
    );
}

/* =========================================
   QUICK ACTION
========================================= */

function QuickAction({
    to,
    icon,
    title,
}) {
    const Icon = icon;

    return (
        <Link
            to={to}
            className="group flex min-h-[94px] flex-col items-center justify-center rounded-xl border border-[#f0e8ea] bg-[#fcfafb] p-3 text-center hover:border-[#dcb6bf] hover:bg-[#fff8fa]"
        >

            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#f7e5e8] text-[#800020] group-hover:bg-[#800020] group-hover:text-white">

                <Icon size={19} />

            </div>

            <p className="text-xs font-semibold text-slate-700">
                {title}
            </p>

        </Link>
    );
}

/* =========================================
   ACTIVITY ITEM
========================================= */

function ActivityItem({
    icon,
    title,
    description,
    color,
}) {
    const Icon = icon;

    return (
        <div className="flex items-center gap-3">

            <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}
            >
                <Icon size={17} />
            </div>

            <div>

                <p className="text-sm font-semibold">
                    {title}
                </p>

                <p className="text-xs text-slate-500">
                    {description}
                </p>

            </div>

        </div>
    );
}

export default Dashboard;