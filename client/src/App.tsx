import { Outlet } from 'react-router';
import Footer from './components/footer';
import Header from './components/header';

function App() {
  return (
    <div className="flex flex-col h-full justify-between">
      <Header />
      <div className="flex justify-center overflow-hidden">
        <div className="w-full mx-20 py-2 max-w-[1200px]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
