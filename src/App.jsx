import React, { useState, useMemo, useEffect } from "react"
import { Analytics } from "@vercel/analytics/react"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList,
    ComposedChart,
} from "recharts"
import { TrendingUp, DollarSign, Calendar, BarChart3, Lock } from "lucide-react"
import LogoImage from "./assets/Logo.png"

const AuthScreen = ({ onAuthenticate }) => {
    const [pin, setPin] = useState("")
    const [error, setError] = useState("")
    const correctPin = "20202025" // Ganti dengan PIN yang diinginkan

    const handleSubmit = (e) => {
        e.preventDefault()
        if (pin === correctPin) {
            localStorage.setItem("authenticated", "true")
            onAuthenticate(true)
        } else {
            setError("PIN tidak valid. Silakan coba lagi.")
            setTimeout(() => setError(""), 3000)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-orange-200 p-8 w-full max-w-md hover:shadow-3xl transition-all duration-300">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center h-24 w-48 mb-4">
                        <img src={LogoImage} alt="Logo" />
                    </div>
                    <h1 className="text-2xl font-bold text-orange-800 mb-2">
                        Autentikasi Diperlukan
                    </h1>
                    <p className="text-sm text-orange-700">
                        Masukkan PIN untuk mengakses dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <div className="flex items-center border-2 border-orange-200 rounded-xl p-3 focus-within:border-orange-500 transition-all duration-200">
                            <Lock className="h-5 w-5 text-orange-500 mr-3" />
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="Masukkan PIN"
                                className="flex-1 outline-none bg-transparent text-orange-800 placeholder-orange-300"
                                maxLength={10}
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    )
}

const TaxRevenueDashboard = ({ onLogout }) => {
    const [selectedChart, setSelectedChart] = useState("line")
    const [selectedMetric, setSelectedMetric] = useState("PENDAPATAN PAD")
    const [showTargetChart, setShowTargetChart] = useState(true)

    const handleLogout = () => {
        localStorage.removeItem("authenticated")
        localStorage.removeItem("loginTime")
        if (onLogout) onLogout(false)
    }

    // Raw data from the table
    const rawData = [
        {
            category: "PENDAPATAN PAD",
            2020: 115883015209.26,
            2021: 136116512374.23,
            2022: 129154937419.75,
            2023: 146699501670.14,
            2024: 441709437495,
            2025: 177378511263,
        },
        {
            category: "PENDAPATAN PAJAK",
            2020: 41280421942.33,
            2021: 56732890308.4,
            2022: 64719735158.35,
            2023: 69895966472,
            2024: 68421168580,
            2025: 91339071465,
        },
        {
            category: "Pajak Reklame",
            2020: 1294868951,
            2021: 1814954409,
            2022: 1919828959,
            2023: 1913609655,
            2024: 2156625140,
            2025: 885679939,
        },
        {
            category: "Pajak Air Tanah",
            2020: 843121774,
            2021: 841279881,
            2022: 1012700833,
            2023: 835997454,
            2024: 697867198,
            2025: 785787444,
        },
        {
            category: "Pajak Sarang Burung Walet",
            2020: 69379500,
            2021: 68285000,
            2022: 52792000,
            2023: 64125000,
            2024: 129781500,
            2025: 41635000,
        },
        {
            category: "Pajak Mineral Bukan Logam dan Batuan Lainnya",
            2020: 9195000,
            2021: 284510920,
            2022: 1159335420,
            2023: 697370281,
            2024: 1675660506,
            2025: 1952731440,
        },
        {
            category:
                "Pajak Bumi Dan Bangunan Perdesaan dan Perkotaan (PBB-P2)",
            2020: 4597893677,
            2021: 4697260236,
            2022: 7186195995,
            2023: 8713053509,
            2024: 9127424031,
            2025: 8251619770,
        },
        {
            category: "Pajak Bea Perolehan Hak Atas Tanah dan Bangunan / BPHTB",
            2020: 2276973772,
            2021: 3799354646,
            2022: 10858456459,
            2023: 12520343893,
            2024: 3790939396,
            2025: 4027020814,
        },
        {
            category: "PBJT Makan atau minum",
            2020: 4506757184.05,
            2021: 4050510061,
            2022: 6285602900,
            2023: 5200103304,
            2024: 6576426115,
            2025: 3390815088,
        },
        {
            category: "PBJT Tenaga Listrik",
            2020: 26345662127.28,
            2021: 39892201889.4,
            2022: 33470304870.35,
            2023: 36631115716,
            2024: 40352216576,
            2025: 27465390963,
        },
        {
            category: "PBJT Perhotelan",
            2020: 992173747,
            2021: 842545295,
            2022: 1310443617,
            2023: 1398745560,
            2024: 1758307990,
            2025: 1193935931,
        },
        {
            category: "PBJT Parkir",
            2020: 89535600,
            2021: 197236277,
            2022: 830943304,
            2023: 1144664074,
            2024: 851883864,
            2025: 574942534,
        },
        {
            category: "PBJT Kesenian dan Hiburan",
            2020: 254860610,
            2021: 244751694,
            2022: 633130801,
            2023: 776838026,
            2024: 1304036264,
            2025: 989961439,
        },
        {
            category: "Opsen Pajak Kendaraan Bermotor (PKB)",
            2020: 0,
            2021: 0,
            2022: 0,
            2023: 0,
            2024: 0,
            2025: 22826957667,
        },
        {
            category: "Opsen Bea Balik Nama Kendaraan Bermotor (BBNKB)",
            2020: 0,
            2021: 0,
            2022: 0,
            2023: 0,
            2024: 0,
            2025: 18952593436,
        },
    ]

    // Target data for each year
    const targetData = [
        {
            category: "PENDAPATAN PAD",
            2020: 122137870259,
            2021: 144573706721,
            2022: 194854000000,
            2023: 203034060000,
            2024: 515551776913,
            2025: 338766400466,
        },
        {
            category: "PENDAPATAN PAJAK",
            2020: 42660000000,
            2021: 56610000000,
            2022: 92410000000,
            2023: 93510000000,
            2024: 93510000000,
            2025: 134811988432,
        },
        {
            category: "Pajak Reklame",
            2020: 1000000000,
            2021: 1250000000,
            2022: 2000000000,
            2023: 2000000000,
            2024: 1913609655,
            2025: 1716189000,
        },
        {
            category: "Pajak Air Tanah",
            2020: 700000000,
            2021: 1100000000,
            2022: 24000000000,
            2023: 16640000000,
            2024: 16640000000,
            2025: 900000000,
        },
        {
            category: "Pajak Sarang Burung Walet",
            2020: 75000000,
            2021: 75000000,
            2022: 500000000,
            2023: 1000000000,
            2024: 400000000,
            2025: 400000000,
        },
        {
            category: "Pajak Mineral Bukan Logam dan Batuan Lainnya",
            2020: 150000000,
            2021: 250000000,
            2022: 1200000000,
            2023: 1500000000,
            2024: 1500000000,
            2025: 1500000000,
        },
        {
            category:
                "Pajak Bumi Dan Bangunan Perdesaan dan Perkotaan (PBB-P2)",
            2020: 8000000000,
            2021: 13555000000,
            2022: 16785000000,
            2023: 16785000000,
            2024: 9564575588,
            2025: 10564575588,
        },
        {
            category: "Pajak Bea Perolehan Hak Atas Tanah dan Bangunan / BPHTB",
            2020: 2000000000,
            2021: 4600000000,
            2022: 8100000000,
            2023: 15000000000,
            2024: 15000000000,
            2025: 6197420655,
        },
        {
            category: "PBJT Makan atau minum",
            2020: 2725000000,
            2021: 3295000000,
            2022: 4325000000,
            2023: 4500000000,
            2024: 5400000000,
            2025: 6500000000,
        },
        {
            category: "PBJT Tenaga Listrik",
            2020: 27000000000,
            2021: 31000000000,
            2022: 33000000000,
            2023: 33000000000,
            2024: 39451955582,
            2025: 39451955582,
        },
        {
            category: "PBJT Perhotelan",
            2020: 760000000,
            2021: 1060000000,
            2022: 1200000000,
            2023: 1085000000,
            2024: 1611500000,
            2025: 1611500000,
        },
        {
            category: "PBJT Parkir",
            2020: 100000000,
            2021: 175000000,
            2022: 600000000,
            2023: 1000000000,
            2024: 800000000,
            2025: 800000000,
        },
        {
            category: "PBJT Kesenian dan Hiburan",
            2020: 150000000,
            2021: 250000000,
            2022: 700000000,
            2023: 1000000000,
            2024: 1228359175,
            2025: 1228359175,
        },
        {
            category: "Opsen Pajak Kendaraan Bermotor (PKB)",
            2020: 0,
            2021: 0,
            2022: 0,
            2023: 0,
            2024: 0,
            2025: 36104368986,
        },
        {
            category: "Opsen Bea Balik Nama Kendaraan Bermotor (BBNKB)",
            2020: 0,
            2021: 0,
            2022: 0,
            2023: 0,
            2024: 0,
            2025: 27837619446,
        },
    ]

    // Transform data for charts
    const chartData = useMemo(() => {
        const years = [2020, 2021, 2022, 2023, 2024, 2025]
        return years.map((year) => {
            const yearData = {
                year:
                    year === 2025 ? "2025 (s/d 10 September)" : year.toString(),
            }
            rawData.forEach((item) => {
                yearData[item.category] = item[year] / 1000000000 // Convert to billions
            })
            // Add target data with a suffix to distinguish from actual data
            targetData.forEach((item) => {
                yearData[`${item.category} (Target)`] = item[year] / 1000000000 // Convert to billions
            })
            return yearData
        })
    }, [])

    // Calculate totals for each year
    const totalData = useMemo(() => {
        return chartData.map((yearData) => {
            const total = Object.keys(yearData)
                .filter((key) => key !== "year")
                .reduce((sum, key) => sum + (yearData[key] || 0), 0)
            return {
                year: yearData.year,
                total: total,
            }
        })
    }, [chartData])

    // Get filtered data based on selected metric
    const getFilteredData = () => {
        return chartData.map((item) => ({
            year: item.year,
            [selectedMetric]: item[selectedMetric],
            [`${selectedMetric}_bar`]: item[selectedMetric], // Duplicate data with different key for bar
            [`${selectedMetric} (Target)`]: item[`${selectedMetric} (Target)`], // Add target data
            [`${selectedMetric} (Target)_bar`]:
                item[`${selectedMetric} (Target)`], // Duplicate target data for bar
        }))
    }

    const filteredData = getFilteredData()

    // Warm orange color palette
    const colors = [
        "#ea580c",
        "#fb923c",
        "#fdba74",
        "#fed7aa",
        "#fff7ed",
        "#dc2626",
        "#f97316",
        "#fbbf24",
        "#facc15",
        "#eab308",
        "#d97706",
        "#f59e0b",
        "#fcd34d",
    ]

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value * 1000000000)
    }

    const formatCurrencyForLabel = (value) => {
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value * 1000000000)
    }

    // Calculate percentage change from previous year
    const calculatePercentageChange = (currentValue, previousValue) => {
        if (!previousValue || previousValue === 0) return null
        const change = ((currentValue - previousValue) / previousValue) * 100
        return change
    }

    // Custom Label Component for Bar Chart
    const CustomBarLabel = (props) => {
        const { x, y, width, height, value, index, dataKey } = props
        if (!value) return null

        const radius = 8
        // Determine if this is a target data point
        const isTarget = dataKey && dataKey.includes("Target")

        // Adjust position based on whether it's target or actual data
        // Target labels will be positioned higher than actual labels
        // Reduced offset values to prevent labels from being cut off
        const labelYOffset = isTarget ? 65 : 35 // Reduced from 90/50
        const labelY = y - labelYOffset
        const labelX = x + width / 2
        const formattedValue = formatCurrencyForLabel(value)
        const textWidth = formattedValue.length * 5.5
        const rectWidth = Math.max(100, textWidth + 15)

        // Get percentage change for bar chart
        let percentageChange = null
        if (index > 0 && filteredData[index - 1]) {
            // Find the current data key being displayed
            const currentData = filteredData[index]
            const previousData = filteredData[index - 1]

            // For single metric display, use the selected metric
            if (dataKey) {
                percentageChange = calculatePercentageChange(
                    currentData[dataKey],
                    previousData[dataKey]
                )
            }
        }

        // Adjust colors based on data type
        const fillColor = isTarget ? "#eff6ff" : "#fff7ed"
        const strokeColor = isTarget ? "#2563eb" : "#f97316"
        const textColor = isTarget ? "#1e40af" : "#9a3412"

        return (
            <g>
                <rect
                    x={labelX - rectWidth / 2}
                    y={labelY}
                    width={rectWidth}
                    height={percentageChange !== null ? 35 : 22}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={1}
                    rx={radius}
                    ry={radius}
                    opacity={0.95}
                />
                <text
                    x={labelX}
                    y={labelY + (percentageChange !== null ? 11 : 14)}
                    fill={textColor}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fontWeight="bold"
                >
                    {formattedValue}
                </text>
                {percentageChange !== null && (
                    <text
                        x={labelX}
                        y={labelY + 26}
                        fill={percentageChange >= 0 ? "#16a34a" : "#dc2626"}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="11"
                        fontWeight="bold"
                    >
                        {percentageChange >= 0 ? "↗" : "↘"}{" "}
                        {Math.abs(percentageChange).toFixed(1)}%
                    </text>
                )}
            </g>
        )
    }

    // Custom Label Component for data points (Line Chart)
    const CustomDataLabel = ({
        x,
        y,
        width,
        height,
        value,
        index,
        payload,
        dataKey,
    }) => {
        const radius = 8

        // Determine if this is a target data point
        const isTarget = dataKey && dataKey.includes("Target")

        // Adjust position based on whether it's target or actual data
        // Target labels will be positioned higher than actual labels
        // Reduced offset values to prevent labels from being cut off
        const labelYOffset = isTarget ? 60 : 30 // Reduced from 80/40
        const labelY = y - labelYOffset
        const labelX = x
        const formattedValue = formatCurrencyForLabel(value)
        const textWidth = formattedValue.length * 5.5
        const rectWidth = Math.max(100, textWidth + 15)

        // Get percentage change
        let percentageChange = null
        if (index > 0 && filteredData[index - 1]) {
            const dataKeyToUse =
                dataKey ||
                Object.keys(payload).find(
                    (key) => key !== "year" && payload[key] === value
                )
            if (dataKeyToUse && filteredData[index - 1][dataKeyToUse]) {
                percentageChange = calculatePercentageChange(
                    value,
                    filteredData[index - 1][dataKeyToUse]
                )
            }
        }

        // Adjust colors based on data type
        const fillColor = isTarget ? "#eff6ff" : "#fff7ed"
        const strokeColor = isTarget ? "#2563eb" : "#f97316"
        const textColor = isTarget ? "#1e40af" : "#9a3412"

        return (
            <g>
                <rect
                    x={labelX - rectWidth / 2}
                    y={labelY}
                    width={rectWidth}
                    height={percentageChange !== null ? 35 : 22}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={1}
                    rx={radius}
                    ry={radius}
                    opacity={0.95}
                />
                <text
                    x={labelX}
                    y={labelY + (percentageChange !== null ? 11 : 14)}
                    fill={textColor}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fontWeight="bold"
                >
                    {formattedValue}
                </text>
                {percentageChange !== null && (
                    <text
                        x={labelX}
                        y={labelY + 26}
                        fill={percentageChange >= 0 ? "#16a34a" : "#dc2626"}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="11"
                        fontWeight="bold"
                    >
                        {percentageChange >= 0 ? "↗" : "↘"}{" "}
                        {Math.abs(percentageChange).toFixed(1)}%
                    </text>
                )}
            </g>
        )
    }

    // Custom Dot component for Line Chart
    const CustomDot = (props) => {
        const { cx, cy, payload, dataKey, value, index } = props
        if (!value) return null

        const formattedValue = formatCurrencyForLabel(value)
        const textWidth = formattedValue.length * 5.5
        const rectWidth = Math.max(100, textWidth + 15)

        // Get percentage change
        let percentageChange = null
        if (
            index > 0 &&
            filteredData[index - 1] &&
            filteredData[index - 1][dataKey]
        ) {
            percentageChange = calculatePercentageChange(
                value,
                filteredData[index - 1][dataKey]
            )
        }

        // Determine if this is a target data point
        const isTarget = dataKey && dataKey.includes("Target")

        // Adjust position based on whether it's target or actual data
        // Target labels will be positioned above, actual labels below
        // Reduced offset values to prevent labels from being cut off
        const labelYOffset = isTarget
            ? percentageChange !== null
                ? 65
                : 50 // Target labels positioned higher (reduced from 90/70)
            : percentageChange !== null
            ? 35
            : 25 // Actual labels positioned lower (reduced from 50/33)

        // Adjust circle color based on data type
        const circleColor = isTarget ? "#2563eb" : "#ea580c"
        const strokeColor = isTarget ? "#2563eb" : "#f97316"
        const textColor = isTarget ? "#1e40af" : "#9a3412"

        return (
            <g>
                <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={circleColor}
                    stroke="#fff"
                    strokeWidth={2}
                />
                <rect
                    x={cx - rectWidth / 2}
                    y={cy - labelYOffset}
                    width={rectWidth}
                    height={percentageChange !== null ? 35 : 22}
                    fill={isTarget ? "#eff6ff" : "#fff7ed"}
                    stroke={strokeColor}
                    strokeWidth={1}
                    rx={8}
                    ry={8}
                    opacity={0.95}
                />
                <text
                    x={cx}
                    y={
                        cy -
                        labelYOffset +
                        (percentageChange !== null ? 14 : 13)
                    }
                    fill={textColor}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fontWeight="bold"
                >
                    {formattedValue}
                </text>
                {percentageChange !== null && (
                    <text
                        x={cx}
                        y={cy - labelYOffset + 28}
                        fill={percentageChange >= 0 ? "#16a34a" : "#dc2626"}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="11"
                        fontWeight="bold"
                    >
                        {percentageChange >= 0 ? "↗" : "↘"}{" "}
                        {Math.abs(percentageChange).toFixed(1)}%
                    </text>
                )}
            </g>
        )
    }

    const formatTooltipValue = (value, name) => {
        if (typeof value === "number") {
            return [formatCurrency(value), name]
        }
        return [value, name]
    }

    // Custom formatter for composed chart to avoid duplicate data
    const formatComposedTooltipValue = (value, name, props) => {
        // Only show data for the line, hide bar data
        if (name.includes("_bar")) {
            return [null, null] // Hide bar data from tooltip
        }
        if (typeof value === "number") {
            return [formatCurrency(value), selectedMetric]
        }
        return [value, selectedMetric]
    }

    const renderChart = () => {
        const commonProps = {
            data: filteredData,
            margin: { top: 90, right: 80, left: 20, bottom: 60 }, // Increased top margin from 70 to 90
        }

        switch (selectedChart) {
            case "line":
                return (
                    <LineChart {...commonProps}>
                        <defs>
                            <linearGradient
                                id="gridGradient"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#f97316"
                                    stopOpacity={0.1}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#ea580c"
                                    stopOpacity={0.05}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#fed7aa"
                            strokeOpacity={0.3}
                        />
                        <XAxis
                            dataKey="year"
                            tick={{
                                fill: "#9a3412",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                            axisLine={{ stroke: "#f97316" }}
                        />
                        <YAxis
                            label={{
                                value: "Miliar IDR",
                                angle: -90,
                                position: "insideLeft",
                                style: {
                                    textAnchor: "middle",
                                    fill: "#9a3412",
                                    fontWeight: 500,
                                },
                            }}
                            tick={{ fill: "#9a3412", fontSize: 12 }}
                            axisLine={{ stroke: "#f97316" }}
                        />
                        <Tooltip
                            formatter={formatComposedTooltipValue}
                            contentStyle={{
                                backgroundColor: "#fff7ed",
                                border: "2px solid #f97316",
                                borderRadius: "12px",
                                boxShadow:
                                    "0 10px 25px rgba(249, 115, 22, 0.15)",
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey={selectedMetric}
                            stroke="#ea580c"
                            strokeWidth={4}
                            dot={<CustomDot />}
                            name={selectedMetric}
                        />
                        {showTargetChart && (
                            <Line
                                type="monotone"
                                dataKey={`${selectedMetric} (Target)`}
                                stroke="#2563eb"
                                strokeWidth={4}
                                strokeDasharray="5 5"
                                dot={<CustomDot />}
                                name={`${selectedMetric} (Target)`}
                            />
                        )}
                    </LineChart>
                )

            case "bar":
                return (
                    <BarChart {...commonProps}>
                        <defs>
                            <linearGradient
                                id="barGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop offset="0%" stopColor="#f97316" />
                                <stop offset="100%" stopColor="#ea580c" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#fed7aa"
                            strokeOpacity={0.3}
                        />
                        <XAxis
                            dataKey="year"
                            tick={{
                                fill: "#9a3412",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                            axisLine={{ stroke: "#f97316" }}
                        />
                        <YAxis
                            label={{
                                value: "Miliar IDR",
                                angle: -90,
                                position: "insideLeft",
                                style: {
                                    textAnchor: "middle",
                                    fill: "#9a3412",
                                    fontWeight: 500,
                                },
                            }}
                            tick={{ fill: "#9a3412", fontSize: 12 }}
                            axisLine={{ stroke: "#f97316" }}
                        />
                        <Tooltip
                            formatter={formatTooltipValue}
                            contentStyle={{
                                backgroundColor: "#fff7ed",
                                border: "2px solid #f97316",
                                borderRadius: "12px",
                                boxShadow:
                                    "0 10px 25px rgba(249, 115, 22, 0.15)",
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey={selectedMetric}
                            fill="url(#barGradient)"
                            radius={[4, 4, 0, 0]}
                            name={selectedMetric}
                        >
                            <LabelList
                                dataKey={selectedMetric}
                                content={CustomBarLabel}
                            />
                        </Bar>
                        {showTargetChart && (
                            <Bar
                                dataKey={`${selectedMetric} (Target)`}
                                fill="#2563eb"
                                radius={[4, 4, 0, 0]}
                                name={`${selectedMetric} (Target)`}
                            >
                                <LabelList
                                    dataKey={`${selectedMetric} (Target)`}
                                    content={CustomBarLabel}
                                />
                            </Bar>
                        )}
                    </BarChart>
                )

            case "composed":
                return (
                    <ComposedChart {...commonProps}>
                        <defs>
                            <linearGradient
                                id="barGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop offset="0%" stopColor="#f97316" />
                                <stop offset="100%" stopColor="#ea580c" />
                            </linearGradient>
                            <linearGradient
                                id="gridGradient"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#f97316"
                                    stopOpacity={0.1}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#ea580c"
                                    stopOpacity={0.05}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#fed7aa"
                            strokeOpacity={0.3}
                        />
                        <XAxis
                            dataKey="year"
                            tick={{
                                fill: "#9a3412",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                            axisLine={{ stroke: "#f97316" }}
                        />
                        <YAxis
                            label={{
                                value: "Miliar IDR",
                                angle: -90,
                                position: "insideLeft",
                                style: {
                                    textAnchor: "middle",
                                    fill: "#9a3412",
                                    fontWeight: 500,
                                },
                            }}
                            tick={{ fill: "#9a3412", fontSize: 12 }}
                            axisLine={{ stroke: "#f97316" }}
                        />
                        <Tooltip
                            formatter={formatTooltipValue}
                            contentStyle={{
                                backgroundColor: "#fff7ed",
                                border: "2px solid #f97316",
                                borderRadius: "12px",
                                boxShadow:
                                    "0 10px 25px rgba(249, 115, 22, 0.15)",
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey={`${selectedMetric}`}
                            fill="url(#barGradient)"
                            radius={[4, 4, 0, 0]}
                            fillOpacity={0.7}
                            name={selectedMetric}
                        />
                        {showTargetChart && (
                            <Bar
                                dataKey={`${selectedMetric} (Target)`}
                                fill="#2563eb"
                                radius={[4, 4, 0, 0]}
                                fillOpacity={0.7}
                                name={`${selectedMetric} (Target)`}
                            />
                        )}
                        <Line
                            type="monotone"
                            dataKey={selectedMetric}
                            stroke="#dc2626"
                            strokeWidth={4}
                            dot={<CustomDot />}
                            name={`${selectedMetric} (Aktual)`}
                        />
                        {showTargetChart && (
                            <Line
                                type="monotone"
                                dataKey={`${selectedMetric} (Target)`}
                                stroke="#2563eb"
                                strokeWidth={4}
                                strokeDasharray="5 5"
                                dot={<CustomDot />}
                                name={`${selectedMetric} (Target)`}
                            />
                        )}
                    </ComposedChart>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-3 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8 relative">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center h-32 w-64">
                            {/* <BarChart3 className="h-8 w-8 text-white" /> */}
                            <img src={LogoImage} alt="Logo" />
                        </div>
                        {/* <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-orange-800 mb-4 leading-tight">
                Dashboard Pendapatan Pajak BAPENDA
              </h1> */}
                        <p className="text-sm font-bold md:text-lg text-orange-700 max-w-2xl mx-auto leading-relaxed">
                            Visualisasi Grafik Pendapatan Pajak Badan Pendapatan
                            Daerah Rokan Hilir Tahun 2020-2025.
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium py-2 px-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                    >
                        <Lock className="h-4 w-4 mr-2" />
                        Keluar
                    </button>
                </div>

                {/* Controls */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200 p-6 md:p-8 mb-6 md:mb-8 hover:shadow-2xl transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        <div>
                            <label className="block text-sm font-semibold text-orange-800 mb-3 flex items-center">
                                <BarChart3 className="h-4 w-4 mr-2 text-orange-600" />
                                Jenis Grafik
                            </label>
                            <select
                                value={selectedChart}
                                onChange={(e) =>
                                    setSelectedChart(e.target.value)
                                }
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    border: "2px solid #fed7aa",
                                    borderRadius: "12px",
                                    backgroundColor: "white",
                                    color: "#9a3412",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    transition: "all 0.2s",
                                    outline: "none",
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderColor = "#f97316")
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderColor = "#fed7aa")
                                }
                            >
                                <option value="line">📈 Grafik Garis</option>
                                <option value="bar">📊 Grafik Batang</option>
                                <option value="composed">
                                    📈📊 Grafik Gabungan
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-orange-800 mb-3 flex items-center">
                                <TrendingUp className="h-4 w-4 mr-2 text-orange-600" />
                                Tampilan Data
                            </label>
                            <select
                                value={selectedMetric}
                                onChange={(e) =>
                                    setSelectedMetric(e.target.value)
                                }
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    border: "2px solid #fed7aa",
                                    borderRadius: "12px",
                                    backgroundColor: "white",
                                    color: "#9a3412",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    transition: "all 0.2s",
                                    outline: "none",
                                }}
                                onFocus={(e) =>
                                    (e.target.style.borderColor = "#f97316")
                                }
                                onBlur={(e) =>
                                    (e.target.style.borderColor = "#fed7aa")
                                }
                            >
                                <option value="PENDAPATAN PAD">
                                    💰 PENDAPATAN PAD
                                </option>
                                {rawData.slice(1).map((item) => (
                                    <option
                                        key={item.category}
                                        value={item.category}
                                    >
                                        {item.category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Chart */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-orange-200 p-6 md:p-8 mb-6 md:mb-8 hover:shadow-3xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                            <h2 className="text-xl md:text-3xl font-bold text-orange-800">
                                Tren Pendapatan ({selectedMetric})
                            </h2>
                        </div>
                        <button
                            onClick={() => setShowTargetChart(!showTargetChart)}
                            className="flex items-center justify-center px-4 py-2 bg-white border-2 border-blue-300 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{
                                    backgroundColor: showTargetChart
                                        ? "#2563eb"
                                        : "#e2e8f0",
                                }}
                            ></div>
                            <span className="text-sm font-medium text-blue-800">
                                {showTargetChart
                                    ? "Sembunyikan Target"
                                    : "Tampilkan Target"}
                            </span>
                        </button>
                    </div>
                    <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-xl overflow-hidden relative">
                        <ResponsiveContainer width="100%" height="100%">
                            {renderChart()}
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Data Table - Actual */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-orange-200 overflow-hidden hover:shadow-3xl transition-all duration-300 mb-6 md:mb-8">
                    <div className="px-6 md:px-8 py-6 bg-gradient-to-r from-orange-100 to-amber-100 border-b border-orange-200">
                        <div className="flex items-center">
                            <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                            <h2 className="text-xl md:text-3xl font-bold text-orange-800">
                                Tabel Data Mentah (Aktual)
                            </h2>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-orange-50 to-amber-50">
                                <tr>
                                    <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-bold text-orange-800 uppercase tracking-wider border-b-2 border-orange-200">
                                        Kategori
                                    </th>
                                    {[
                                        2020,
                                        2021,
                                        2022,
                                        2023,
                                        2024,
                                        "2025 ( s/d 10 September)",
                                    ].map((year) => (
                                        <th
                                            key={year}
                                            className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-bold text-orange-800 uppercase tracking-wider border-b-2 border-orange-200"
                                        >
                                            {year}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-100">
                                {rawData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-orange-25"
                                        } hover:bg-orange-50 transition-colors duration-200`}
                                    >
                                        <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-orange-900 break-words">
                                            {row.category}
                                        </td>
                                        {[
                                            2020, 2021, 2022, 2023, 2024, 2025,
                                        ].map((year, yearIndex) => (
                                            <td
                                                key={year}
                                                className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-orange-700 font-medium"
                                            >
                                                {formatCurrency(
                                                    row[year] / 1000000000
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Data Table - Target */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-200 overflow-hidden hover:shadow-3xl transition-all duration-300">
                    <div className="px-6 md:px-8 py-6 bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-200">
                        <div className="flex items-center">
                            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                            <h2 className="text-xl md:text-3xl font-bold text-blue-800">
                                Tabel Data Mentah (Target)
                            </h2>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                <tr>
                                    <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-bold text-blue-800 uppercase tracking-wider border-b-2 border-blue-200">
                                        Kategori
                                    </th>
                                    {[
                                        2020,
                                        2021,
                                        2022,
                                        2023,
                                        2024,
                                        "2025 (Target)",
                                    ].map((year) => (
                                        <th
                                            key={year}
                                            className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-bold text-blue-800 uppercase tracking-wider border-b-2 border-blue-200"
                                        >
                                            {year}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-100">
                                {targetData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-blue-25"
                                        } hover:bg-blue-50 transition-colors duration-200`}
                                    >
                                        <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-blue-900 break-words">
                                            {row.category}
                                        </td>
                                        {[
                                            2020, 2021, 2022, 2023, 2024, 2025,
                                        ].map((year, yearIndex) => (
                                            <td
                                                key={year}
                                                className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-blue-700 font-medium"
                                            >
                                                {formatCurrency(
                                                    row[year] / 1000000000
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-orange-600 text-sm">
                        © 2025 Badan Pendapatan Daerah Kab. Rokan Hilir
                    </p>
                </div>
            </div>
            <Analytics />
        </div>
    )
}

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 menit dalam milidetik

    // Fungsi untuk mengatur timeout otomatis
    const setupSessionTimeout = () => {
        // Simpan waktu login saat ini
        const loginTime = new Date().getTime()
        localStorage.setItem("loginTime", loginTime.toString())

        // Atur timer untuk logout otomatis
        const timeoutId = setTimeout(() => {
            handleSessionTimeout()
        }, SESSION_TIMEOUT)

        // Simpan ID timer untuk dibersihkan nanti jika diperlukan
        return timeoutId
    }

    // Fungsi untuk menangani timeout sesi
    const handleSessionTimeout = () => {
        localStorage.removeItem("authenticated")
        localStorage.removeItem("loginTime")
        setIsAuthenticated(false)
        alert("Sesi Anda telah berakhir. Silakan login kembali.")
    }

    // Fungsi untuk memeriksa apakah sesi masih valid
    const checkSessionValidity = () => {
        const loginTime = localStorage.getItem("loginTime")
        if (loginTime) {
            const currentTime = new Date().getTime()
            const elapsedTime = currentTime - parseInt(loginTime)

            if (elapsedTime > SESSION_TIMEOUT) {
                handleSessionTimeout()
                return false
            }
            return true
        }
        return false
    }

    // Fungsi untuk menangani autentikasi
    const handleAuthenticate = (status) => {
        setIsAuthenticated(status)
        if (status) {
            setupSessionTimeout()
        }
    }

    useEffect(() => {
        // Cek apakah pengguna sudah terotentikasi sebelumnya
        const authStatus = localStorage.getItem("authenticated")

        if (authStatus === "true" && checkSessionValidity()) {
            setIsAuthenticated(true)

            // Reset timer saat halaman dimuat ulang
            const timeoutId = setupSessionTimeout()

            // Bersihkan timer saat komponen unmount
            return () => clearTimeout(timeoutId)
        }
    }, [])

    // Tambahkan event listener untuk aktivitas pengguna
    useEffect(() => {
        if (isAuthenticated) {
            // Fungsi untuk mereset timer saat ada aktivitas
            const resetTimer = () => {
                if (checkSessionValidity()) {
                    // Update waktu login
                    const loginTime = new Date().getTime()
                    localStorage.setItem("loginTime", loginTime.toString())
                }
            }

            // Tambahkan event listener untuk berbagai aktivitas pengguna
            window.addEventListener("mousemove", resetTimer)
            window.addEventListener("keypress", resetTimer)
            window.addEventListener("click", resetTimer)
            window.addEventListener("scroll", resetTimer)

            // Bersihkan event listener saat komponen unmount
            return () => {
                window.removeEventListener("mousemove", resetTimer)
                window.removeEventListener("keypress", resetTimer)
                window.removeEventListener("click", resetTimer)
                window.removeEventListener("scroll", resetTimer)
            }
        }
    }, [isAuthenticated])

    return isAuthenticated ? (
        <TaxRevenueDashboard onLogout={setIsAuthenticated} />
    ) : (
        <AuthScreen onAuthenticate={handleAuthenticate} />
    )
}

export default App
