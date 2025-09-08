import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    }
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState(''); // Location/Industry selection
    const [salary, setSalary] = useState(50000); // default salary value
    const [jobType, setJobType] = useState('Job'); // Job or Internship
    const [paidStatus, setPaidStatus] = useState('Paid'); // Paid or Not Paid for Internship

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />

            {/* Job or Internship selector */}
            <div className='mt-3'>
                <h1 className='font-bold text-md'>Type</h1>
                <div className='flex items-center space-x-4 mt-2'>
                    <div className='flex items-center space-x-2'>
                        <input
                            type="radio"
                            id="job"
                            name="jobType"
                            value="Job"
                            checked={jobType === 'Job'}
                            onChange={(e) => setJobType(e.target.value)}
                        />
                        <Label htmlFor="job">Job</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <input
                            type="radio"
                            id="internship"
                            name="jobType"
                            value="Internship"
                            checked={jobType === 'Internship'}
                            onChange={(e) => setJobType(e.target.value)}
                        />
                        <Label htmlFor="internship">Internship</Label>
                    </div>
                </div>
            </div>

            {/* Location and Industry filters */}
            <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
                {filterData.map((data, index) => (
                    <div key={index} className='mt-3'>
                        <h1 className='font-bold text-md'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`
                            return (
                                <div key={itemId} className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </RadioGroup>

            {/* Salary or Paid/Not Paid filter */}
            {jobType === 'Job' ? (
                <div className='mt-5'>
                    <h1 className='font-bold text-md mb-2'>Salary: ₹{salary}</h1>
                    <input
                        type="range"
                        min={0}
                        max={500000}
                        step={5000}
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className='flex justify-between text-sm mt-1'>
                        <span>0</span>
                        <span>5L+</span>
                    </div>
                </div>
            ) : (
                <div className='mt-5'>
                    <h1 className='font-bold text-md mb-2'>Paid Status</h1>
                    <div className='flex items-center space-x-4'>
                        <div className='flex items-center space-x-2'>
                            <input
                                type="radio"
                                id="paid"
                                name="paidStatus"
                                value="Paid"
                                checked={paidStatus === 'Paid'}
                                onChange={(e) => setPaidStatus(e.target.value)}
                            />
                            <Label htmlFor="paid">Paid</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <input
                                type="radio"
                                id="notPaid"
                                name="paidStatus"
                                value="Not Paid"
                                checked={paidStatus === 'Not Paid'}
                                onChange={(e) => setPaidStatus(e.target.value)}
                            />
                            <Label htmlFor="notPaid">Not Paid</Label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterCard;
