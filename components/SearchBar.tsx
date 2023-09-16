'use client';
import { SearchManufacturer } from '@/components';
import { useState } from 'react';
import SearchButton from './SearchButton';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
const SearchBar = () => {
  const [manufacturer, setManuFacturer] = useState('');
  const [model, setModel] = useState('');
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manufacturer === '' && model === '') {
      return alert('Please fill in the search bar');
    }
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturers: string) => {
    const seracthParams = new URLSearchParams(window.location.search);
    if (model) {
      seracthParams.set('model', model);
    } else {
      seracthParams.delete('model');
    }
    if (manufacturer) {
      seracthParams.set('manufacturer', manufacturer);
    } else {
      seracthParams.delete('manufacturer');
    }
    const newPathName = `${
      window.location.pathname
    }?${seracthParams.toString()}`;
    router.push(newPathName);
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input
          type='text'
          name='model'
          value={model}
          onChange={e => setModel(e.target.value)}
          placeholder='Tiguan'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
