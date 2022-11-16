const countriesReady = [
  {
    value: 'Afghanistan',
    label: 'Afghanistan',
  },
  {
    value: 'Albania',
    label: 'Albania',
  },
  {
    value: 'Algeria',
    label: 'Algeria',
  },
  {
    value: 'Andorra',
    label: 'Andorra',
  },
  {
    value: 'Angola',
    label: 'Angola',
  },
  {
    value: 'Antigua and Barbuda',
    label: 'Antigua and Barbuda',
  },
  {
    value: 'Argentina',
    label: 'Argentina',
  },
  {
    value: 'Armenia',
    label: 'Armenia',
  },
  {
    value: 'Aruba',
    label: 'Aruba',
  },
  {
    value: 'Australia',
    label: 'Australia',
  },
  {
    value: 'Austria',
    label: 'Austria',
  },
  {
    value: 'Azerbaijan',
    label: 'Azerbaijan',
  },
  {
    value: 'Bahamas',
    label: 'Bahamas',
  },
  {
    value: 'Bahrain',
    label: 'Bahrain',
  },
  {
    value: 'Bangladesh',
    label: 'Bangladesh',
  },
  {
    value: 'Barbados',
    label: 'Barbados',
  },
  {
    value: 'Belarus',
    label: 'Belarus',
  },
  {
    value: 'Belgium',
    label: 'Belgium',
  },
  {
    value: 'Belize',
    label: 'Belize',
  },
  {
    value: 'Bolivia',
    label: 'Bolivia',
  },
  {
    value: 'Bosnia and Herzegovina',
    label: 'Bosnia and Herzegovina',
  },
  {
    value: 'Botswana',
    label: 'Botswana',
  },
  {
    value: 'Brazil',
    label: 'Brazil',
  },
  {
    value: 'Brunei',
    label: 'Brunei',
  },
  {
    value: 'Bulgaria',
    label: 'Bulgaria',
  },
  {
    value: 'Cambodia',
    label: 'Cambodia',
  },
  {
    value: 'Cameroon',
    label: 'Cameroon',
  },
  {
    value: 'Canada',
    label: 'Canada',
  },
  {
    value: 'Cayman Islands',
    label: 'Cayman Islands',
  },
  {
    value: 'Chile',
    label: 'Chile',
  },
  {
    value: 'China',
    label: 'China',
  },
  {
    value: 'Colombia',
    label: 'Colombia',
  },
  {
    value: 'Congo',
    label: 'Congo',
  },
  {
    value: 'Costa Rica',
    label: 'Costa Rica',
  },
  {
    value: 'Croatia',
    label: 'Croatia',
  },
  {
    value: 'Cuba',
    label: 'Cuba',
  },
  {
    value: 'Cyprus',
    label: 'Cyprus',
  },
  {
    value: 'Czech Republic',
    label: 'Czech Republic',
  },
  {
    value: 'Denmark',
    label: 'Denmark',
  },
  {
    value: 'Dominican Republic',
    label: 'Dominican Republic',
  },
  {
    value: 'Ecuador',
    label: 'Ecuador',
  },
  {
    value: 'Egypt',
    label: 'Egypt',
  },
  {
    value: 'El Salvador',
    label: 'El Salvador',
  },
  {
    value: 'Estonia',
    label: 'Estonia',
  },
  {
    value: 'Faroe Islands',
    label: 'Faroe Islands',
  },
  {
    value: 'Finland',
    label: 'Finland',
  },
  {
    value: 'France',
    label: 'France',
  },
  {
    value: 'French Polynesia',
    label: 'French Polynesia',
  },
  {
    value: 'Gabon',
    label: 'Gabon',
  },
  {
    value: 'Georgia',
    label: 'Georgia',
  },
  {
    value: 'Germany',
    label: 'Germany',
  },
  {
    value: 'Ghana',
    label: 'Ghana',
  },
  {
    value: 'Greece',
    label: 'Greece',
  },
  {
    value: 'Greenland',
    label: 'Greenland',
  },
  {
    value: 'Guadeloupe',
    label: 'Guadeloupe',
  },
  {
    value: 'Guam',
    label: 'Guam',
  },
  {
    value: 'Guatemala',
    label: 'Guatemala',
  },
  {
    value: 'Guinea',
    label: 'Guinea',
  },
  {
    value: 'Haiti',
    label: 'Haiti',
  },
  {
    value: 'Hashemite Kingdom of Jordan',
    label: 'Hashemite Kingdom of Jordan',
  },
  {
    value: 'Honduras',
    label: 'Honduras',
  },
  {
    value: 'Hong Kong',
    label: 'Hong Kong',
  },
  {
    value: 'Hungary',
    label: 'Hungary',
  },
  {
    value: 'Iceland',
    label: 'Iceland',
  },
  {
    value: 'India',
    label: 'India',
  },
  {
    value: 'Indonesia',
    label: 'Indonesia',
  },
  {
    value: 'Iran',
    label: 'Iran',
  },
  {
    value: 'Iraq',
    label: 'Iraq',
  },
  {
    value: 'Ireland',
    label: 'Ireland',
  },
  {
    value: 'Isle of Man',
    label: 'Isle of Man',
  },
  {
    value: 'Israel',
    label: 'Israel',
  },
  {
    value: 'Italy',
    label: 'Italy',
  },
  {
    value: 'Jamaica',
    label: 'Jamaica',
  },
  {
    value: 'Japan',
    label: 'Japan',
  },
  {
    value: 'Kazakhstan',
    label: 'Kazakhstan',
  },
  {
    value: 'Kenya',
    label: 'Kenya',
  },
  {
    value: 'Kosovo',
    label: 'Kosovo',
  },
  {
    value: 'Kuwait',
    label: 'Kuwait',
  },
  {
    value: 'Latvia',
    label: 'Latvia',
  },
  {
    value: 'Lebanon',
    label: 'Lebanon',
  },
  {
    value: 'Libya',
    label: 'Libya',
  },
  {
    value: 'Liechtenstein',
    label: 'Liechtenstein',
  },
  {
    value: 'Luxembourg',
    label: 'Luxembourg',
  },
  {
    value: 'Macedonia',
    label: 'Macedonia',
  },
  {
    value: 'Madagascar',
    label: 'Madagascar',
  },
  {
    value: 'Malaysia',
    label: 'Malaysia',
  },
  {
    value: 'Malta',
    label: 'Malta',
  },
  {
    value: 'Martinique',
    label: 'Martinique',
  },
  {
    value: 'Mauritius',
    label: 'Mauritius',
  },
  {
    value: 'Mayotte',
    label: 'Mayotte',
  },
  {
    value: 'Mexico',
    label: 'Mexico',
  },
  {
    value: 'Mongolia',
    label: 'Mongolia',
  },
  {
    value: 'Montenegro',
    label: 'Montenegro',
  },
  {
    value: 'Morocco',
    label: 'Morocco',
  },
  {
    value: 'Mozambique',
    label: 'Mozambique',
  },
  {
    value: 'Myanmar [Burma]',
    label: 'Myanmar [Burma]',
  },
  {
    value: 'Namibia',
    label: 'Namibia',
  },
  {
    value: 'Nepal',
    label: 'Nepal',
  },
  {
    value: 'Netherlands',
    label: 'Netherlands',
  },
  {
    value: 'New Caledonia',
    label: 'New Caledonia',
  },
  {
    value: 'New Zealand',
    label: 'New Zealand',
  },
  {
    value: 'Nicaragua',
    label: 'Nicaragua',
  },
  {
    value: 'Nigeria',
    label: 'Nigeria',
  },
  {
    value: 'Norway',
    label: 'Norway',
  },
  {
    value: 'Oman',
    label: 'Oman',
  },
  {
    value: 'Pakistan',
    label: 'Pakistan',
  },
  {
    value: 'Palestine',
    label: 'Palestine',
  },
  {
    value: 'Panama',
    label: 'Panama',
  },
  {
    value: 'Papua New Guinea',
    label: 'Papua New Guinea',
  },
  {
    value: 'Paraguay',
    label: 'Paraguay',
  },
  {
    value: 'Peru',
    label: 'Peru',
  },
  {
    value: 'Philippines',
    label: 'Philippines',
  },
  {
    value: 'Poland',
    label: 'Poland',
  },
  {
    value: 'Portugal',
    label: 'Portugal',
  },
  {
    value: 'Puerto Rico',
    label: 'Puerto Rico',
  },
  {
    value: 'Republic of Korea',
    label: 'Republic of Korea',
  },
  {
    value: 'Republic of Lithuania',
    label: 'Republic of Lithuania',
  },
  {
    value: 'Republic of Moldova',
    label: 'Republic of Moldova',
  },
  {
    value: 'Romania',
    label: 'Romania',
  },
  {
    value: 'Russia',
    label: 'Russia',
  },
  {
    value: 'Saint Lucia',
    label: 'Saint Lucia',
  },
  {
    value: 'San Marino',
    label: 'San Marino',
  },
  {
    value: 'Saudi Arabia',
    label: 'Saudi Arabia',
  },
  {
    value: 'Senegal',
    label: 'Senegal',
  },
  {
    value: 'Serbia',
    label: 'Serbia',
  },
  {
    value: 'Singapore',
    label: 'Singapore',
  },
  {
    value: 'Slovakia',
    label: 'Slovakia',
  },
  {
    value: 'Slovenia',
    label: 'Slovenia',
  },
  {
    value: 'South Africa',
    label: 'South Africa',
  },
  {
    value: 'Spain',
    label: 'Spain',
  },
  {
    value: 'Sri Lanka',
    label: 'Sri Lanka',
  },
  {
    value: 'Sudan',
    label: 'Sudan',
  },
  {
    value: 'Suriname',
    label: 'Suriname',
  },
  {
    value: 'Swaziland',
    label: 'Swaziland',
  },
  {
    value: 'Sweden',
    label: 'Sweden',
  },
  {
    value: 'Switzerland',
    label: 'Switzerland',
  },
  {
    value: 'Taiwan',
    label: 'Taiwan',
  },
  {
    value: 'Tanzania',
    label: 'Tanzania',
  },
  {
    value: 'Thailand',
    label: 'Thailand',
  },
  {
    value: 'Trinidad and Tobago',
    label: 'Trinidad and Tobago',
  },
  {
    value: 'Tunisia',
    label: 'Tunisia',
  },
  {
    value: 'Turkey',
    label: 'Turkey',
  },
  {
    value: 'U.S. Virgin Islands',
    label: 'U.S. Virgin Islands',
  },
  {
    value: 'Ukraine',
    label: 'Ukraine',
  },
  {
    value: 'United Arab Emirates',
    label: 'United Arab Emirates',
  },
  {
    value: 'United Kingdom',
    label: 'United Kingdom',
  },
  {
    value: 'United States',
    label: 'United States',
  },
  {
    value: 'Uruguay',
    label: 'Uruguay',
  },
  {
    value: 'Venezuela',
    label: 'Venezuela',
  },
  {
    value: 'Vietnam',
    label: 'Vietnam',
  },
  {
    value: 'Zambia',
    label: 'Zambia',
  },
  {
    value: 'Zimbabwe',
    label: 'Zimbabwe',
  },
];

export default countriesReady;
