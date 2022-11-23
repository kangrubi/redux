import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'components/Main';
import Test from 'components/Test';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
