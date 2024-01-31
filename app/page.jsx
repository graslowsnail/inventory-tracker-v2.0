// page.tsx is the ui for the / url path
//import  PartsList  from '../components/PartsList.jsx'
import  MyCalendar from '../components/MyCalendar.jsx'

export default function Home() {
  return (
    <main className=''>
    main dashboard
    {/*<PartsList />*/}
    {<MyCalendar />}
    </main>
  );
};
