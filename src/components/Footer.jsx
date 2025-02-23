const Footer = () => {
  return (
    <footer className="bg-black glass text-white text-center py-4">
      <p className="text-sm">
        © {new Date().getFullYear()} Task Management App | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
