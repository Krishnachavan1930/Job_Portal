"use client"
import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { Filter, X } from "lucide-react"
import { Button } from "./ui/button"

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("")
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  const clearFilters = () => {
    setSelectedValue("")
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue, dispatch])

  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="font-semibold text-slate-800 flex items-center">
          <Filter className="h-4 w-4 mr-2 text-teal-500" />
          Filter Jobs
        </h2>
        {selectedValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-slate-500 hover:text-slate-700 p-1 h-auto"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="p-4">
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="font-medium text-slate-800 mb-3">{data.filterType}</h3>
              <div className="space-y-2 pl-1">
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div key={itemId} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      <Label htmlFor={itemId} className="text-slate-600 cursor-pointer">
                        {item}
                      </Label>
                    </div>
                  )
                })}
              </div>
              {index < filterData.length - 1 && <div className="mt-4 border-t border-slate-100"></div>}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCard
