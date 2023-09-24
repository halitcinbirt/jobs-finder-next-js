import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import {RiMapPin2Line} from 'react-icons/ri'

export default function card({data}) {

    const [jobsArray, setJobs] = useState([]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);

    const slug = data;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const apiUrl = process.env.API_URL;
            const response = await axios.get(`${apiUrl}jobs?order=DESC&limit=${pageSize}&page=${page}&slug=${slug}`);
            const jobsData = response.data.jobs;
    
            setJobs(jobsData); // Verileri state'e atar
    
          } catch (error) {
            console.error('Veri getirme hatası:', error);
          }
        };
    
        fetchData(); // fetchData işlemini bileşen yüklendiğinde çağır
    
      }, [slug, page, pageSize]);


      function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        const locale = 'tr-TR';
      
        return date.toLocaleDateString(locale, options);
      }

      const loadNextPage = async () => {
        try {
          const apiUrl = process.env.API_URL;
          const response = await axios.get(`${apiUrl}jobs?order=DESC&limit=${pageSize}&page=${page + 1}&slug=${slug}`);
          const newJobsData = response.data.jobs;
      
          // Mevcut iş ilanlarını ve yeni iş ilanlarını birleştirerek güncel bir iş ilanları dizisi oluşturun
          const updatedJobsArray = [...jobsArray, ...newJobsData];
          setJobs(updatedJobsArray);
      
          // Sayfa numarasını bir artırın
          setPage(page + 1);
        } catch (error) {
          console.error('Veri getirme hatası:', error);
        }
      };
      
      const loadPreviousPage = async () => {
        if (page > 1) {
          try {
            const apiUrl = process.env.API_URL;
            const response = await axios.get(`${apiUrl}jobs?order=DESC&limit=${pageSize}&page=${page - 1}&slug=${slug}`);
            const newJobsData = response.data.jobs;
      
            // Mevcut iş ilanlarını ve yeni iş ilanlarını birleştirerek güncel bir iş ilanları dizisi oluşturun
            const updatedJobsArray = [...jobsArray, ...newJobsData];
            setJobs(updatedJobsArray);
      
            // Sayfa numarasını bir azaltın
            setPage(page - 1);
          } catch (error) {
            console.error('Veri getirme hatası:', error);
          }
        }
      };
      


  if(jobsArray){
    return (
      <div className='cardList'>
        <div className='row'>
        {jobsArray.map((item) => (
                <div className='col-lg-4 col-12'>
                  <Link key={item.job_id} href={`/detay/${item.job_slug}`} className='item'>
                    <div className='title'>
                    {item.job_title}
                    </div>
                    <div className='status'>
                      Tam Zamanlı
                    </div>
                    <div className='company'>
                      <div className='first'>
                        <div className='title'>
                          {item.job_company}
                        </div>
                        <div className='location'>
                        <RiMapPin2Line /> {item.city_name}, {item.district_name}
                        </div>
                      </div>
                      <div className='last'>
                        {formatDate(item.job_date)}
                      </div>
                    </div>
                  </Link>
                </div>
                ))}
        </div>
        <div className='pagination'>
          <button onClick={loadPreviousPage} disabled={page === 1}>Önceki</button>
          <button onClick={loadNextPage}>Sonraki</button>
        </div>
      </div>
    )
  }else{
    return(
      <div>
        <div className='text-center'>
          <div className='alert alert-warning'>Sonuç Bulunamadı</div>
        </div>
      </div>
    )
  }
}
