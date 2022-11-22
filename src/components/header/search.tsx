import Link from 'next/link'
import React from 'react'
import { trpc } from '../../utils/trpc'

interface searchProps {
    input: string
}

function SearchResults(props: searchProps) {

    const data = trpc.product.allProducts.useQuery()

    const filteredData = data.data?.filter((el) => {
        if (props.input === '') {
            return
        }
        else {
            return el.name.includes(props.input)
        }
    })

    return (
        <ul >
            {filteredData?.map((item) => (
                <Link href={`/product/${item.name}`} key={item.id}>
                    <a className='w-fit text-white hover:underline flex items-center m-2'>{item.name}</a>
                </Link>
            ))}
        </ul>
    )
}

export default SearchResults