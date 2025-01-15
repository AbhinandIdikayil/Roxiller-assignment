
function DropDown({ months, setValue }: { months: string[], setValue: any }) {
    function handleMonth(data: string) {
        setValue(data)
    }
    return (
        <div style={{ zIndex: '99' }} className="w-[80px] bg-slate-50  h-48 absolute top-9 left-0 rounded-md drop-down border overflow-y-scroll">
            <ul>
                {
                    months?.map((data: any, ind: number) => (
                        <li onClick={() => handleMonth(data)} key={data + ind} className="px-4 h-10 border-b border-solid">
                            <div className="flex w-full h-full justify-center items-center">
                                <h1 className="font-bold text-sm text-center"> {data} </h1>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default DropDown