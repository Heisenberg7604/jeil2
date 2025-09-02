import React from 'react';

const HoverCard = ({
  title = 'Default Title',
  subtitle = 'Default Subtitle',
  address,
  phone1,
  phone2,
  phone3,
  emails = [],
  linkText = 'Learn More',
  linkUrl = '#contact',
}) => {
  return (
    <div className="relative bg-white cursor-pointer flex flex-col gap-4 justify-between rounded-2xl border border-gray-300 p-4 px-8 overflow-hidden transition-all duration-300 ease-in-out z-10 hover:border-red-500 hover:-translate-y-1 hover:shadow-lg group">
      {/* Red background overlay */}
      <div className="absolute top-0 left-0 h-full w-0 bg-red-500 transition-all duration-300 ease-in-out z-[-1] group-hover:w-full"></div>

      {/* Background image overlay */}
      <div
        className="absolute top-0 left-0 h-full w-full opacity-5 z-[-2] transition-all duration-300 ease-in-out"
        style={{
          backgroundImage: "url('https://s3-alpha-sig.figma.com/img/6956/4aec/59afa93303a34a23ecc13368dc4094db?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PFrwNwC7QeqlIUsWFsC-jbQzlVTUSh7T5VfJ9vMNaAEsoOS92kRDH-OjWcAX~dmuZ77fPWjZJX0v1kXaZENeqa--USg1BcCN8z~Z1id5y5RQT1ZTU5OR4PRrLISHbowyTAu65h2jCKOSYXCrXN3F6fH8epD-Pm9TCGCYvD9svkhnbTSZxPKZhn8okHm7W~3wWyIhJBaZyQ30qWwD~JAh5r0BRE6XIfIpgTlUWeLq9wwCbwFZQR5RWInuHUfLrfhvAnxmzVVoTO1TxyjHOeXVb68Tc~nJuypwlDmcd0Sg02sJu3-uj7vFXRul6qw0LRfsQrWS5c5RJ~P-z5-eS~1jTA__')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <h4 className="text-xl font-medium transition-colors duration-300 ease-in-out z-20 group-hover:text-white">
        {title}
      </h4>

      <h2 className="text-xl font-medium transition-colors duration-300 ease-in-out z-20 group-hover:text-white">
        {subtitle}
      </h2>

      {address && (
        <p className="text-gray-600 text-sm font-medium transition-colors duration-300 ease-in-out z-20 group-hover:text-white">
          {address}
        </p>
      )}

      <div className="flex gap-4 my-2 z-20 transition-colors duration-300 ease-in-out">
        {phone1 && (
          <a
            href={`tel:${phone1}`}
            className="text-gray-800 text-base font-medium transition-colors duration-300 ease-in-out group-hover:text-white hover:text-white hover:text-opacity-80 hover:underline"
          >
            {phone1}
          </a>
        )}
        {phone2 && (
          <a
            href={`tel:${phone2}`}
            className="text-gray-800 text-base font-medium transition-colors duration-300 ease-in-out group-hover:text-white hover:text-white hover:text-opacity-80 hover:underline"
          >
            {phone2}
          </a>
        )}
        {phone3 && (
          <a
            href={`tel:${phone3}`}
            className="text-gray-800 text-base font-medium transition-colors duration-300 ease-in-out group-hover:text-white hover:text-white hover:text-opacity-80 hover:underline"
          >
            {phone3}
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-4 my-2 z-20">
        {emails.map((email, index) => (
          <a
            key={index}
            href={`mailto:${email}`}
            className="text-gray-800 text-xl font-medium transition-colors duration-300 ease-in-out whitespace-nowrap z-20 group-hover:text-white hover:text-white hover:text-opacity-80 hover:underline"
          >
            {email}
          </a>
        ))}
      </div>

      <a
        href={linkUrl}
        className="flex items-center gap-2 text-sm font-medium text-gray-800 mt-auto no-underline transition-colors duration-300 ease-in-out z-20 group-hover:text-white"
      >
        <svg
          className="w-4 h-4 transition-colors duration-300 ease-in-out"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        {linkText}
      </a>
    </div>
  );
};

export default HoverCard;