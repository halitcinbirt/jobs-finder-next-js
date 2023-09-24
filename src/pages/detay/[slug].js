import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '@/components/header';
import Breadcrumb from '@/components/breadcrumb';
import Head from 'next/head';
import {RiArrowRightLine} from 'react-icons/ri';
import Link from 'next/link';
import {RiArrowRightSLine, RiArrowLeftSLine, RiCalendar2Line, RiFacebookBoxFill, RiTwitterFill, RiLinkedinFill, RiWhatsappFill, RiMapPin2Line} from 'react-icons/ri'
import { useRouter } from 'next/router';

const JobDetail = ({ detail }) => {
    var siteUrl = process.env.SITE_URL;
    const router = useRouter();
    const currentUrl = router.asPath;

    const title = detail[0].title;
    const source_url = detail[0].source_url;
    const city_slug = detail[0].city_slug;
    const city_name = detail[0].city_name;
    const district_name = detail[0].district_name;
    const district_slug = detail[0].district_slug;
    const description = detail[0].description;
    const job_date = detail[0].date;

    const prev_job = detail[0].prev_job;
    const next_job = detail[0].next_job;

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        const locale = 'tr-TR';
        
        return date.toLocaleDateString(locale, options);
    }

    const [breadcrumb, setBreadcrumb] = useState([]);

    const breadcrumbData = [
        { title: 'Anasayfa', url: '/' },
        { title: `${city_name} İş İlanları`, url: `/is-ilanlari/${city_slug}` },
        { title: district_name ? `${district_name} İş İlanları` : null, url: `/is-ilanlari/${district_slug}` },
        { title: title, url: '' },
    ];

    return(
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <Breadcrumb title={title} breadcrumb={breadcrumbData} />
            <main className='detail'>
                <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='jobs-pag'>
                             {prev_job && (
                                <Link href={prev_job}>Önceki</Link>
                            )}
                            {next_job && (
                                <Link href={next_job}>Sonraki</Link>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-8 col-12'>
                        <div className='page-title'>
                            <div className='first'>
                                <h1>{ title }</h1>
                                <div className='status'>
                                    Tam Zamanlı
                                </div>
                            </div>
                        </div>
                        <div className='description'>
                            <span className='title'>İş İlan Detayları</span>
                            <div className='job-detail'>
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                            </div>
                        </div>
                        <div className='pag'>
                            <div className='button'>
                                <a href={source_url} target='_blank'>Başvur</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-12'>
                        <div className='detail-inner'>
                            <div className='inner'>
                                <div className='heading'>
                                    İş İlanı Detayları
                                </div>
                                <div className='list'>
                                    <div className='item'>
                                        <div className='icon'>
                                            <RiCalendar2Line />
                                        </div>
                                        <div className='text'>
                                            <span>Yayınlanma Tarihi</span>
                                            <strong>{ formatDate(job_date) }</strong>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className='icon'>
                                            <RiMapPin2Line />
                                        </div>
                                        <div className='text'>
                                            <span>Şehir</span>
                                            <strong>{ city_name }</strong>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className='icon'>
                                            <RiMapPin2Line />
                                        </div>
                                        <div className='text'>
                                            <span>İlçe</span>
                                            <strong>{ district_name }</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='social'>
                                <a target='_blank' href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}${currentUrl}`}><RiFacebookBoxFill /></a>
                                <a target='_blank' href={`https://twitter.com/intent/tweet?text=${title}&url=${siteUrl}${currentUrl}`}><RiTwitterFill /></a>
                                <a target='_blank' href={`https://www.linkedin.com/sharing/share-offsite/?url=${siteUrl}${currentUrl}`}><RiLinkedinFill /></a>
                                <a target='_blank' href={`https://web.whatsapp.com/send?text=${title} - ${siteUrl}${currentUrl}`}><RiWhatsappFill /></a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
};

export async function getServerSideProps({ params }) {

    const { slug } = params;

    try {
        const apiUrl = process.env.API_URL;
        const response = await axios.get(`${apiUrl}detail?slug=${slug}`);
        const detail = response.data;

        return {
            props: {
                detail,
            },
        };
    } catch (error) {
        return {
            props: {
                detail: null,
            },
        };
    }
}


export default JobDetail;
