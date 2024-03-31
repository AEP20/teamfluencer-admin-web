// components/AddApplicationModal.js
import { useState, useEffect } from 'react';
import { jobsArray } from '../JSON/jobsArray';
import { hobbiesList } from '../JSON/hobbies';
import { TACreateApplication, TASearchByUsername } from '../services/applicationAPI';
import { TAfindUser } from '../services/userAPI';

const applicationStates = [
    'first_application', 'account_rejected', 'waiting_address', 'address_to_approve', 'address_rejected',
    'waiting_content', 'content_offered', 'content_to_share', 'content_rejected',
    'content_approved', 'brand_canceled', 'user_canceled', 'content_shared', 'application_done',
];
interface FormData {
    insta_username: string;
    age: number;
    gender: string;
    school_type: string;
    school_name: string;
    city: string;
    country: string;
    language: string;
    currency: string;
    job: string;
    birthday: string;
    verification: boolean;
    hobbies: string[];
    price_brand: number;
    price_user: number;
}

export const AddApplicationModal = ({ isOpen, onClose, _id, token, currency }: { isOpen: boolean, onClose: any, _id: any, token: string, currency: string }) => {
    const [formData, setFormData] = useState<FormData>
        ({
            insta_username: '',
            age: 0,
            gender: '',
            school_type: '',
            school_name: '',
            city: '',
            country: '',
            language: '',
            currency: currency,
            job: '',
            birthday: '',
            verification: false,
            hobbies: [],
            price_brand: 0,
            price_user: 0,
        });
    const [selectedState, setSelectedState] = useState('first_application');
    const [usernames, setUsernames] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [formError, setFormError] = useState<string>('');
    const sortedJobsArray: any[] = jobsArray.sort((a, b) => a.label.localeCompare(b.label));
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        if (formData.insta_username.length >= 3) {
            TASearchByUsername(formData.insta_username, token).then(setUsernames).catch(console.error);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }, [formData.insta_username, token]);




    const validateFormData = () => {
        const requiredFields: (keyof FormData)[] = [
            'insta_username', 'age', 'gender', 'school_type',
            'city', 'country', 'language', 'currency', 'job', 'birthday',
            'hobbies', 'price_brand', 'price_user',
        ];

        for (let field of requiredFields) {
            console.log("field : ", field, " username ", formData.insta_username);
            if (field === "price_brand" || field === "price_user") {
                console.log("field : ", field);
                if (formData[field] <= 0) {
                    return `Please fill in the ${field.replace('_', ' ')} field.`;
                }
            } else if (field === "hobbies") {
                console.log("hobbies : ", formData.hobbies);
                if (formData[field].length === 0) {
                    return `Please fill in the ${field.replace('_', ' ')} field.`;
                }
            }

            if ((!formData[field] || Array.isArray(formData[field])) && field !== "hobbies") {
                return `Please fill in the ${field.replace('_', ' ')} field.`;
            }
        };
        return '';
    }

    const handleState = (e: any) => {
        setSelectedState(e.target.value);
    };
    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const target = e.target as HTMLInputElement; // Cast to HTMLInputElement to access common properties

        const value = target.type === 'checkbox' ? target.checked : target.value as any;
        const name = target.name;
        if (target.type === 'select-multiple') {
            // Handle multi-select dropdown specifically
            const select = e.target as HTMLSelectElement; // Cast to HTMLSelectElement
            const selectedOptions = Array.from(select.options)
                .filter(option => option.selected)
                .map(option => option.value);
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: selectedOptions,
            }));
        } else {
            if (name === "city") { // Ensure city is always lowercase
                setFormData({ ...formData, [name]: value.toLowerCase().replace(/[^a-z\s]/gi, '') });
            } else {
                setFormData({ ...formData, [name]: value });
                if (name === "insta_username" && value.length >= 3) {
                    const response: string[] = await TASearchByUsername(value, token);
                    console.log("response : ", response);
                    setUsernames(response);

                }
            }
        }
    };
    const removeHobby = (hobbyToRemove: string) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            hobbies: prevFormData.hobbies.filter(hobby => hobby !== hobbyToRemove),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(''); // Clear existing errors
        setIsLoading(true); // Begin loading

        try {
            const validationError = validateFormData();
            console.log("validationError : ", validationError);
            if (validationError) {
                setFormError(validationError);
                setIsLoading(false); // Stop loading if there's an error
                return;
            }

            const response: any = await TACreateApplication(formData, _id, token, selectedState);
            console.log("response handleSubmit : ", response);
            if (response.success) {
                onClose(); // Close modal if submission is successful
            } else {
                setFormError(response.message || 'An unexpected error occurred.');
            }
        } catch (error: any) {
            console.error('Error saving application:', error);
            setFormError('Error saving application: ' + error.message);
        } finally {
            setIsLoading(false); // Stop loading regardless of outcome
        }
    };

    const getUserByUsername = async (username: string) => {
        try {
            const response = await TAfindUser(`insta.username=${username}`, token);
            console.log("response getUserByUsername : ", response.city + " " + response.country + " " + response.language + " " + response.job + " " + response.hobbies + " " + response.school_type + " " + response.birthday + " " + response.verification);

            // Example of setting state based on the response. Adjust according to your actual data structure.
            setFormData({
                ...formData,
                insta_username: response.instagram.username,
                age: response.age, // Direct mapping
                gender: response.gender,
                city: response.city.toLowerCase().replace(/[^a-z\s]/gi, ''),
                country: response.country,
                language: response.language, // This is an assumption; adjust as needed
                job: response.job,
                hobbies: response.hobbies, // Assuming hobbies are mapped from Instagram keywords
                school_type: response.school_type, // Adjust based on your data structure
                birthday: response.birthday, // Make sure the format matches your form expectations
                verification: response.verification === "true", // Assuming 'verification' is a string that needs to be converted to boolean
            });
            setShowDropdown(false); // Hide the dropdown after setting the user data
        } catch (error) {
            console.error('Error fetching user by username:', error);
        }
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg  overflow-y-auto h-5/6 max-w-md w-full space-y-4">
                <h2 className="text-xl font-semibold mb-4">Add New Application</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Other form fields */}
                    <label className="block">
                        <span className="text-gray-700">Instagram Username</span>
                        <input
                            type="text"
                            name="insta_username"
                            placeholder="Instagram Username"
                            onChange={handleChange}
                            value={formData.insta_username}
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                    {showDropdown && formData.insta_username.length >= 3 && (
                        <div className="absolute mt-1 w-max-md rounded-md bg-white shadow-lg">
                            <ul className="max-h-60  rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {usernames.length > 0 ? (
                                    usernames.map((username, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                            onClick={() => {
                                                setFormData({ ...formData, insta_username: username });
                                                getUserByUsername(username);
                                            }}
                                        >
                                            {username}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500 py-2 px-3">No matches found</li>
                                )}
                            </ul>
                        </div>
                    )}

                    <label className="block">
                        <span className="text-gray-700">Currency: {currency}</span>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Select Application State</span>
                        <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={selectedState}
                            onChange={handleState}
                        >
                            <option value="">Select Application State</option>
                            {applicationStates.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Age</span>
                        <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} className="block w-full p-2 border rounded" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Gender</span>
                        <select name="gender" onChange={handleChange} value={formData.gender} className="block w-full p-2 border rounded">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label className="inline-flex items-center mt-3">
                        <input type="checkbox" name="verification" onChange={handleChange} checked={formData.verification} className="form-checkbox" />
                        <span className="ml-2 text-gray-700">Verified</span>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">School Type</span>
                        <select
                            name="school_type"
                            onChange={handleChange}
                            value={formData.school_type}
                            className="block w-full p-2 border rounded"
                        >
                            <option value="" disabled>Select School Type</option>
                            <option value="highschool">High School</option>
                            <option value="university">University</option>
                            <option value="graduated">Graduated</option>
                        </select>
                    </label>

                    <div>
                        {/* //list hobbies here*/}
                        {formData.hobbies.length > 0 ? formData.hobbies.map((hobby: string, index: number) => (
                            <span key={index} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                                {hobby}
                                <button
                                    onClick={() => removeHobby(hobby)}
                                    className=" ml-4 rounded-full px-0"
                                >
                                    x
                                </button>
                            </span>
                        )) : null}
                    </div>
                    <label className="block">
                        <div className="block">
                            <span className="text-gray-700">Hobbies</span>
                            <div className="mt-2">
                                {hobbiesList.flatMap(group =>
                                    group.items.map(({ name, native_name }) => (
                                        <div key={name} className="flex items-center mb-2">
                                            <input
                                                id={name}
                                                name="hobbies"
                                                type="checkbox"
                                                value={name}
                                                checked={formData.hobbies.includes(name)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setFormData((prevFormData) => ({
                                                        ...prevFormData,
                                                        hobbies: checked
                                                            ? [...prevFormData.hobbies, name]
                                                            : prevFormData.hobbies.filter((hobby) => hobby !== name),
                                                    }));
                                                }}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor={name} className="ml-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                {native_name}
                                            </label>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </label>
                    {/* <label className="block">
                <span className="text-gray-700">School Name</span>
                <input type="text" name="school_name" placeholder="School Name" onChange={handleChange} value={formData.school_name} className="block w-full p-2 border rounded" />
              </label> */}
                    <label className="block">
                        <span className="text-gray-700">City</span>
                        <input type="text" name="city" placeholder="City" onChange={handleChange} value={formData.city} className="block w-full p-2 border rounded" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Country</span>
                        <select
                            name="country"
                            onChange={handleChange}
                            value={formData.country}
                            className="block w-full p-2 border rounded"
                        >
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="TR">Turkey</option>
                            <option value="DE">Germany</option>
                        </select>
                    </label>

                    {/* Language dropdown */}
                    <label className="block">
                        <span className="text-gray-700">Language</span>
                        <select
                            name="language"
                            onChange={handleChange}
                            value={formData.language}
                            className="block w-full p-2 border rounded"
                        >
                            <option value="">Select Language</option>
                            <option value="en">English</option>
                            <option value="tr">Turkish</option>
                            <option value="de">German</option>
                        </select>
                    </label>

                    {/* Price inputs */}
                    <div className="flex space-x-4">
                        <label className="flex-1">
                            <span className="text-gray-700">Price User</span>
                            <input
                                type="number"
                                name="price_user"
                                placeholder="Price for User"
                                onChange={handleChange}
                                value={formData.price_user}
                                className="block w-full p-2 border rounded"
                            />
                        </label>
                        <label className="flex-1">
                            <span className="text-gray-700">Price Brand</span>
                            <input
                                type="number"
                                name="price_brand"
                                placeholder="Price for Brand"
                                onChange={handleChange}
                                value={formData.price_brand}
                                className="block w-full p-2 border rounded"
                            />
                        </label>
                    </div>
                    <label className="block">
                        <span className="text-gray-700">Job</span>
                        <select name="job" onChange={handleChange} value={formData.job} className="block w-full p-2 border rounded">
                            <option value="">Select Job</option>
                            {sortedJobsArray.map(({ label, value }: any) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Birthday</span>
                        <input type="date" name="birthday" placeholder="Birthday" onChange={handleChange} value={formData.birthday} className="block w-full p-2 border rounded" />
                    </label>
                    {formError && (
                        <div className="text-red-500">
                            {formError}
                        </div>
                    )}
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Cancel</button>
                        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded">
                            {isLoading ? 'Loading...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};
