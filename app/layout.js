import './globals.css';

export const metadata = {
  title: 'Dr. P. K. Rai - Ex-MLA Official Website',
  description: 'Official Portal of Dr. P. K. Rai',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 font-sans w-full overflow-x-hidden m-0 p-0">
        {children}
      </body>
    </html>
  );
}