import React from 'react';
import Stats from '../components/stats';

const Dashboard: React.FC = () => {
    return (
        <div className='space-y-4 '>
            <h1 className='text-[#004883] font-[500]'>Dashboard</h1>
            <div className=' flex items-center gap-3'>
                <Stats value={"580"} label='Active users' />
                <Stats value={"204"} label='New subscriptions' />

            </div>
            <div className='flex items-center gap-3'>
                

            </div>
        </div>
    );
};

export default Dashboard;