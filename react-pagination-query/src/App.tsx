import { useState, useEffect } from 'react';
import Data from './DATA.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageNumber = parseInt(location.hash.substring(2)) || 1; // Получаем номер страницы из URL

  const [currentPage, setCurrentPage] = useState(pageNumber);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const hash = `#=${currentPage}`;
    if (location.hash !== hash) {
      navigate(hash); // Обновляем URL при изменении currentPage
    }
  }, [currentPage, navigate, location]);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='container'>
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {records.map((data, id) => (
            <tr key={id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className='pagination d-flex justify-content-center'>
          <li className='page-item'>
            <a href={`#=${currentPage - 1}`} className='page-link' onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
              <a href={`#=${n}`} className='page-link' onClick={() => changeCurrentPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className='page-item'>
            <a href={`#=${currentPage + 1}`} className='page-link' onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;



