import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getAppointment } from '@/lib/actions/appointmentActions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {


    /*extracting appointment id from url params*/
  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

  return (
    <div className='flex flex-col items-center justify-center text-white h-screen max-h-screen px-4'>
      
      <div className='flex flex-col items-center text-center mb-10'>
        <Image
          src="/assets/icons/logo-full.svg"
          height={1000}
          width={1000}
          alt="logo"
          className="h-10 w-fit mb-6"
        />

        <Image
          src="/assets/gifs/success.gif"
          height={300}
          width={280}
          alt="success"
        />

        <h2 className='header text-white mt-6 max-w-[600px]'>
          Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
        </h2>

        <p className='mt-2'>We'll be in touch shortly to confirm.</p>
      </div>

      
      <section className='request-details mb-6'>
        <p className="mb-2">Requested appointment details:</p>
        <div className='flex items-center gap-3 mb-2'>
          {doctor?.image && (
            <Image
              src={doctor.image}
              alt="doctor"
              width={100}
              height={100}
              className='size-6'
            />
          )}
          <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
        </div>

        <div className='flex gap-2 items-center'>
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            width={24}
            height={24}
          />
          <p>{formatDateTime(appointment.schedule).dateTime}</p>
        </div>
      </section>

     
      <div className='flex justify-center items-center mb-4'>
        <Button variant="outline" className='shad-primary-btn rounded' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
      </div>

      {/* ✅ Footer */}
      <p className='copyright mt-4'>© 2024 MediFlow</p>
    </div>
  )
}

export default Success;
