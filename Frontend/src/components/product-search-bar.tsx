import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router'
import { IconSearch } from '@tabler/icons-react'

const ProductSearchBar = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && search.trim()) {
            navigate(`/products?q=${encodeURIComponent(search.trim())}`)
        }
    }
    return (
        <div className='w-[450px] relative'>
            <IconSearch className='text-black/80 size-5 absolute left-4 top-1/2 -translate-y-1/2' />

            <Input
                placeholder='Search for Any Product.'
                className='pl-12'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
            />
        </div>
    )
}

export default ProductSearchBar