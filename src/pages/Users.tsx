import Stats from '../components/stats'
import { IoFilterOutline} from 'react-icons/io5';
// import { FaChevronDown } from "react-icons/fa";
import QuizzesTable from '../components/QuizzesTable';
import Pfp from '../assets/Users pfp.png'
import { useApi } from '../hooks/useApi';
import { useEffect, useState } from 'react';

const Users = () => {
      const [users , setUsers] =useState([]);
      const { apiFetch } = useApi();
  


   const fetchUsers = async () => {
    try {
      const res = await apiFetch('/api/admin/users'); 
      const data = await res.json();
      const mappedUsers = data.data.map((user: any) => ({
        id: user.user_id,
        image: user.avatar || Pfp, // Use default if avatar is null
        title: user.firstname + ' ' + user.surname,
        email: user.email,
        plan: user.premium === 0 ? "Free": "Premium",
        lastSeen : user.last_login ? new Date(user.last_login).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Never',
       }
       )); // Default plan if not provided
      console.log('Mapped users:', mappedUsers);
      setUsers(mappedUsers); 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

 useEffect(() => {

    fetchUsers();
 } , []);

  
  return (
    

    <div className="space-y-5">

      <div className="space-y-10">

         <h1 className='text-[#004883] font-[500]'>Users</h1>
            <div className=' flex items-center gap-3'>
                <Stats value={"3,200,000,000"} label='Total Daily Users' />
                <Stats value={"3,200,000,000"} label='New Sign ups' />

            </div>

            {/*Filter Section */}
            <div className="relative">

              <button
                className="bg-[#F2F3FA] cursor-pointer border-[1px] border-[#C3C6CF] rounded-[8px] px-[12px] h-[32px] flex items-center gap-2 text-[#43474E] text-[13px] min-w-[100px]"
                // onClick={() => {
                //   setShowFilterDropdown((v) => !v);
                //   setDropdownType(null);
                // }}
              >
                Add Filter
                <IoFilterOutline className="ml-1" />
              </button>

                <div>
                  <QuizzesTable 
                    data = {users}
                    tableheads={["User" , "Email" , "Plan" , "Last Seen"] }
                    ids={["title", "email", "plan", "lastSeen"]}
                    initialRowsPerPage={40} 
                    renderCell={{
                            title: (rowData) => ( //This is where the title is modified to accept a pfp
                                <div style={{ 
                                    display: 'flex',       
                                    alignItems: 'center', 
                                    gap: '15px'            
                                }}>
                                    {rowData.image && ( 
                                        <img
                                            src={rowData.image} 
                                            alt={rowData.title}
                                            style={{
                                                width: '36px', 
                                                height: '36px',  
                                                borderRadius: '50%', 
                                                objectFit: 'cover',
                                                objectPosition: 'right'
                                                   
                                            }}
                                        />
                                    )}
                                    {/* This <span> holds the user's name */}
                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                       {rowData.title} 
                                    </span>
                                </div>)
                    }}
                    />
                                
                </div>

            </div>

      </div>
       

    </div>
  )
}

export default Users