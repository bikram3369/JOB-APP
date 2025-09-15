import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  // const { companies, searchCompanyByText } = useSelector(store => store.company);
  // const [filterCompany, setFilterCompany] = useState(companies);
  // const navigate = useNavigate();
  // useEffect(()=>{
  //     const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
  //         if(!searchCompanyByText){
  //             return true
  //         };
  //         return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

  //     });
  //     setFilterCompany(filteredCompany);
  // },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>
            <Avatar>
              <AvatarImage
                src="https://imgs.search.brave.com/1BCIAqJm07aDiMCbTlnq6cg3ep11PU6peIRhE5f6lzg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZGVzaWducnVzaC5j/b20vdXBsb2Fkcy91/c2Vycy9jdXN0b21l/ci0yL2ltYWdlXzE1/MDU5MzI4NDNfN2Fj/NWJmYzAyNWQxYzFl/NTk1NDdkZmNlZjMy/OGUxZDMucG5n"
                alt="Company Logo"
              />
            </Avatar>
          </TableCell>
          <TableCell>Google</TableCell>
          <TableCell>2023-10-01</TableCell>
          <TableCell className="text-right cursor-pointer">
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent className="w-32">
                <div
                  onClick={() => navigate(`/admin/companies/${company._id}`)}
                  className="flex items-center gap-2 w-fit cursor-pointer"
                >
                  <Edit2 className="w-4" />
                  <span>Edit</span>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
/* {
                        filterCompany?.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    } */
