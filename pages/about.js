// About page

import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout title="About">
      <div className="container mx-auto my-10 p-8 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        <p className="text-gray-700 leading-loose">
          Welcome to{' '}
          <span className="font-bold text-cyan-600">Salon Delight Style</span>!
          We are passionate about delivering high-quality beauty products to our
          valued customers. With a commitment to excellence, we aim to enhance
          your beauty and style.
        </p>

        <p className="text-gray-700 leading-loose mt-4">
          Our journey began with a vision to provide a seamless and convenient
          shopping experience. The Salon Delight Style e-commerce website is a
          reflection of our dedication to staying at the forefront of the beauty
          industry.
        </p>

        <p className="text-gray-700 leading-loose mt-4">
          At Salon Delight Style, we offer a curated selection of hair care,
          skin care, nail care products, makeup, and beauty accessories. Our
          goal is to empower you to look and feel your best every day.
        </p>

        <p className="text-gray-700 leading-loose mt-4">
          We believe in the power of beauty to boost confidence and bring joy.
          With our user-friendly platform, secure transactions, and a wide range
          of products, we strive to make your online shopping experience
          delightful.
        </p>

        <p className="text-gray-700 leading-loose mt-4">
          Thank you for choosing Salon Delight Style. We look forward to being
          your go-to destination for all your beauty needs.
        </p>

        {/* Contact Details */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Contact Details</h2>

          <p className="text-gray-700 leading-loose">
            <span className="font-bold">Address:</span> No. 1118/E, Nagoda,
            Dodangoda, Kalutara, Sri Lanka
          </p>

          <p className="text-gray-700 leading-loose">
            <span className="font-bold">Telephone:</span> 077 716 6810
          </p>

          <p className="text-gray-700 leading-loose">
            <span className="font-bold">Email:</span>{' '}
            <a
              href="mailto:salondelightstyle@gmail.com"
              className="text-cyan-500 hover:underline"
            >
              salondelightstyle@gmail.com
            </a>
          </p>

          <p className="text-gray-700 leading-loose">
            <span className="font-bold">Facebook:</span>{' '}
            <a
              href="https://www.facebook.com/salondelightstyle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:underline"
            >
              salondelightstyle
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
