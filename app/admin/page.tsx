import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointmentActions'
import {columns,Payment} from '@/components/table/columns'
import { DataTable } from '@/components/table/DataTable'




const Admin =async () => {

   

    const appointments=await getRecentAppointmentList()
    console.log("Appointments from API:", appointments);



  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14 text-white'>
        <header className='admin-header'>
            <Link href="/" className="cursor-pointer">

            <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            
            className='h-8 w-fit'
            
            />

            </Link>

            <p className='text-16-semibold'>Admin Dashboard</p>

        </header>

        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Welcome 👋,Admin</h1>
                <p className='text-dark-700'>Start the day with managing new appointments</p>

            </section>


            <section className='admin-start flex w-full justify-evenly gap-20'>

                <StatCard
                type="appointment"
                count={appointments.scheduledCount}
                label="Scheduled appointments"
                icon="/assets/icons/appointments.svg"
                
                />

                <StatCard
                type="pending"
                count={appointments.pendingCount}
                label="Pending appointments"
                icon="/assets/icons/pending.svg"
                
                />

                <StatCard
                type="appointment"
                count={appointments.cancelledCount}
                label="Cancelled appointments"
                icon="/assets/icons/cancelled.svg"
                
                />

            </section>

            <DataTable columns={columns} data={appointments.documents}/>

        </main>



    </div>
  )
}

export default Admin