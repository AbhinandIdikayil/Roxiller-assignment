import { AXIOS_INSTANCE } from "@/constants/axiosInstance";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer,
} from "recharts";
import DropDown from "../DropDown";
import { months } from "@/constants/months";


const BarChart = () => {
  const [barChartData, setBarChartData] = useState();
  const [selectedMonth, setSelectedMonth] = useState<string>('Mar');
  const fetch = async (month: string) => {
    try {
      const { data } = await AXIOS_INSTANCE.get('/statistics/bar-chart', {
        params: {
          month
        }
      })
      setBarChartData(data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetch(selectedMonth)
  }, [selectedMonth]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("hidden");
    }
  };


  return (
    <div style={{ width: "70%", height: 400 }}>
      <div className="flex justify-end ">
        <div
          // style={{ zIndex: 99 }}
          onClick={toggleDropdown}
          className="relative w-[80px] h-9 px-3 pt-[0.5px] rounded-md  shadow-sm border"
        >
          <div className=" flex justify-between items-center">
            <h1 className="font-bold text-sm">{selectedMonth || ""}</h1>

            <ChevronDown
              style={{ zIndex: 90 }}
              className="float-end mt-1.5 text-gray-600"
            />
          </div>
          <div ref={dropdownRef} className="hidden ">
            <DropDown months={months} setValue={setSelectedMonth} />
          </div>
        </div>
      </div>

      <ResponsiveContainer>
        <RechartsBarChart
          data={barChartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 30 }}
          barSize={5}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" padding={{ left: 0, right: 0 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4cd7d0" fontSizeAdjust={10} barSize={20} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
