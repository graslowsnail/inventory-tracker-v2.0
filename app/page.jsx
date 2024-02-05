// page.tsx is the ui for the / url path
import  MyCalendar from '../components/MyCalendar.jsx'

export default function Home() {
  return (
    <main className=''>
    main dashboard: select a day to start scanning
    {/*<PartsList />*/}
    {<MyCalendar />}
    </main>
  );
};
