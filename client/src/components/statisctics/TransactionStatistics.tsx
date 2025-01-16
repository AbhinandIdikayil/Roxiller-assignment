import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import DropDown from "../DropDown";
import { months } from "@/constants/months";
import { AXIOS_INSTANCE } from "@/constants/axiosInstance";

interface ITotalInfo {
  totalSaleOfMonth: {
    totalSales: number
  },
  totalNumberOfSoldItem: {
    count: number
  },
  totalNumberOfUnSoldItem: {
    count: number
  }
}

function TransactionStatistics() {
  const [selectedMonth, setSelectedMonth] = useState<string>('Mar');
  const [totalInfo, setTotalInfo] = useState<ITotalInfo>()
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("hidden");
    }
  };
  const fetch = async (month: string) => {
    try {
      const { data } = await AXIOS_INSTANCE.get('/statistics/month', {
        params: {
          month
        }
      })
      console.log(data)
      setTotalInfo(data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetch(selectedMonth)
  }, [selectedMonth])

  return (
    <div className="flex flex-col items-center h-[200px] w-[26%]">
      <div className="bg-white p h-full rounded-md border shadow w-full max-w-md">
        {/* Title */}
        <div className="flex justify-between items-center font-bold text-sm px-4 py-2">
          <h1 className="font-bold text-base text-foreground">
            Statistics - <span className="text-foreground">{selectedMonth}</span>
          </h1>
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

        {/* Statistics Card  bg-yellow-200 */}
        <div
          className=" p-4 rounded-md mt-4 text-foreground"
        >
          <div className="flex justify-between mb-2">
            <span className="font-medium">Total sale</span>
            <span className="font-medium"> {totalInfo?.totalSaleOfMonth?.totalSales} </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Total sold item</span>
            <span className="font-medium"> {totalInfo?.totalNumberOfSoldItem?.count} </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total not sold item</span>
            <span className="font-medium"> {totalInfo?.totalNumberOfUnSoldItem?.count} </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionStatistics