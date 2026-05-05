import { Clock , Contact, Mail , Phone } from 'lucide-react';
import React from 'react'

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Call Us",
    subtitle: "+91 9005369833",
    icon: (
    <Phone className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors'/>
    ),
  },
  {
    title: "Email Us",
    subtitle: "kashicharmsofficial@gmail.com",
    icon: (
      <Mail className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors'/>
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors hoverEffect'/>
    ),
  },
];

const FooterTop = () => {
  return <div className='grid grid-cols-2 lg:grid-cols-4 gap-10 border-b'>
    {data?.map((item, index)=>(
      <div key={index} className='flex items-center gap-3 group hover:bg-gray-500 p-4 transition-colors hoverEffect'>{item?.icon}
      <div>
        <h3 className='font-semibold text-gray-900 '> {item?.title} </h3>
        <p className='text-gray-600 text-sm mt-1 group-hover:text-gray-900 hoverEffect'> {item?.subtitle} </p>
      </div>
      </div>
    ))}
  </div>;
};

export default FooterTop;