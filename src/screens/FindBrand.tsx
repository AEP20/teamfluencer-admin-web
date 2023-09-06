import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TAfindBrand, TAfindBrandById } from '../services/brandAPI';
import { BrandType, MoneyExchanges } from '../types/brandData';
import { setPageTitle } from '../redux/store/themeConfigSlice';
import BrandProfile from '../components/BrandProfile';
import { selectToken } from '../redux/store/userSlice';
import { useParams } from 'react-router-dom';

const FindBrand = () => {
  const { id } = useParams<{ id: string }>();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(setPageTitle('Find Brands'));
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await TAfindBrandById(id, token);
          setbrandData(response);
        } catch (error) {
          throw error;
        }
      };
      fetchData();
    }
  }, [id, token]);

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [brandname, setBrandname] = useState('');
  const [brandData, setbrandData] = useState<BrandType | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        _id: response._id,
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
        notes: response.notes ? response.notes : '',
      };
      setbrandData(object);
    } catch (error: any) {
      setError(error.message);
    }
  };

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
            setEmail(e.target.value);
          }}
        />

        <h2 className="text-sm font-bold mb-1 mt-3 ml-2">Brand Name</h2>
        <input
          type="brandname"
          placeholder="brandname"
          className="form-input text-sm"
          value={brandname}
          onChange={(e) => {
            setBrandname(e.target.value);
          }}
        />

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
