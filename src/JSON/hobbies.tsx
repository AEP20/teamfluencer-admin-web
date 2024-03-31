interface HobbyItem {
    name: string;
    native_name: string;
}

interface HobbyCategory {
    items: HobbyItem[];
    group_name: string;
    native_name: string;
}
//HOBBIES
export let hobbiesList: HobbyCategory[] = [
    {
        items: [
            { name: 'basketball', native_name: 'Basketbol' },
            { name: 'football', native_name: 'Futbol' },
            { name: 'tennis', native_name: 'Tenis' },
            { name: 'swim', native_name: 'Yüzme' },
            { name: 'cycling', native_name: 'Bisiklet' },
            { name: 'boxing', native_name: 'Boks' },
            { name: 'handball', native_name: 'Hentbol' },
            { name: 'golf', native_name: 'Golf' },
            { name: 'ski', native_name: 'Kayak' },
            { name: 'fitness', native_name: 'Fitness ve Sağlık' },
            { name: 'chess', native_name: 'Satranç' },
        ],
        group_name: 'sport',
        native_name: 'Spor',
    },
    {
        items: [
            { name: 'photography', native_name: 'Fotoğrafçılık' },
            { name: 'painting', native_name: 'Ressamlık' },
            { name: 'music', native_name: 'Müzik' },
            { name: 'cinema', native_name: 'Sinema' },
            { name: 'literature', native_name: 'Edebiyat' },
            { name: 'theater', native_name: 'Tiyatro' },
        ],
        group_name: 'art',
        native_name: 'Sanat',
    },
    {
        items: [
            { name: 'parent', native_name: 'Ebeveynlik' },
            { name: 'travel', native_name: 'Seyahat' },
            { name: 'fashion', native_name: 'Moda' },
            { name: 'healthfitness', native_name: 'Sağlık ve Form' },
            { name: 'luxury', native_name: 'Lüks' },
            { name: 'adventure', native_name: 'Macera' },
            { name: 'cosmetics', native_name: 'Güzellik / Kozmetik' },
            { name: 'business', native_name: 'İş / Business' },
            { name: 'fashiondesign', native_name: 'Moda Tasarımı' },
            { name: 'books ', native_name: 'Kitaplar' },
            { name: 'shopping', native_name: 'Alışveriş ve Moda' },
            { name: 'mom', native_name: 'Anne-Çocuk' },
            { name: 'gastronomy', native_name: 'Gastronomi / Yemek' },
            { name: 'animal', native_name: 'Evcil Hayvan Sahiplenme' },
        ],
        group_name: 'lifestyle',
        native_name: 'Yaşam Tarzı',
    },
    {
        items: [
            { name: 'computer', native_name: 'Bilgisayar' },
            { name: 'cars', native_name: 'Otomobil' },
            { name: 'development', native_name: 'Yazılım' },
            { name: 'games', native_name: 'Bilgisayar Oyunları' },
            { name: 'bitcoin', native_name: 'Kripto Para' },
        ],
        group_name: 'technology',
        native_name: 'Teknoloji',
    },
];

export let hobbieListEN: HobbyCategory[] = [
    {
        items: [
            { name: 'basketball', native_name: 'Basketball' },
            { name: 'football', native_name: 'Football' },
            { name: 'tennis ', native_name: 'Tennis' },
            { name: 'swim', native_name: 'Swimming' },
            { name: 'cycling', native_name: 'Cycling' },
            { name: 'boxing', native_name: 'Boxing' },
            { name: 'handball', native_name: 'Handball' },
            { name: 'golf', native_name: 'Golf' },
            { name: 'ski', native_name: 'Ski' },
            { name: 'fitness', native_name: 'Fitness and Health' },
            { name: 'chess', native_name: 'Chess' },
        ],
        group_name: 'sport',
        native_name: 'Sports',
    },
    {
        items: [
            { name: 'photography', native_name: 'Photography' },
            { name: 'painting', native_name: 'Painting' },
            { name: 'music', native_name: 'Music' },
            { name: 'cinema', native_name: 'Cinema ' },
            { name: 'literature', native_name: 'Literature' },
            { name: 'theater', native_name: 'Theater' },
        ],
        group_name: 'Art',
        native_name: 'Art',
    },
    {
        items: [
            { name: 'parent', native_name: 'Parenting' },
            { name: 'travel', native_name: 'Travel' },
            { name: 'fashion', native_name: 'Fashion' },
            { name: ' healthfitness', native_name: 'Health and Fitness' },
            { name: 'luxury', native_name: 'Luxury' },
            { name: 'adventure', native_name: 'Adventure' },
            { name: 'cosmetics', native_name: 'Beauty / Cosmetics' },
            { name: 'business', native_name: 'Business / Business' },
            { name: 'fashiondesign', native_name: 'Fashion Design' },
            { name: 'books', native_name: 'Books' },
            { name: 'shopping', native_name: 'Shopping and Fashion' },
            { name: 'mom', native_name: 'Mother-Child' },
            { name: 'gastronomy', native_name: 'Gastronomy / Food' },
            { name: 'animal', native_name: 'Pet Adoption' },
        ],
        group_name: 'lifestyle',
        native_name: 'Lifestyle',
    },
    {
        items: [
            { name: 'computer', native_name: 'Computer' },
            { name: 'cars', native_name: 'Car' },
            { name: 'development', native_name: 'Software' },
            { name: 'games', native_name: 'Computer Games' },
            { name: 'bitcoin', native_name: 'Cryptocurrency' },
        ],
        group_name: 'technology',
        native_name: 'Technology',
    },
];