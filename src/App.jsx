import React, { useState, useMemo } from "react"
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
} from "recharts"
import { TrendingUp, DollarSign, Calendar, BarChart3 } from "lucide-react"

const TaxRevenueDashboard = () => {
    const [selectedChart, setSelectedChart] = useState("line")
    const [selectedMetric, setSelectedMetric] = useState("total")

    // Raw data from the table
    const rawData = [
        {
            category: "PENDAPATAN PAD",
            2020: 115883015209.26,
            2021: 136116512374.23,
            2022: 129154937419.75,
            2023: 146699501670.14,
            2024: 441709437495.0,
            2025: 144711552198.0,
        },
        {
            category: "PENDAPATAN PAJAK",
            2020: 41280421942.33,
            2021: 56732890386.4,
            2022: 64719735156.35,
            2023: 69895966472.0,
            2024: 68421168580.0,
            2025: 58915517679.0,
        },
        {
            category: "Pajak Reklame",
            2020: 1254868951.0,
            2021: 1814954290.0,
            2022: 1993626930.0,
            2023: 1913609555.0,
            2024: 2156625340.0,
            2025: 556673737.0,
        },
        {
            category: "Pajak Air Tanah",
            2020: 843121774.0,
            2021: 841279881.0,
            2022: 1012700833.0,
            2023: 835997454.0,
            2024: 697867198.0,
            2025: 521293734.0,
        },
        {
            category: "Pajak Sarang Burung Walet",
            2020: 69379500.0,
            2021: 68385000.0,
            2022: 52780000.0,
            2023: 64125000.0,
            2024: 129781500.0,
            2025: 26985000.0,
        },
        {
            category: "Pajak Mineral Bukan Logam dan Batuan Lainnya",
            2020: 3195000.0,
            2021: 284510920.0,
            2022: 1159335420.0,
            2023: 697370281.0,
            2024: 1675660506.0,
            2025: 1078737000.0,
        },
        {
            category:
                "Pajak Bumi Dan Bangunan Perdesaan dan Perkotaan (PBB-P2)",
            2020: 4397893677.0,
            2021: 4697260236.0,
            2022: 7186195995.0,
            2023: 8713053509.0,
            2024: 9127424031.0,
            2025: 2485415265.0,
        },
        {
            category: "Pajak Bea Perolehan Hak Atas Tanah dan Bangunan / BPHTB",
            2020: 2276973772.0,
            2021: 3799354646.0,
            2022: 10858456459.0,
            2023: 12520343893.0,
            2024: 3790939396.0,
            2025: 2768738723.0,
        },
        {
            category: "PBJT Makan atau minum",
            2020: 4506757184.05,
            2021: 4050510061.0,
            2022: 6285602900.0,
            2023: 5200103304.0,
            2024: 6576426115.0,
            2025: 1942792277.0,
        },
        {
            category: "PBJT Tenaga Listrik",
            2020: 26345662127.28,
            2021: 35892201889.4,
            2022: 33470304870.35,
            2023: 36631115716.0,
            2024: 40332216576.0,
            2025: 49830150749.0,
        },
        {
            category: "PBJT Perhotelan",
            2020: 992173747.0,
            2021: 842545295.0,
            2022: 1310443617.0,
            2023: 1398745560.0,
            2024: 1758307990.0,
            2025: 798610067.0,
        },
        {
            category: "PBJT Parkir",
            2020: 89535600.0,
            2021: 197236277.0,
            2022: 830943304.0,
            2023: 1144664074.0,
            2024: 851383864.0,
            2025: 388933034.0,
        },
        {
            category: "PBJT Kesenian dan Hiburan",
            2020: 594860609.0,
            2021: 244751694.0,
            2022: 633130801.0,
            2023: 776863026.0,
            2024: 1304036264.0,
            2025: 681924108.0,
        },
        {
            category: "Opsen Pajak Kendaraan Bermotor (PKB)",
            2020: 0,
            2021: 0,
            2022: 0,
            2023: 0,
            2024: 0,
            2025: 15289672000.0,
        },
        {
            category: "Opsen Bea Balik Nama Kendaraan Bermotor (BBNKB)",
            2020: 0,
            2021: 0,
            2022: 0,
            2023: 0,
            2024: 0,
            2025: 12544591985.0,
        },
    ]

    // Transform data for charts
    const chartData = useMemo(() => {
        const years = [2020, 2021, 2022, 2023, 2024, 2025]
        return years.map((year) => {
            const yearData = {
                year: year === 2025 ? "2025 (Sem 1)" : year.toString(),
            }
            rawData.forEach((item) => {
                yearData[item.category] = item[year] / 1000000000 // Convert to billions
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
        if (selectedMetric === "total") return totalData

        return chartData.map((item) => ({
            year: item.year,
            [selectedMetric]: item[selectedMetric],
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
        const { x, y, width, height, value, index } = props
        if (!value) return null

        const radius = 8
        const labelY = y - 50
        const labelX = x + width / 2
        const formattedValue = formatCurrencyForLabel(value)
        const textWidth = formattedValue.length * 4.5
        const rectWidth = Math.max(80, textWidth + 10)

        // Get percentage change for bar chart
        let percentageChange = null
        if (index > 0 && filteredData[index - 1]) {
            // Find the current data key being displayed
            const currentData = filteredData[index]
            const previousData = filteredData[index - 1]

            // For single metric display, use the selected metric
            if (selectedMetric === "total") {
                percentageChange = calculatePercentageChange(
                    currentData.total,
                    previousData.total
                )
            } else if (selectedMetric !== "all") {
                percentageChange = calculatePercentageChange(
                    currentData[selectedMetric],
                    previousData[selectedMetric]
                )
            }
            // For "all" display, we'll show the first category's percentage as example
            else {
                const firstCategory = rawData[0].category
                if (currentData[firstCategory] && previousData[firstCategory]) {
                    percentageChange = calculatePercentageChange(
                        currentData[firstCategory],
                        previousData[firstCategory]
                    )
                }
            }
        }

        return (
            <g>
                <rect
                    x={labelX - rectWidth / 2}
                    y={labelY}
                    width={rectWidth}
                    height={percentageChange !== null ? 30 : 18}
                    fill="#fff7ed"
                    stroke="#f97316"
                    strokeWidth={1}
                    rx={radius}
                    ry={radius}
                    opacity={0.95}
                />
                <text
                    x={labelX}
                    y={labelY + (percentageChange !== null ? 9 : 12)}
                    fill="#9a3412"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fontWeight="bold"
                >
                    {formattedValue}
                </text>
                {percentageChange !== null && (
                    <text
                        x={labelX}
                        y={labelY + 22}
                        fill={percentageChange >= 0 ? "#16a34a" : "#dc2626"}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="7"
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
    }) => {
        const radius = 8
        const labelY = y - 40
        const labelX = x
        const formattedValue = formatCurrencyForLabel(value)
        const textWidth = formattedValue.length * 4.5
        const rectWidth = Math.max(80, textWidth + 10)

        // Get percentage change
        let percentageChange = null
        if (index > 0 && filteredData[index - 1]) {
            const dataKey = Object.keys(payload).find(
                (key) => key !== "year" && payload[key] === value
            )
            if (dataKey && filteredData[index - 1][dataKey]) {
                percentageChange = calculatePercentageChange(
                    value,
                    filteredData[index - 1][dataKey]
                )
            }
        }

        return (
            <g>
                <rect
                    x={labelX - rectWidth / 2}
                    y={labelY}
                    width={rectWidth}
                    height={percentageChange !== null ? 30 : 18}
                    fill="#fff7ed"
                    stroke="#f97316"
                    strokeWidth={1}
                    rx={radius}
                    ry={radius}
                    opacity={0.95}
                />
                <text
                    x={labelX}
                    y={labelY + (percentageChange !== null ? 9 : 12)}
                    fill="#9a3412"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fontWeight="bold"
                >
                    {formattedValue}
                </text>
                {percentageChange !== null && (
                    <text
                        x={labelX}
                        y={labelY + 22}
                        fill={percentageChange >= 0 ? "#16a34a" : "#dc2626"}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="7"
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
        const textWidth = formattedValue.length * 4.5
        const rectWidth = Math.max(80, textWidth + 10)

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

        return (
            <g>
                <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="#ea580c"
                    stroke="#fff"
                    strokeWidth={2}
                />
                <rect
                    x={cx - rectWidth / 2}
                    y={cy - (percentageChange !== null ? 45 : 30)}
                    width={rectWidth}
                    height={percentageChange !== null ? 30 : 18}
                    fill="#fff7ed"
                    stroke="#f97316"
                    strokeWidth={1}
                    rx={8}
                    ry={8}
                    opacity={0.95}
                />
                <text
                    x={cx}
                    y={cy - (percentageChange !== null ? 33 : 18)}
                    fill="#9a3412"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fontWeight="bold"
                >
                    {formattedValue}
                </text>
                {percentageChange !== null && (
                    <text
                        x={cx}
                        y={cy - 20}
                        fill={percentageChange >= 0 ? "#16a34a" : "#dc2626"}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="7"
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

    const renderChart = () => {
        const commonProps = {
            data: filteredData,
            margin: { top: 70, right: 30, left: 20, bottom: 60 },
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
                        {selectedMetric === "total" ? (
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#ea580c"
                                strokeWidth={4}
                                dot={<CustomDot />}
                            />
                        ) : (
                            <Line
                                type="monotone"
                                dataKey={selectedMetric}
                                stroke="#ea580c"
                                strokeWidth={4}
                                dot={<CustomDot />}
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
                        {selectedMetric === "total" ? (
                            <Bar
                                dataKey="total"
                                fill="url(#barGradient)"
                                radius={[4, 4, 0, 0]}
                            >
                                <LabelList
                                    dataKey="total"
                                    content={CustomBarLabel}
                                />
                            </Bar>
                        ) : (
                            <Bar
                                dataKey={selectedMetric}
                                fill="url(#barGradient)"
                                radius={[4, 4, 0, 0]}
                            >
                                <LabelList
                                    dataKey={selectedMetric}
                                    content={CustomBarLabel}
                                />
                            </Bar>
                        )}
                    </BarChart>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-3 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-64 h-32">
                        <img src="./logo.png" alt="" />
                        {/* <BarChart3 className="h-8 w-8 text-white" /> */}
                    </div>

                    <p className="text-sm font-bold md:text-lg text-orange-700 max-w-2xl mx-auto leading-relaxed">
                        Visualisasi interaktif data pendapatan pajak dari tahun
                        2020-2025.
                    </p>
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
                                <option value="total">
                                    💰 Total Pendapatan
                                </option>
                                {rawData.map((item) => (
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
                    <div className="flex items-center mb-6">
                        <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                        <h2 className="text-xl md:text-3xl font-bold text-orange-800">
                            Tren Pendapatan (
                            {selectedMetric === "total"
                                ? "Total Pendapatan"
                                : selectedMetric}
                            )
                        </h2>
                    </div>
                    <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-xl overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                            {renderChart()}
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-orange-200 overflow-hidden hover:shadow-3xl transition-all duration-300">
                    <div className="px-6 md:px-8 py-6 bg-gradient-to-r from-orange-100 to-amber-100 border-b border-orange-200">
                        <div className="flex items-center">
                            <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-4"></div>
                            <h2 className="text-xl md:text-3xl font-bold text-orange-800">
                                Tabel Data Mentah
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
                                        "2025 (Sem 1)",
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

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-orange-600 text-sm">
                        © 2024 Dashboard Pendapatan Pajak Indonesia
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TaxRevenueDashboard
