'use client';
import dynamic from 'next/dynamic';
const Mapbox = dynamic(() => import('../../components/Mapbox.jsx'), {
  ssr: false, 
});

export default function Home() {
  return (
    <>
      <Mapbox/>
    </>
  );
}
