import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Header from '@/components/header';
import Breadcrumb from '@/components/breadcrumb';
import Head from 'next/head';
import Card from '@/components/card';
import {BiMap} from 'react-icons/bi';
import Link from 'next/link';

const CategoryDetail = ({ category }) => {


    var city_name = category[0].city_name;
    var city_slug = category[0].city_slug;
    const city_id = category[0].city_id;
    let district_area;

    if (typeof city_name === 'undefined' && typeof city_slug === 'undefined') {
        var city_name = category[0].district_name;
        var city_slug = category[0].district_slug;
        district_area = false;
    }else{
       district_area = true;
    }

    const [breadcrumb, setBreadcrumb] = useState([]);
    const [districtsArray, setDistricts] = useState([]);

    const breadcrumbData = [
        { title: 'Anasayfa', url: '/' },
        { title: `${city_name} İş İlanları`, url: '' },
    ];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const apiUrl = process.env.API_URL;
            const response = await axios.get(`${apiUrl}district?slug=${city_id}`);
            const districtsData = response.data;
    
            setDistricts(districtsData);
    
          } catch (error) {
            console.error('Veri getirme hatası:', error);
          }
        };
    
        fetchData();
    
      }, [city_id]);

      const [isActive, setIsActive] = useState(false);

      const toggleDistrictArea = () => {
        setIsActive(!isActive);
      };
    
      useEffect(() => {
        if (isActive) {
          const handleOutsideClick = (e) => {
            if (document.getElementById('district-area') && !document.getElementById('district-area').contains(e.target)) {
              setIsActive(false);
            }
          };
    
          document.addEventListener('mousedown', handleOutsideClick);
    
          return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
          };
        }
      }, [isActive]);

    return(
        <div>
            <Head>
                <title>{city_name} İş İlanları</title>
            </Head>
            <Header />
            <Breadcrumb title={`${city_name} İş İlanları`} breadcrumb={breadcrumbData} />
            <div className='container'>
                <main>
                    <div className='heading-list mb-5'>
                        <h1 className='title'>{city_name} İş İlanları</h1>
                        {district_area && (
                        <span onClick={toggleDistrictArea}> <BiMap /> İlçeleri Listele</span>
                        )}
                    </div>
                    <Card data={city_slug} />
                    <div className="desc">
                        <h2>{city_name} İş İlanları: Kariyerinizin Kapısı</h2>
                        <p>{city_name}, Türkiye'nin en dinamik iş piyasalarından birine ev sahipliği yapıyor. <strong>{city_name} iş ilanları</strong>, sizin için yeni kariyer fırsatlarını açıyor ve geleceğinizi şekillendirmenize yardımcı oluyor. {city_name}'de iş arıyorsanız, doğru yerdesiniz!</p>
                        <p>{city_name}'de iş fırsatları, farklı sektörlerdeki çeşitli iş alanları ile dikkat çekiyor. Eğitim, sağlık, teknoloji, turizm ve daha birçok sektörde kariyer yapma şansınız var. {city_name}, aynı zamanda birçok büyük kurumun merkezi konumunda bulunuyor. Devlet kurumları, uluslararası şirketler ve yerel girişimler, {city_name}'nde kariyer yapmak isteyenler için sayısız fırsat sunuyor. </p>
                        <p><strong>{city_name} iş ilanları</strong>, deneyim seviyenize ve ilgi alanlarınıza uygun pozisyonlar sunar. Yeni mezunlar için stajyerlik fırsatlarından, deneyimli profesyoneller için yönetim pozisyonlarına kadar geniş bir yelpaze sunuyoruz. Ayrıca, tam zamanlı, yarı zamanlı ve serbest çalışma seçenekleri ile iş ve yaşam dengesini kolayca sağlayabilirsiniz.</p>
                        <p>Kariyerinizde yeni bir adım atmak veya farklı bir sektöre geçmek istiyorsanız, <strong>{city_name} iş ilanları</strong> size bu fırsatı sunuyor. Başvurmak için hemen göz atın ve hayalinizdeki işi bulun. {city_name}'in enerjik iş dünyasına adım atın ve kariyerinizde yeni bir sayfa açın!</p>
                    </div>
                </main>
            </div>
            {district_area && (
                <div id="district-area" className={`district-area ${isActive ? 'active' : ''}`} >
                    <div className='inner'>
                        <div className='heading'>
                            {city_name} - İlçe Listesi
                        </div>
                        <div className='list'>
                        <div className='row'>
                            {districtsArray.map((item) => (
                            <div className='col-lg-4 col-6'>
                                <Link href={`/is-ilanlari/${item.district_slug}`} className='item'>
                                    {item.district_name}
                                </Link>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export async function getServerSideProps({ params }) {
    const { slug } = params;

    try {
        const apiUrl = process.env.API_URL;
        const response = await axios.get(`${apiUrl}city?slug=${slug}`);
        const category = response.data;

        return {
            props: {
                category,
            },
        };
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        return {
            props: {
                category: null,
            },
        };
    }
}


export default CategoryDetail;
