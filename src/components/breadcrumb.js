import Link from 'next/link'
import React from 'react'

export default function breadcrumb({title, breadcrumb}) {
  return (
    <div>
        <div className='breadcrumbCustom'>
            <div className='container'>
                <div className='breadcrumb-inner'>
                <div className='title'>
                        {title}
                    </div>
                    <div className='list'>
                        {breadcrumb.map((item, index) => (
                            <div key={index}>
                               {item.url ? (
                                    <Link href={item.url}>{item.title}</Link>
                                ) : (
                                    <span>{item.title}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
