import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAfindAllBrands, TAfindBrand } from '../services/brandAPI';
import { AllBrandType, BrandType, MoneyExchanges } from '../types/brandData';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import BrandProfile from '../components/BrandProfile';
import { selectToken } from '../redux/store/userSlice';

const fetchData = async (token: string) => {
  try {
    const response = await TAfindAllBrands(token);
    return response.brands;
  } catch (error: any) {
    throw new Error(error);
  }
};

const FindBrand = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Kampanya Bul'));
  });
  const [userData, setUserData] = useState([] as AllBrandType[]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [brandname, setBrandname] = useState('');
  const [brandData, setbrandData] = useState<BrandType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchEmailMatches, setSearchEmailMatches] = useState<AllBrandType[]>([]);
  const [searchNameMatches, setSearchNameMatches] = useState<AllBrandType[]>([]);
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);
  const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchData(token);
        if (data !== undefined) {
          setUserData(data);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('No data found');
      }
    };
    getUserData();
  }, []);

  const handleForm = async (e: any) => {
    e.preventDefault();

    let data;

    if (email !== '' && phone === '' && brandname === '') {
      data = { email };
    } else if (phone !== '' && email === '' && brandname === '') {
      data = { phone };
    } else if (brandname !== '' && email === '' && phone === '') {
      data = { brandname };
    } else if (!email && !phone && !brandname) {
      setError('Please provide email, phone or brand name');
      return;
    } else {
      setError('Please provide only one of these: email, phone or brand name');
      return;
    }

    try {
      const res = await TAfindBrand(data, token);
      const response = Array.isArray(res) ? res[0] : res;

      const object: BrandType = {
        balance: response.balance,
        email: response.email,
        brand_name: response.brand_name,
        country: response.country,
        first_name: response.first_name,
        last_name: response.last_name,
        phone: response.phone,
        currency: response.currency,
        language: response.language,
        brand_logo: response.brand_logo,
        job_title: response.job_title,
        billing_address: {
          type: response.billing_address?.type ?? '',
          firm_name: response.billing_address?.firm_name ?? '',
          contactName: response.billing_address?.contactName ?? '',
          id: response.billing_address?.id ?? '',
          city: response.billing_address?.city ?? '',
          country: response.billing_address?.country ?? '',
          address: response.billing_address?.address ?? '',
          zipCode: response.billing_address?.zipCode ?? '',
        },

        money_exchanges: Array.isArray(response.money_exchanges)
          ? response.money_exchanges.map((exchange: MoneyExchanges) => ({
              operation: exchange?.operation ?? '',
              amount: exchange?.amount ?? 0,
              application_id: exchange?.application_id ?? '',
              action_time: exchange?.action_time ?? '',
            }))
          : [],
        notes: '',
        _id: '',
      };
      setbrandData(object);
    } catch (error: any) {
      setError(error.message);
    }
  };

  function searchBrandsEmail(text: string) {
    let matches = userData.filter((brand: AllBrandType) => {
      const regex = new RegExp(`^${text}`, 'gi');
      setEmail(text);

      return brand.email.match(regex);
    });
    if (matches.length === 0 || text.length === 0) {
      setIsEmailDropdownOpen(false);
    } else {
      setIsEmailDropdownOpen(true);
    }
    setSearchEmailMatches(matches);
  }

  function searchBrandsName(text: string) {
    let matches = userData.filter((brand: AllBrandType) => {
      const regex = new RegExp(`^${text}`, 'gi');
      setBrandname(text);

      return brand.first_name.match(regex);
    });
    if (matches.length === 0 || text.length === 0) {
      setIsNameDropdownOpen(false);
    } else {
      setIsNameDropdownOpen(true);
    }
    setSearchNameMatches(matches);
  }

  const handleBrandEmailSelect = (selectedBrand: any) => {
    setEmail(selectedBrand.email);
  };

  const handleBrandNameSelect = (selectedBrand: any) => {
    setBrandname(selectedBrand.brand_name);
  };

  useEffect(() => {
    const handleClick = () => {
      setIsNameDropdownOpen(false);
      setIsEmailDropdownOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start min-h-screen bg-cover bg-center relative">
      <div className="w-full ">{brandData && <BrandProfile {...brandData} />}</div>
      <form className="w-1/4 absolute top-5 right-6">
        <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Brand Mail</h2>
        <input
          type="email"
          placeholder="email@mail.com"
          className="form-input text-sm"
          value={email}
          onChange={(e) => {
            const text = e.target.value;
            searchBrandsEmail(text);
          }}
        />
        {isEmailDropdownOpen && searchEmailMatches.length > 0 && (
          <div className="absolute bg-white border border-gray-300 rounded mt-10 z-10">
            {searchEmailMatches.slice(0, 4).map((match: AllBrandType) => (
              <div
                className="p-2 border-b border-gray-300 hover:bg-gray-100"
                key={match.id}
                onClick={() => handleBrandEmailSelect(match)}
              >
                {match.email}
              </div>
            ))}
          </div>
        )}

        <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Brand Name</h2>
        <input
          type="brandname"
          placeholder="brandname"
          className="form-input text-sm"
          value={brandname}
          onChange={(e) => {
            const text = e.target.value;
            searchBrandsName(text);
          }}
        />
        {isNameDropdownOpen && searchNameMatches.length > 0 && (
          <div className="absolute bg-white border border-gray-300 rounded z-10">
            {searchNameMatches.slice(0, 4).map((match: AllBrandType) => (
              <div
                className="p-2 border-b border-gray-300 hover:bg-gray-100"
                key={match.id}
                onClick={() => handleBrandNameSelect(match)}
              >
                {match.brand_name}
              </div>
            ))}
          </div>
        )}

        <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Brand No</h2>
        <input
          type="tel"
          placeholder="phone number (ex: 905555555555)"
          className="form-input text-sm"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex justify-center">
          <button type="button" onClick={handleForm} className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FindBrand;
