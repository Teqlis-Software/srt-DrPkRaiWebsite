'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  // Definirvame photoList masiva, za da spre greshkata pri mapvane
  const photoList = [
    { id: 1, title: "Dr. P. K. Rai" },
    // Mozhete da dobavite oshte obekti tuk, ako e neobhodimo
  ];

  return (
    <div className="bg-black py-3 text-center text-[10px] sm:text-xs text-gray-300 border-t border-red-700 w-full">
      {/* Vashiyat siguren kod i danni */}
      {photoList.map((item) => (
        <div key={item.id} className="my-2">
          {item.title}
        </div>
      ))}
    </div>
  );
}